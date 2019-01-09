requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('Timeout loading modules: ' + err.requireModules);
    }else if (err.requireType === 'scripterror') {
<<<<<<< HEAD
        alert('Error loading the ETF Web Interface, please contact the System Administrator. Error message: '+err.message);
=======
        alert('Error loading the ETF Web Interface. Please contact the System Administrator and report this error message: '+err.message);
>>>>>>> 6d3cbaf1cf82a3977bb91ae03b16342d7a4f2417
    }
    throw err;
};

require.config( {
    paths: {
        baseUrl: 'js',

        // Do not change order!
        "jquery": [
<<<<<<< HEAD
            "//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.3.min", "lib/jquery.min"
        ],
        'jquery.mobile.config': 'config/jquery.mobile.config',
        "jquery.mobile": [
            "//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min", "lib/jquery.mobile.min"
        ],
        "jquery.validate": [
            "//ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min", "lib/jquery.validate.min"
        ],
        "underscore": [
            "//cdn.jsdelivr.net/lodash/4.17.4/lodash.min", "lib/lodash.min"
        ],
        "backbone": [
            "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min", "lib/backbone-min"
        ],
        "backbone.paginator": [
            "//cdnjs.cloudflare.com/ajax/libs/backbone.paginator/2.0.5/backbone.paginator.min", "lib/backbone.paginator.min"
        ],
        "moment": [
            "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min", "lib/momemt.min"
        ],
        "toastr": [
            "//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min", "lib/toastr.min"
        ],
        "jquery.iframe-transport": [
            "//cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.14.2/js/jquery.iframe-transport.min", "lib/jquery.iframe-transport.min"
=======
            "https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.3.min",
            "https://code.jquery.com/jquery-1.11.3.min",
            "lib/jquery.min"
        ],

        'jquery.mobile.config': 'config/jquery.mobile.config',

        "jquery.mobile": [
            "https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min",
            "https://ajax.aspnetcdn.com/ajax/jquery.mobile/1.4.5/jquery.mobile-1.4.5.min",
            "lib/jquery.mobile.min"
        ],

        "jquery.validate": [
            "https://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min",
            "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.14.0/jquery.validate.min",
            "lib/jquery.validate.min"
        ],

        "underscore": [
            "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min",
            "https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min",
            "lib/lodash.min"
        ],
        "backbone": [
            "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
            "https://fastcdn.org/Backbone.js/1.2.3/backbone-min",
            "lib/backbone-min"
        ],
        "backbone.paginator": [
            "https://cdnjs.cloudflare.com/ajax/libs/backbone.paginator/2.0.5/backbone.paginator.min",
            "lib/backbone.paginator.min"
        ],
        "moment": [
            "https://cdn.jsdelivr.net/npm/moment@2.22.2/moment.min",
            "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min",
            "lib/momemt.min"
        ],
        "toastr": [
            "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min",
            "lib/toastr.min"
        ],
        "jquery.iframe-transport": [
            "https://cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.14.2/js/jquery.iframe-transport.min",
            "lib/jquery.iframe-transport.min"
>>>>>>> 6d3cbaf1cf82a3977bb91ae03b16342d7a4f2417
        ],
        "jquery-ui/ui/widget": [
            "lib/jquery.ui.widget"
        ],
        "jquery.fileupload": [
<<<<<<< HEAD
            "//cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.14.2/js/jquery.fileupload.min", "lib/jquery.fileupload.min"
=======
            "https://cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.14.2/js/jquery.fileupload.min",
            "lib/jquery.fileupload.min"
>>>>>>> 6d3cbaf1cf82a3977bb91ae03b16342d7a4f2417
        ],
        "etf.webui": [
            "app"
        ],
    },
    onNodeCreated: function(node, config, module, path) {
        var sri = {
<<<<<<< HEAD
            'jquery': 'sha256-rsPUGdUPBXgalvIj4YKJrrUlmLXbOb6Cp7cdxn1qeUc=',
            'jquery.mobile': 'sha256-MkfSkbXhZoQ1CyPwjC30mPfLF8iKF5n564n9WvCLX4E=',
            'jquery.validate': 'sha256-Lj47JmDL+qxf6/elCzHQSUFZmJYmqEECssN5LP/ifRM=',
            'underscore': 'sha256-IyWBFJYclFY8Pn32bwWdSHmV4B9M5mby5bhPHEmeY8w=',
            'backbone': 'sha256-0atoj6xVOJUoBM8Vp5PFywwLLE+aNl2svi4Q9UWZ+dQ=',
            'backbone.paginator': 'sha256-nqCLeI27BiuRxhJEcsKPwUpTusAzME+5qFOWntHhAvy6',
            'moment': 'sha256-Gn7MUQono8LUxTfRA0WZzJgTua52Udm1Ifrk5421zkA=',
            'toastr': 'sha256-yNbKY1y6h2rbVcQtf0b8lq4a+xpktyFc3pSYoGAY1qQ=',
            'jquery.iframe-transport': 'sha256-OiZnRAga/nDE1Ud8eLfBWCwb9mMZmkrRIRblCeRYWj8=',
            'jquery-ui/ui/widget': 'sha256-CvqMlHtDX8dDgshwl03tVwvzncqqMKN0FLzZrNap4+I=',
            'jquery.fileupload': 'sha256-tcXzqklRDpmITiQ0Ff+S6H2uUQl089oXkEyGjOOGmN4='
        };
        if (sri[module]) {
            node.setAttribute('integrity', sri[module]);
            node.setAttribute('crossorigin', 'anonymous');
=======
            'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.3.min.js': 'sha384-6ePHh72Rl3hKio4HiJ841psfsRJveeS+aLoaEf3BWfS+gTF0XdAqku2ka8VddikM',
            'https://code.jquery.com/jquery-1.11.3.min.js': 'sha384-+54fLHoW8AHu3nHtUxs9fW2XKOZ2ZwKHB5olRtKSDTKJIb1Na1EceFZMS8E72mzW',

            'https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js': 'sha384-XEn4bZ9g8ia7KJWyaf3o/ADO5s2pqwtDl1MdxgCZ9x6rm5QICw5Zk2+vwIJnAeFD',
            'https://ajax.aspnetcdn.com/ajax/jquery.mobile/1.4.5/jquery.mobile-1.4.5.min.js': 'sha384-u7i0wHEdsFrw92D1Z0sk2r6kiOGnZJhnawPUT0he8TRKfD4/XMEsj22l/cHFXO3v',

            'https://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min.js': 'sha384-Fnqn3nxp3506LP/7Y3j/25BlWeA3PXTyT1l78LjECcPaKCV12TsZP7yyMxOe/G/k',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.14.0/jquery.validate.min.js': 'sha384-Fnqn3nxp3506LP/7Y3j/25BlWeA3PXTyT1l78LjECcPaKCV12TsZP7yyMxOe/G/k',

            'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js': 'sha384-FwbQ7A+X0UT99MG4WBjhZHvU0lvi67zmsIYxAREyhabGDXt1x0jDiwi3xubEYDYw',
            'https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js': 'sha384-zIRexRVB5q09c7QIwaG/PJmsn9EPaqP3V9wNSk3XSC2hU6ns+hMorBODGGcKRnbz',

            'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js': 'sha384-NNt9ocJfZhIg2c5PbM5G2a3tTaeXhEfqCHWHNB7htzaWKn8MwFkzVyGdzLA8QMX7',
            'https://fastcdn.org/Backbone.js/1.2.3/backbone-min.js': 'sha384-kgH1F06klaG52/uQEQlpP5QZ9tbJZgcU4omvs1DRSHaJGVZWp//NYtoi93ZmGday',

            'https://cdnjs.cloudflare.com/ajax/libs/backbone.paginator/2.0.5/backbone.paginator.min.js': 'sha256-nqCLeI27BiuRxhJEcsKPwUpTusAzME+5qFOWntHhAvy6',

            'https://cdn.jsdelivr.net/npm/moment@2.22.2/moment.min.js': 'sha384-BmqX+J1qYayHgEkw+9Idtrl0B0TorHRQW9/iwTxk1samHGPmEI7ovnGvy4SbWxwa',
            'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js': 'sha384-KgEy7s3ThYKule8wWiu2WJkm0AmJeSLkXku5PY5X8MhVgdm8K1ebsVRKHfNfWPrR',

            'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.js': 'sha256-yNbKY1y6h2rbVcQtf0b8lq4a+xpktyFc3pSYoGAY1qQ=',

            'https://cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.14.2/js/jquery.iframe-transport.min.js': 'sha256-OiZnRAga/nDE1Ud8eLfBWCwb9mMZmkrRIRblCeRYWj8=',

            'https://cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.14.2/js/jquery.fileupload.min.js': 'sha256-tcXzqklRDpmITiQ0Ff+S6H2uUQl089oXkEyGjOOGmN4='
        };
        var jsPos = path.indexOf('js/');
        var sri = sri[path];
        if(jsPos != 0) {
            node.setAttribute('crossorigin', 'anonymous');
            if(sri) {
                node.setAttribute('integrity', sri);
            }else{
                alert('Security error. ' +
                    'Please contact the System Administrator and ' +
                    'report this error message: script integrity check failed for '+path);
            }
        }else{
            node.setAttribute('crossorigin', 'use-credentials');
>>>>>>> 6d3cbaf1cf82a3977bb91ae03b16342d7a4f2417
        }
    },
    shim: {
        "backbone": {
            "deps": [ "underscore", "jquery" ],
            "exports": "Backbone"
        },
        'backbone-paginator': {
            deps: ['backbone']
        },

        'jquery.mobile-config': ['jquery'],
        'jquery.mobile': ['jquery','jquery.mobile.config'],

        "jquery.fileupload": {
            deps: [ "jquery",
                "jquery-ui/ui/widget",
                "jquery.iframe-transport"]
        },

        "etf.webui/v2": {
            deps: [ "underscore", "toastr"]
        },
    }
});

window.baseUrl = "v2";

require([
    "jquery",
    "backbone",
    "etf.webui/routers/mobileRouter",
    "jquery.mobile"
], function ( $, Backbone, Mobile ) {

    require( [ "toastr" ], function (toastr) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "8000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    });

    require( [ "jquery.mobile" ], function ($) {
        // Instantiates a new Backbone.js Mobile Router
        this.router = new Mobile();

    });

});
