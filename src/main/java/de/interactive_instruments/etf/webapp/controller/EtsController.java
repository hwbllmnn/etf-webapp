/**
 * Copyright 2010-2017 interactive instruments GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package de.interactive_instruments.etf.webapp.controller;

import static de.interactive_instruments.etf.webapp.SwaggerConfig.SERVICE_CAP_TAG_NAME;
import static de.interactive_instruments.etf.webapp.dto.DocumentationConstants.*;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.transform.TransformerConfigurationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import de.interactive_instruments.etf.dal.dao.Dao;
import de.interactive_instruments.etf.dal.dto.test.ExecutableTestSuiteDto;
import de.interactive_instruments.etf.dal.dto.translation.TranslationTemplateBundleDto;
import de.interactive_instruments.etf.dal.dto.translation.TranslationTemplateDto;
import de.interactive_instruments.etf.model.OutputFormat;
import de.interactive_instruments.etf.model.ParameterSet;
import de.interactive_instruments.etf.model.Parameterizable;
import de.interactive_instruments.etf.testdriver.DependencyGraph;
import de.interactive_instruments.etf.webapp.WebAppConstants;
import de.interactive_instruments.etf.webapp.conversion.EidConverter;
import de.interactive_instruments.exceptions.ObjectWithIdNotFoundException;
import de.interactive_instruments.exceptions.StorageException;
import de.interactive_instruments.exceptions.config.ConfigurationException;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * Test project controller used for accessing metadata of a test project
 */
@RestController
public class EtsController {

	@Autowired
	ServletContext servletContext;

	@Autowired
	private TestDriverController testDriverController;

	@Autowired
	private DataStorageService dataStorageService;

	@Autowired
	private StreamingService streaming;

	private final Logger logger = LoggerFactory.getLogger(EtsController.class);
	private Dao<ExecutableTestSuiteDto> etsDao;
	private OutputFormat xmlOutputFormat;
	public static final String PATH = "ets";
	private final static String ETS_URL = WebAppConstants.API_BASE_URL + "/ExecutableTestSuites";
	private final static String ETS_MODEL_DESCRIPTION = "The Executable Test Suite model is described in the "
			+ "[XML schema documentation](https://services.interactive-instruments.de/etf/schemadoc/test_xsd.html#ExecutableTestSuite). "
			+ ETF_ITEM_COLLECTION_DESCRIPTION;

	@PostConstruct
	private void init() throws IOException, TransformerConfigurationException {
		etsDao = dataStorageService.getDao(ExecutableTestSuiteDto.class);
		xmlOutputFormat = etsDao.getOutputFormats().values().iterator().next();
		logger.info("Executable Test Suite controller initialized!");

		// Prepare cache
		streaming.prepareCache(etsDao);
	}

	@ApiOperation(value = "Get multiple Executable Test Suites as JSON", notes = ETS_MODEL_DESCRIPTION, tags = {
			SERVICE_CAP_TAG_NAME})
	@RequestMapping(value = {ETS_URL, ETS_URL + ".json"}, method = RequestMethod.GET)
	public void listExecutableTestSuitesJson(
			@RequestParam(required = false, defaultValue = "0") int offset,
			@RequestParam(required = false, defaultValue = "0") int limit,
			HttpServletRequest request,
			HttpServletResponse response)
			throws StorageException, ConfigurationException, IOException, ObjectWithIdNotFoundException {
		streaming.asJson2(etsDao, request, response, offset, limit);
	}

	@ApiOperation(value = "Get multiple Executable Test Suites as XML", notes = ETS_MODEL_DESCRIPTION, tags = {
			SERVICE_CAP_TAG_NAME})
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "EtfItemCollection with multiple Executable Test Suite"),
	})
	@RequestMapping(value = {ETS_URL + ".xml"}, method = RequestMethod.GET)
	public void listExecutableTestSuitesXml(
			@RequestParam(required = false, defaultValue = "0") int offset,
			@RequestParam(required = false, defaultValue = "0") int limit,
			HttpServletRequest request,
			HttpServletResponse response) throws IOException, StorageException, ObjectWithIdNotFoundException {
		streaming.asXml2(etsDao, request, response, offset, limit);
	}

	@ApiOperation(value = "Get Executable Test Suite as XML", notes = ETS_MODEL_DESCRIPTION, tags = {SERVICE_CAP_TAG_NAME})
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "EtfItemCollection with one Executable Test Suite"),
			@ApiResponse(code = 404, message = "Executable Test Suite not found")
	})
	@RequestMapping(value = {ETS_URL + "/{id}.xml"}, method = RequestMethod.GET)
	public void executableTestSuiteXmlById(@PathVariable String id, HttpServletRequest request, HttpServletResponse response)
			throws IOException, StorageException, ObjectWithIdNotFoundException {
		streaming.asXml2(etsDao, request, response, id);
	}

	@ApiOperation(value = "Get Executable Test Suite as JSON", notes = ETS_MODEL_DESCRIPTION, tags = {SERVICE_CAP_TAG_NAME})
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "EtfItemCollection with one Executable Test Suite"),
			@ApiResponse(code = 404, message = "Executable Test Suite not found")
	})
	@RequestMapping(value = {ETS_URL + "/{id}",
			ETS_URL + "/{id}.json"}, method = RequestMethod.GET, produces = "application/json")
	public void executableTestSuiteJsonById(
			@PathVariable String id,
			HttpServletRequest request,
			HttpServletResponse response) throws IOException, StorageException, ObjectWithIdNotFoundException {
		streaming.asJson2(etsDao, request, response, id);
	}

	@ApiOperation(value = "Check if Executable Test Suite exists", tags = {SERVICE_CAP_TAG_NAME})
	@ApiResponses(value = {
			@ApiResponse(code = 204, message = "Executable Test Suite exists"),
			@ApiResponse(code = 404, message = "Executable Test Suite does not exist")
	})
	@RequestMapping(value = {ETS_URL + "/{id}"}, method = RequestMethod.HEAD)
	public ResponseEntity<String> exists(
			@ApiParam(value = EID_DESCRIPTION, example = EID_EXAMPLE) @PathVariable String id)
			throws IOException, StorageException, ObjectWithIdNotFoundException {
		return etsDao.exists(EidConverter.toEid(id)) ? new ResponseEntity(HttpStatus.NO_CONTENT)
				: new ResponseEntity(HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Get the parameter of an Executable Test Suites ", tags = {
			SERVICE_CAP_TAG_NAME}, response = Parameterizable.Parameter.class, responseContainer = "List")
	@RequestMapping(value = {ETS_URL + "/{etsId}/parameter",
			ETS_URL + "/{etsId}/arguments.json"}, method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody Collection<Parameterizable.Parameter> etsParameterById(@PathVariable String etsId)
			throws StorageException, ConfigurationException, ObjectWithIdNotFoundException {
		// Get ETS and translation bundle to translate the description text
		final ExecutableTestSuiteDto dto = etsDao.getById(EidConverter.toEid(etsId)).getDto();
		if (dto.getParameters() == null) {
			return null;
		}
		final ParameterSet transferParameters = new ParameterSet();
		final TranslationTemplateBundleDto bundleDto = dto.getTranslationTemplateBundle();
		for (final Parameterizable.Parameter parameter : dto.getParameters().getParameters()) {
			final ParameterSet.MutableParameter copiedParam = new ParameterSet.MutableParameter(parameter);
			if (parameter.getDescription() != null) {
				final TranslationTemplateDto template = bundleDto.getTranslationTemplate(parameter.getDescription(), "en");
				if (template != null && template.getStrWithTokens() != null) {
					copiedParam.setDescription(template.getStrWithTokens());
				}
			}
			transferParameters.addParameter(copiedParam);
		}
		return transferParameters.getParameters();
	}

	private static class DependenciesJsonView {
		public final String id;
		public final String description;
		public final String label;

		DependenciesJsonView(ExecutableTestSuiteDto ets) {
			id = ets.getId().toString();
			description = ets.getDescription();
			label = ets.getLabel();
		}
	}

	@ApiOperation(value = "Get the dependencies of an Executable Test Suite", tags = {
			SERVICE_CAP_TAG_NAME}, response = DependenciesJsonView.class, responseContainer = "List")
	@RequestMapping(value = {ETS_URL + "/{etsId}/dependencies",
			ETS_URL + "/{etsId}/dependencies.json"}, method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<DependenciesJsonView> etsDependenciesById(@PathVariable String etsId)
			throws StorageException, ConfigurationException, ObjectWithIdNotFoundException {
		final Collection<ExecutableTestSuiteDto> dependencies = testDriverController
				.getExecutableTestSuiteById(EidConverter.toEid(etsId)).getDependencies();
		final DependencyGraph<ExecutableTestSuiteDto> graph = new DependencyGraph(dependencies);
		final List<ExecutableTestSuiteDto> sortedDependencies = graph.sortIgnoreCylce();
		final List<DependenciesJsonView> depsJson = sortedDependencies.stream().map(DependenciesJsonView::new)
				.collect(Collectors.toList());
		return depsJson;
	}

}
