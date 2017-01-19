/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//noinspection JSUnresolvedFunction
	__webpack_require__(1);
	
	//noinspection JSUnresolvedFunction
	window.viewability = function () {
	  return __webpack_require__(5);
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	var _controllers = __webpack_require__(10);
	
	var page_controller = _interopRequireWildcard(_controllers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	page_controller.start(); /**
	                          * Created by mrskull on 24.11.16.
	                          */
	
	// import './autosize-master/dist/autosize';

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	/*    JavaScript    */
	
	/*---------------- Interfejs funkcji standardowych ----------------*/
	
	/**
	 *    Defining global veriables
	 */
	
	window.APP = {};
	window.APP.DATA = {};
	
	/**
	 *    Defining global functions
	 */
	
	APP.add_own_event = function add_own_event(name, callback) {
	  window.addEventListener(name, callback, false);
	};
	
	APP.throw_event = function throw_event(event) {
	  window.dispatchEvent(event);
	};
	
	$.prototype.add_data = function add_data(name, value) {
	  $(this).attr('data-' + name, value);
	  $(this).data(name, value);
	  return this;
	};
	
	$.prototype.change_data = function change_data(name, value) {
	  $(this).add_data(name, value);
	  return this;
	};
	
	$.prototype.delete_data = function delete_data(name) {
	  $(this).removeAttr('data-' + name);
	  $(this).removeData(name);
	  return this;
	};
	
	$.prototype.serialize_object = function () {
	  var fields = $(this).serializeArray(),
	      form_object = {};
	
	  $.each(fields, function (i, field) {
	    form_object[field.name] = field.value;
	  });
	
	  return form_object;
	};
	
	Array.prototype.delete_empty = function delete_empty() {
	  var url_array = [];
	
	  for (var j = 0, i = 0; this.length > i; i++) {
	    if (this[i]) {
	      url_array[j] = this[i];
	      j++;
	    }
	  }
	  return url_array;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _structure = __webpack_require__(8);
	
	/**
	 *    Defining private functions
	 */
	
	var send_post_preprocess_url = function send_post_preprocess_url(response_url) {
	  if (response_url) return response_url;else return _structure.data_controller.get('path');
	},
	    send_post_prepare = function send_post_prepare(post_data) {
	  if (!post_data) post_data = {};
	
	  post_data[_structure.data_controller.get_crsf('name')] = _structure.data_controller.get_crsf('value');
	
	  return post_data;
	};
	
	/**
	 *    Defining private functions
	 */
	
	/**
	 * Created by mrskull on 20.12.16.
	 */
	
	window.APP.http_request = function (url, data_post, callback) {
	  url = send_post_preprocess_url(url);
	  data_post = send_post_prepare(data_post);
	
	  $.ajax({
	    type: 'POST',
	    url: url,
	    data: data_post,
	    complete: callback
	  });
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.data_controller = undefined;
	
	__webpack_require__(9);
	
	/*---------------- Struktura Dane_Strony ----------------*/
	
	var data_controller = exports.data_controller = new function Data_Controler() {
	  var private_data = void 0,
	      public_data = void 0;
	
	  this.reset = function () {
	    private_data = {
	      path: location.pathname,
	      all_url: location.href,
	      history: [],
	      csrf_token: $('input[ name=csrfmiddlewaretoken ]').val() || ''
	    };
	
	    public_data = {
	      can_do_redirect: false,
	      can_do_open_plugin: true,
	      page_name: 'Spasungate',
	      title: 'Loading... - Spasungate',
	      description: 'This page is shop, which is ownership Spasungate.',
	      statement_content: 'Empty statement.'
	    };
	  };
	
	  this.reset();
	
	  this.get = function (name) {
	    if (typeof private_data[name] !== 'undefined') return private_data[name];else if (typeof public_data[name] !== 'undefined') return public_data[name];else {
	      console.error('Data structure error: Wrong call! Veriable with this name doesn\'t exist.');
	    }
	  };
	
	  this.get_crsf = function (what) {
	    if (what === 'name') return 'csrfmiddlewaretoken';else if (what === 'value') return private_data.csrf_token;else console.error('Data structure error: Wrong call! Veriable with this name doesn\'t exist (crsf).');
	  };
	
	  this.change = function (name, wartosc) {
	    if (typeof public_data[name] !== 'undefined') public_data[name] = wartosc;else console.error('Data structure error: Wrong call! Veriable with this name doesn\'t exist. ' + name);
	  };
	
	  this.change_much = function (object) {
	    for (var name in object) {
	      if (object.hasOwnProperty(name)) {
	        if (name === 'title') {
	          if (object[name] !== '') this.change(name, object[name] + ' - ' + public_data.page_name);else this.change(name, public_data.page_name);
	        } else this.change(name, object[name]);
	      }
	    }
	  };
	}(); /**
	      * Created by mrskull on 24.11.16.
	      */

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	window.EVENTS = {
	  define: new Event('define'),
	  redirect: new Event('redirect'),
	  close_plugins: new Event('close_plugins'),
	
	  open_alert: new Event('open_alert'),
	  open_prompt: new Event('open_prompt'),
	  open_confirm: new Event('open_confirm')
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.start = undefined;
	
	var _controllers = __webpack_require__(11);
	
	var searcher_controller = _interopRequireWildcard(_controllers);
	
	var _controllers2 = __webpack_require__(21);
	
	var cart_controller = _interopRequireWildcard(_controllers2);
	
	var _controllers3 = __webpack_require__(22);
	
	var navigation_controller = _interopRequireWildcard(_controllers3);
	
	var _controllers4 = __webpack_require__(23);
	
	var header_controller = _interopRequireWildcard(_controllers4);
	
	var _controllers5 = __webpack_require__(24);
	
	var dialogue_window = _interopRequireWildcard(_controllers5);
	
	var _controllers6 = __webpack_require__(27);
	
	var ground_controller = _interopRequireWildcard(_controllers6);
	
	var _controllers7 = __webpack_require__(30);
	
	var form_controller = _interopRequireWildcard(_controllers7);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*---------------- Wydarzenia na stronie ----------------*/
	
	var define = function define() {
	  // Usuń wszystkie wydarzenia ze wszystkich elementów
	  $('*').off();
	
	  searcher_controller.define();
	  cart_controller.define();
	  navigation_controller.define();
	  header_controller.define();
	  dialogue_window.define();
	  ground_controller.define();
	
	  form_controller.define();
	}; /**
	    * Created by mrskull on 24.11.16.
	    */
	
	var start = exports.start = function start() {
	  window.addEventListener('define', define, false);
	
	  searcher_controller.start();
	  cart_controller.start();
	  navigation_controller.start();
	  header_controller.start();
	  ground_controller.start();
	
	  define();
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.plugin_open = exports.start = exports.define = undefined;
	
	var _controllers = __webpack_require__(12);
	
	__webpack_require__(15);
	
	var _controllers2 = __webpack_require__(18);
	
	/**
	 *    Defining private variables
	 */
	
	var searcher_loader_controllers = void 0,
	    config_loader = {
	  name: 'filters',
	
	  container: '#SEARCHER > .searcher',
	  first_element: '*',
	
	  load_with_page: false
	},
	    searcher_motion_controllers = void 0,
	    config_motion = {
	  container: '#SEARCHER',
	  content: '.searcher',
	  open: 'right',
	  can_open_by: 'width',
	  can_open_to: 1000,
	  duration_open: 200,
	  duration_close: 200
	};
	
	/**
	 *    Defining public functions
	 */
	
	/**
	 * Created by mrskull on 07.01.17.
	 */
	
	var define = exports.define = function define() {
	  searcher_motion_controllers.define();
	},
	    start = exports.start = function start() {
	  // -- Loader configuration
	  searcher_loader_controllers = new _controllers.Plugins_Loader_Controllers(config_loader);
	  searcher_loader_controllers.define();
	
	  // -- Motion configuration
	  searcher_motion_controllers = new _controllers2.Plugins_Motion_Controllers(config_motion);
	  searcher_motion_controllers.start();
	},
	    plugin_open = exports.plugin_open = function plugin_open() {
	  searcher_motion_controllers.plugin_open();
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugins_Loader_Controllers = undefined;
	
	var _structure = __webpack_require__(8);
	
	var _views = __webpack_require__(13);
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	var Plugins_Loader_Controllers = exports.Plugins_Loader_Controllers = function Plugins_Loader_Controllers(config) {
	  var plugin_loader_views = new _views.Plugins_Loader_Views(config);
	
	  this.change_content = plugin_loader_views.change_content;
	
	  /**
	   *    Defining private functions
	   */
	
	  this.redirect = function () {
	    var url = _structure.data_controller.get('path'),
	        delay = 0,
	        variables = plugin_loader_views.models.variables;
	
	    if (typeof APP !== 'undefined' && typeof APP.DATA !== 'undefined') {
	      if (typeof APP.DATA.redirect !== 'undefined') url = APP.DATA.redirect;
	
	      if (typeof APP.DATA.delay !== 'undefined') delay = APP.DATA.delay;
	    }
	
	    variables.can_do_redirect = true;
	    clearTimeout(variables.redirect_time_out);
	
	    variables.redirect_time_out = setTimeout(function () {
	      if (plugin_loader_views.models.variables.can_do_redirect === true) plugin_loader_views.change_content(url);
	    }, delay);
	  };
	
	  /**
	   *    Defining public functions
	   */
	
	  this.define = function () {
	    window.APP.add_own_event('load', function () {
	      plugin_loader_views.change_content();
	    });
	  };
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugins_Loader_Views = undefined;
	
	var _models = __webpack_require__(14);
	
	var Plugins_Loader_Views = exports.Plugins_Loader_Views = function Plugins_Loader_Views(config) {
	  var models = new _models.Plugins_Loader_Models(config);
	
	  this.models = models;
	
	  /**
	   *    Defining showing functions
	   */
	
	  var check_for_errors = function check_for_errors(status, code) {
	    var container = models.settings.container,
	        error = models.variables.error;
	
	    if (status !== 'success') if (error === true) $(container).html('An error has occurred while connecting to server. Please, refresh website or check your connect with network.');else {
	      models.variables.error = true;
	
	      models.prepare_post_data();
	      models.download_content('/statement/' + code + '/', show_content);
	
	      return true;
	    }
	    return false;
	  },
	      prepare_content_to_show = function prepare_content_to_show(response, status) {
	    var html = response.responseText,
	        code = response.status,
	        container = models.settings.container,
	        url = models.variables.url,
	        error = models.variables.error;
	
	    if (check_for_errors(status, code)) return false;
	
	    if (error !== true || status === 'success') $(container).html(html).add_data('url', url);
	
	    models.variables.error = false;
	    models.variables.url = '';
	
	    models.refresh_events();
	  },
	      show_content = function show_content(response, status) {
	    prepare_content_to_show(response, status);
	
	    var container = models.settings.container,
	        opacity = models.settings.opacity.show,
	        duration = models.settings.duration.show;
	
	    $(container).animate({ opacity: opacity }, duration, function () {
	      // if(models.settings.load_with_page && window.APP.DATA)
	      //   load_header_page(window.APP.DATA);
	    });
	  };
	
	  /**
	   *    Defining hidding functions
	   */
	
	  var prepare_content_to_hide = function prepare_content_to_hide(url, post_data) {
	    models.variables.can_do_redirect = false;
	
	    models.refresh_data();
	    models.prepare_url(url);
	    models.prepare_post_data(post_data);
	  },
	      hide_content = function hide_content(url, post_data) {
	    prepare_content_to_hide(url, post_data);
	
	    var container = models.settings.container,
	        opacity = models.settings.opacity.hide,
	        duration = models.settings.duration.hide;
	
	    $(container).animate({ opacity: opacity }, duration, function () {
	      models.download_content(models.variables.url, show_content);
	    });
	  };
	
	  /**
	   *    Defining public functions
	   */
	
	  this.change_content = hide_content;
	}; /**
	    *    Created by mrskull on 24.11.16.
	    */

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugins_Loader_Models = undefined;
	
	var _structure = __webpack_require__(8);
	
	var Plugins_Loader_Models = exports.Plugins_Loader_Models = function Plugins_Loader_Models(config) {
	  var that = this;
	
	  /**
	   *    Plugin settings
	   */
	
	  this.settings = {
	    url: undefined,
	
	    name: undefined,
	    container: undefined,
	    first_element: '*',
	
	    load_with_page: false,
	
	    duration: {
	      show: 150,
	      hide: 1
	    },
	
	    opacity: {
	      show: 100,
	      hide: 0.4
	    }
	  };
	
	  // -- Load settings
	  (function () {
	    if (typeof config !== 'undefined') {
	      // -- Name
	      if (typeof config.name !== 'undefined') that.settings.name = config.name;
	
	      // -- URL
	      if (typeof config.url !== 'undefined') that.settings.url = config.url;
	
	      // -- Container
	      if (typeof config.load_with_page !== 'undefined') that.settings.load_with_page = config.load_with_page;
	
	      // -- Load with page
	      if (typeof config.container !== 'undefined') that.settings.container = config.container;
	
	      // -- Duration
	      if (typeof config.duration !== 'undefined') {
	        var duration = config.duration;
	
	        if (typeof duration.show !== 'undefined') that.settings.duration.show = duration.show;
	
	        if (typeof duration.hide !== 'undefined') that.settings.duration.hide = duration.hide;
	      }
	
	      // -- Opacity
	      if (typeof config.opacity !== 'undefined') {
	        var opacity = config.opacity;
	
	        if (typeof opacity.show !== 'undefined') that.settings.opacity.show = opacity.show;
	
	        if (typeof opacity.hide !== 'undefined') that.settings.opacity.hide = opacity.hide;
	      }
	    }
	  })();
	
	  /**
	   *    Plugin variables
	   */
	
	  this.variables = {
	    url: undefined,
	    post_data: undefined,
	
	    error: undefined,
	
	    can_do_load: true,
	    can_do_redirect: true,
	    redirect_time_out: undefined
	  };
	
	  /**
	   *    Defining prepare functions
	   */
	
	  this.prepare_url = function (response_url) {
	    if (!response_url) if (typeof this.settings.url !== 'undefined') response_url = this.settings.url;else response_url = _structure.data_controller.get('path');
	
	    this.variables.url = response_url;
	  };
	
	  this.prepare_post_data = function (response_data) {
	    if (!response_data) response_data = {};
	
	    if (typeof response_data.__form__ === 'undefined') response_data['__content__'] = this.settings.name;
	
	    this.variables.post_data = response_data;
	  };
	
	  /**
	   *    Defining refresh functions
	   */
	
	  this.refresh_data = function () {
	    _structure.data_controller.reset();
	  };
	
	  this.refresh_events = function () {
	    APP.throw_event(window.EVENTS.define);
	  };
	
	  /**
	   *    Defining download functions
	   */
	
	  this.download_content = function (url, callback) {
	    this.prepare_url(url);
	
	    window.APP.http_request(this.variables.url, this.variables.post_data, callback);
	  };
	}; /**
	    * Created by mrskull on 26.12.16.
	    */

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _views = __webpack_require__(16);
	
	var add_event_on_fields = function add_event_on_fields(auto_form_views) {
	  var settings = auto_form_views.models.settings,
	      $field = void 0;
	
	  settings.fields.each(function () {
	    $field = $(this);
	
	    if ($field.is(':checkbox')) $field.change(auto_form_views.send_checkbox);else if ($field.is(':text')) $field.change(auto_form_views.send_default).keyup(auto_form_views.send_on_key_up).keydown(function (event) {
	      if (event.keyCode == 13) {
	        event.preventDefault();
	        return false;
	      }
	    });else if ($field.is('select')) $field.change(auto_form_views.send_default);
	  });
	},
	    do_nothing = function do_nothing(event) {
	  console.log('co jest');
	  event.preventDefault();
	  return false;
	}; /**
	    * Created by mrskull on 17.01.17.
	    */
	
	var define = exports.define = function define() {
	  var $forms = $('form.auto_form, .auto_form form');
	
	  $forms.each(function () {
	    var $form = $(this),
	        config = {
	      form: $form,
	      fields: $('.auto_field', $form)
	    },
	        auto_form_views = new _views.Auto_Form_Views(config);
	
	    $form.submit(do_nothing);
	    add_event_on_fields(auto_form_views);
	  });
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Auto_Form_Views = undefined;
	
	var _models = __webpack_require__(17);
	
	var Auto_Form_Views = exports.Auto_Form_Views = function Auto_Form_Views(config) {
	  var models = new _models.Auto_Form_Models(config);
	
	  this.models = models;
	
	  /**
	   *    Defining public functions
	   */
	
	  this.send_checkbox = function () {
	    var $field = $(this),
	        post_data = {};
	
	    post_data['__' + models.settings.origin + '__'] = $field.data('name');
	    post_data['name'] = $field.attr('name');
	
	    if ($field.is(':checked')) post_data['action'] = 'append';else post_data['action'] = 'delete';
	
	    send(post_data);
	  };
	
	  this.send_default = function () {
	    var $field = $(this),
	        post_data = {};
	
	    post_data['__' + models.settings.origin + '__'] = $field.data('name');
	    post_data['value'] = $field.val();
	
	    send(post_data);
	  };
	
	  var check_is_key_code_printable_or_functional = function check_is_key_code_printable_or_functional(event) {
	    var keycode = event.keyCode;
	
	    var valid = keycode > 47 && keycode < 58 || // number keys
	    keycode === 8 || keycode === 46 || // backspace & delete
	    keycode === 32 || keycode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
	    keycode > 64 && keycode < 91 || // letter keys
	    keycode > 95 && keycode < 112 || // numpad keys
	    keycode > 185 && keycode < 193 || // ;=,-./` (in order)
	    keycode > 218 && keycode < 223; // [\]' (in order)
	
	    return valid;
	  };
	
	  this.send_on_key_up = function (event) {
	    if (check_is_key_code_printable_or_functional(event)) {
	      var $field = $(this),
	          post_data = {};
	
	      post_data['__' + models.settings.origin + '__'] = $field.data('name');
	      post_data['value'] = $field.val();
	
	      send(post_data);
	    }
	  };
	
	  /**
	   *    Defining private functions
	   */
	
	  var send = function send(post_data) {
	    window.APP.http_request(models.settings.action, post_data, function () {
	      APP.DATA = {
	        redirect: '/products/',
	        delay: 1000
	      };
	      APP.throw_event(window.EVENTS.redirect);
	    });
	  };
	}; /**
	    * Created by mrskull on 17.01.17.
	    */
	
	/**
	 *    Defining private functions
	 */

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Auto_Form_Models = undefined;
	
	var _structure = __webpack_require__(8);
	
	var Auto_Form_Models = exports.Auto_Form_Models = function Auto_Form_Models(config) {
	  var that = this;
	
	  this.settings = {
	    form: undefined,
	    fields: undefined,
	
	    action: undefined,
	    origin: undefined,
	    target: undefined
	  };
	
	  var load_settings = function load_settings() {
	    if (typeof config !== 'undefined') {
	      // -- Form
	      if (typeof config.form !== 'undefined') {
	        that.settings.form = config.form;
	
	        var $form = that.settings.form;
	        that.settings.action = $form.attr('action');
	        that.settings.origin = $form.data('origin');
	        that.settings.target = $form.data('target');
	      }
	
	      // -- Fields
	      if (typeof config.fields !== 'undefined') that.settings.fields = config.fields;
	    }
	  };
	
	  load_settings();
	
	  /////////////////////////
	}; /**
	    * Created by mrskull on 17.01.17.
	    */

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugins_Motion_Controllers = undefined;
	
	var _views = __webpack_require__(19);
	
	var Plugins_Motion_Controllers = exports.Plugins_Motion_Controllers = function Plugins_Motion_Controllers(config) {
	  var plugin_motion_views = new _views.Plugins_Motion_Views(config),
	      settings = plugin_motion_views.models.settings;
	
	  ///////////////////////////////
	
	  var swipe_open = function swipe_open() {
	    if (plugin_motion_views.models.check_possibility_of_swipe()) plugin_motion_views.plugin_open();
	  },
	      swipe_close = function swipe_close() {
	    if (plugin_motion_views.models.check_possibility_of_swipe()) plugin_motion_views.plugin_close();
	  },
	      pre_swipe_open = function pre_swipe_open(event) {
	    var y = event.gesture.center.y - event.gesture.distance;
	
	    if (y <= 70) swipe_open();
	  },
	      set_start_position = function set_start_position() {
	    var $container = $(settings.container),
	        $content = $container.children(settings.content),
	        position = void 0,
	        height = $content.outerHeight(),
	        width = $content.outerWidth(),
	        direction_open = settings.direction_open,
	        direction_close = settings.direction_close;
	
	    settings.height = height;
	    settings.width = width;
	
	    if (direction_open === 'top' || direction_open === 'bottom') position = -height;else if (direction_open === 'left' || direction_open === 'right') position = -width;
	
	    if (position) $($container).css(direction_close, position);
	  },
	      set_user_select = function set_user_select() {
	    var $body = $('body'),
	        $container = $(settings.container),
	        width = parseInt($container.outerWidth());
	
	    if (width >= 1000) {
	      $body.removeClass('user_select_none');
	      $body.addClass('user_select_text');
	    } else {
	      $body.removeClass('user_select_text');
	      $body.addClass('user_select_none');
	    }
	  },
	      stop_propagation = function stop_propagation(event) {
	    event.stopPropagation();
	  };
	
	  //////////////////////////////////////////
	
	  this.define = function () {
	    var $window = $(window),
	        $body = $('body'),
	        $container = $(settings.container),
	        $hide = $(settings.container + ' > ' + settings.hide);
	
	    // -- Swipe events
	
	    if (settings.direction_open === 'top' || settings.direction_open === 'bottom') $body.hammer().on(settings.swipe_open, pre_swipe_open);else $body.hammer().on(settings.swipe_open, swipe_open);
	
	    $body.hammer().on(settings.swipe_close, swipe_close);
	
	    $body.data('hammer').get('swipe').set({ direction: Hammer.DIRECTION_ALL });
	
	    // -- Other events
	
	    $body.click(swipe_close);
	    $hide.click(swipe_close);
	    $window.resize(swipe_close);
	    $window.resize(set_user_select);
	    window.APP.add_own_event('close_plugins', swipe_close);
	
	    $container.click(stop_propagation);
	
	    set_start_position();
	    set_user_select();
	  };
	
	  this.start = function () {
	    set_start_position();
	  };
	
	  this.plugin_open = plugin_motion_views.plugin_open;
	}; /**
	    * Created by mrskull on 06.01.17.
	    */

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugins_Motion_Views = undefined;
	
	var _models = __webpack_require__(20);
	
	var Plugins_Motion_Views = exports.Plugins_Motion_Views = function Plugins_Motion_Views(config) {
	  var models = new _models.Plugins_Motion_Models(config),
	      css = {};
	
	  this.models = models;
	
	  this.plugin_open = function () {
	    if (models.check_possibility_of_opening()) {
	      var container = models.settings.container,
	          hide = models.settings.hide,
	          direction_close = models.settings.direction_close,
	          duration_open = models.settings.duration_open;
	
	      css[direction_close] = 0;
	
	      $(container).stop().animate(css, duration_open, function () {
	        models.change_possibility_of_opening(false);
	      }).children(hide).fadeIn(duration_open);
	    }
	  };
	
	  this.plugin_close = function () {
	    if (models.check_is_open()) {
	      var container = models.settings.container,
	          hide = models.settings.hide,
	          direction_open = models.settings.direction_open,
	          direction_close = models.settings.direction_close,
	          duration_close = models.settings.duration_close,
	          width = models.settings.width,
	          height = models.settings.height;
	
	      if (direction_open === 'top' || direction_open === 'bottom') css[direction_close] = -height;else if (direction_open === 'right' || direction_open === 'left') css[direction_close] = -width;
	
	      $(container).stop().animate(css, duration_close, function () {
	        models.change_possibility_of_opening(true);
	      }).children(hide).fadeOut(duration_close);
	    }
	  };
	}; /**
	    * Created by mrskull on 06.01.17.
	    */

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugins_Motion_Models = undefined;
	
	var _structure = __webpack_require__(8);
	
	var Plugins_Motion_Models = exports.Plugins_Motion_Models = function Plugins_Motion_Models(config) {
	  var that = this;
	
	  this.settings = {
	    container: undefined,
	    content: undefined,
	    hide: '.hide',
	
	    width: undefined,
	    height: undefined,
	
	    can_open_by: undefined,
	    can_open_from: undefined,
	    can_open_to: undefined,
	
	    direction_open: undefined,
	    direction_close: undefined,
	
	    duration_open: undefined,
	    duration_close: undefined
	  };
	
	  var load_settings = function load_settings() {
	    if (typeof config !== 'undefined') {
	      // -- Container
	      if (typeof config.container !== 'undefined') that.settings.container = config.container;
	
	      // -- Children container
	      if (typeof config.content !== 'undefined') that.settings.content = config.container + ' > ' + config.content;
	
	      // -- Witdh & height
	      var $container = $(that.settings.container);
	      that.settings.width = $container.outerWidth();
	      that.settings.height = $container.outerHeight();
	
	      // -- Can open
	      if (typeof config.can_open_by !== 'undefined') that.settings.can_open_by = config.can_open_by;
	
	      if (typeof config.can_open_from !== 'undefined') that.settings.can_open_from = config.can_open_from;
	
	      if (typeof config.can_open_to !== 'undefined') that.settings.can_open_to = config.can_open_to;
	
	      // -- Duration open & close
	      if (typeof config.duration_open !== 'undefined') that.settings.duration_open = config.duration_open;
	
	      if (typeof config.duration_close !== 'undefined') that.settings.duration_close = config.duration_close;
	
	      // -- Swipe & direction
	      if (typeof config.open !== 'undefined') {
	        switch (config.open) {
	          case 'right':
	            that.settings.swipe_open = 'swiperight';
	            that.settings.swipe_close = 'swipeleft';
	            that.settings.direction_open = 'right';
	            that.settings.direction_close = 'left';
	            break;
	
	          case 'left':
	            that.settings.swipe_open = 'swipeleft';
	            that.settings.swipe_close = 'swiperight';
	            that.settings.direction_open = 'left';
	            that.settings.direction_close = 'right';
	            break;
	
	          case 'up':
	            that.settings.swipe_open = 'swipeup';
	            that.settings.swipe_close = 'swipedown';
	            that.settings.direction_open = 'top';
	            that.settings.direction_close = 'bottom';
	            break;
	
	          case 'down':
	            that.settings.swipe_open = 'swipedown';
	            that.settings.swipe_close = 'swipeup';
	            that.settings.direction_open = 'bottom';
	            that.settings.direction_close = 'top';
	            break;
	        }
	      }
	    }
	  };
	
	  load_settings();
	
	  /////////////////////////
	
	  this.state = {
	    is_open: false,
	    is_not_set: true
	  };
	
	  /////////////////////////
	
	  var check_by_sizes = function check_by_sizes() {
	    var width_window = $(window).outerWidth(),
	        height_window = $(window).outerHeight(),
	        posibility = {
	      from: that.settings.can_open_from,
	      to: that.settings.can_open_to
	    };
	
	    if (that.settings.can_open_by === 'width') {
	      if (typeof posibility.from !== 'undefined') return width_window >= posibility.from;else if (typeof posibility.to !== 'undefined') return width_window <= posibility.to;
	    } else if (that.settings.can_open_by === 'height') {
	      if (typeof posibility.from !== 'undefined') return height_window >= posibility.from;else if (typeof posibility.to !== 'undefined') return height_window <= posibility.to;
	    }
	
	    return false;
	  },
	      check_mobile_by_sizes = function check_mobile_by_sizes() {
	    var width_window = parseInt($(window).outerWidth()),
	        max_mobile_width = 1000;
	
	    return width_window < max_mobile_width;
	  };
	
	  this.check_is_open = function () {
	    return this.state.is_open;
	  };
	
	  this.check_is_close = function () {
	    return !this.state.is_open;
	  };
	
	  this.check_possibility_of_swipe = function () {
	    return check_mobile_by_sizes();
	  };
	
	  this.check_possibility_of_opening = function () {
	    if (check_by_sizes()) if (_structure.data_controller.get('can_do_open_plugin')) return this.check_is_close();
	
	    return false;
	  };
	
	  this.change_possibility_of_opening = function (bool) {
	    this.state.is_open = !bool;
	    _structure.data_controller.change('can_do_open_plugin', bool);
	  };
	}; /**
	    * Created by mrskull on 06.01.17.
	    */

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.plugin_open = exports.start = exports.define = undefined;
	
	var _controllers = __webpack_require__(12);
	
	var _controllers2 = __webpack_require__(18);
	
	/**
	 *    Defining private variables
	 */
	
	/**
	 * Created by mrskull on 07.01.17.
	 */
	
	var cart_loader_controllers = void 0,
	    config_loader = {
	  name: 'cart',
	  container: '#CART > .cart',
	  first_element: '*',
	
	  load_with_page: false
	},
	    cart_motion_controllers = void 0,
	    config_motion = {
	  container: '#CART',
	  content: '.cart',
	  open: 'left',
	  can_open_by: 'width',
	  can_open_from: 0,
	  duration_open: 200,
	  duration_close: 200
	};
	
	/**
	 *    Defining public functions
	 */
	
	var define = exports.define = function define() {
	  cart_motion_controllers.define();
	},
	    start = exports.start = function start() {
	  // -- Loader configuration
	  cart_loader_controllers = new _controllers.Plugins_Loader_Controllers(config_loader);
	  cart_loader_controllers.define();
	
	  // -- Motion configuration
	  cart_motion_controllers = new _controllers2.Plugins_Motion_Controllers(config_motion);
	  cart_motion_controllers.start();
	},
	    plugin_open = exports.plugin_open = function plugin_open() {
	  cart_motion_controllers.plugin_open();
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.plugin_open = exports.start = exports.define = undefined;
	
	var _controllers = __webpack_require__(12);
	
	var _controllers2 = __webpack_require__(18);
	
	/**
	 *    Defining private variables
	 */
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	var navigation_loader_controllers = void 0,
	    config_loader = {
	  name: 'navigation',
	  container: '#NAVIGATION > .navigation',
	  first_element: '*',
	
	  load_with_page: false
	},
	    navigation_motion_controllers = void 0,
	    config_motion = {
	  container: '#NAVIGATION',
	  content: '.navigation',
	  open: 'down',
	
	  can_open_by: 'width',
	  can_open_to: 650,
	
	  duration_open: 300,
	  duration_close: 200
	};
	
	/**
	 *    Defining public functions
	 */
	
	var define = exports.define = function define() {
	  navigation_motion_controllers.define();
	},
	    start = exports.start = function start() {
	  // -- Loader configuration
	  navigation_loader_controllers = new _controllers.Plugins_Loader_Controllers(config_loader);
	  navigation_loader_controllers.define();
	
	  // -- Motion configuration
	  navigation_motion_controllers = new _controllers2.Plugins_Motion_Controllers(config_motion);
	  navigation_motion_controllers.start();
	},
	    plugin_open = exports.plugin_open = function plugin_open() {
	  navigation_motion_controllers.plugin_open();
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.start = exports.define = undefined;
	
	var _controllers = __webpack_require__(12);
	
	var _controllers2 = __webpack_require__(11);
	
	var searcher_controllers = _interopRequireWildcard(_controllers2);
	
	var _controllers3 = __webpack_require__(22);
	
	var navigation_controllers = _interopRequireWildcard(_controllers3);
	
	var _controllers4 = __webpack_require__(21);
	
	var cart_controllers = _interopRequireWildcard(_controllers4);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining private variables
	 */
	
	/**
	 * Created by mrskull on 08.01.17.
	 */
	
	var header_loader_events = void 0,
	    config_loader = {
	  name: 'navigation',
	  container: '#HEADER > .header',
	  first_element: '*'
	};
	
	/**
	 *    Defining public functions
	 */
	
	var define = exports.define = function define() {
	  $('#HEADER .navigation-mini-filter > button').click(searcher_controllers.plugin_open);
	
	  $('#HEADER .navigation-mini-navigation > button').click(navigation_controllers.plugin_open);
	
	  $('#HEADER .navigation-mini-cart > button').click(cart_controllers.plugin_open);
	},
	    start = exports.start = function start() {
	  header_loader_events = new _controllers.Plugins_Loader_Controllers(config_loader);
	  header_loader_events.define();
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.close = exports.open = exports.define = undefined;
	
	var _models = __webpack_require__(25);
	
	var models = _interopRequireWildcard(_models);
	
	var _views = __webpack_require__(26);
	
	var dialogue_window_controller = _interopRequireWildcard(_views);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining public functions
	 */
	
	/**
	 * Created by mrskull on 29.12.16.
	 */
	
	var define = exports.define = function define() {
	  var selectors = models.selectors;
	
	  $(selectors.container).click(close_with_cancel_event);
	  $(selectors.window).click(cancel_event);
	
	  $(selectors.external_buttons).click(open);
	};
	
	/**
	 *    Defining events functions
	 */
	
	var close_with_cancel_event = function close_with_cancel_event(event) {
	  cancel_event(event);
	  close();
	},
	    cancel_event = function cancel_event(event) {
	  event.preventDefault();
	  event.stopPropagation();
	};
	
	/**
	 *    Defining public functions
	 */
	
	var open = exports.open = function open() {
	  var $button = $(this),
	      type = $button.data('type'),
	      name = $button.data('name');
	
	  dialogue_window_controller.open(type, name);
	},
	    close = exports.close = dialogue_window_controller.close;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by mrskull on 29.12.16.
	 */
	
	var settings = exports.settings = {
	  url: '/dialog/'
	},
	    variables = exports.variables = {
	  post_data: {}
	},
	    selectors = exports.selectors = {
	  container: '#DIALOGUE_WINDOW'
	};
	
	selectors.window = selectors.container + '> .window';
	selectors.header = selectors.window + '> .window-header';
	selectors.content = selectors.window + '> .window-content';
	selectors.internal_buttons = selectors.content + ' button.dialog-button';
	selectors.external_buttons = 'button.dialog-button';
	
	var window_data = exports.window_data = {
	  type: '',
	  name: '',
	  title: '',
	  content: '',
	  post_data: {}
	},
	    prepare_post_data = exports.prepare_post_data = function prepare_post_data() {
	  variables.post_data = {};
	
	  variables.post_data.__dialog__ = window_data.type;
	  variables.post_data.name = window_data.name;
	},
	    download_content = exports.download_content = function download_content(callback) {
	  prepare_post_data();
	  window.APP.http_request(settings.url, variables.post_data, callback);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.close = exports.open = exports.window_data = exports.selectors = undefined;
	
	var _models = __webpack_require__(25);
	
	var models = _interopRequireWildcard(_models);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining public functions
	 */
	
	var selectors = exports.selectors = models.selectors,
	    window_data = exports.window_data = models.window_data;
	
	/**
	 *    Defining private functions
	 */
	
	/**
	 * Created by mrskull on 29.12.16.
	 */
	
	var show = function show() {
	  $(selectors.container).fadeIn(200);
	},
	    hide = function hide() {
	  $(selectors.container).fadeOut(200);
	},
	    paste_data = function paste_data(response) {
	  window_data.content = response.responseText;
	
	  $(selectors.header).html(window_data.title);
	
	  $(selectors.content).html(window_data.content);
	
	  show();
	},
	    clear_data = function clear_data() {
	  $(selectors.header).html('Loading...');
	
	  $(selectors.content).html('Loading...');
	},
	    save_type_and_name = function save_type_and_name(type, name) {
	  var result_type = void 0,
	      result_name = void 0,
	      default_type = 'alert',
	      default_name = 'default';
	
	  if (type) result_type = type;else result_type = default_type;
	
	  if (name) result_name = name;else result_name = default_name;
	
	  models.window_data.type = result_type;
	  models.window_data.name = result_name;
	};
	
	///////////////////////////////////////
	
	
	var open = exports.open = function open(type, name) {
	  save_type_and_name(type, name);
	
	  models.download_content(paste_data);
	},
	    close = exports.close = function close() {
	  hide();
	  clear_data();
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.change_content = exports.start = exports.define = undefined;
	
	var _structure = __webpack_require__(8);
	
	var _img_loader = __webpack_require__(28);
	
	var img_loader = _interopRequireWildcard(_img_loader);
	
	var _views = __webpack_require__(29);
	
	var ground_views = _interopRequireWildcard(_views);
	
	var _controllers = __webpack_require__(12);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining private variables
	 */
	
	/**
	 * Created by mrskull on 08.01.17.
	 */
	
	var ground_loader_controllers = void 0,
	    config_loader = {
	  name: 'ground',
	  container: '#GROUND > .ground',
	  first_element: '.block_1'
	};
	
	/**
	 *    Defining private functions
	 */
	
	var go_to_link = function go_to_link(event) {
	  if (event.which === 1) {
	    var url = $(this).attr('href');
	
	    event.preventDefault();
	    window.APP.throw_event(EVENTS.close_plugins);
	
	    ground_views.change_url(url);
	
	    if (_structure.data_controller.get('path') !== url) ground_loader_controllers.change_content(url);
	  }
	},
	    redirect = function redirect(event) {
	  ground_views.change_url(window.APP.DATA.redirect);
	  ground_loader_controllers.redirect(event);
	},
	    back_url = function back_url() {
	  event.preventDefault();
	  ground_loader_controllers.change_content();
	},
	    change_height_content = function change_height_content() {
	  var height = {
	    window: $('#CONTAINTER').innerHeight(),
	    header: $('#HEADER').outerHeight()
	  };
	
	  $(config_loader.container).height(height.window - height.header);
	};
	
	/**
	 *    Defining public functions
	 */
	
	var define = exports.define = function define() {
	  img_loader.define();
	  change_height_content();
	
	  $('a').click(go_to_link);
	  window.APP.add_own_event('redirect', redirect);
	  window.APP.add_own_event('popstate', back_url);
	  $(window).resize(change_height_content);
	},
	    start = exports.start = function start() {
	  ground_loader_controllers = new _controllers.Plugins_Loader_Controllers(config_loader);
	  ground_loader_controllers.define();
	},
	    change_content = exports.change_content = function change_content(url, post_data) {
	  ground_loader_controllers.change_content(url, post_data);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var $query = function $query(css_query) {
	  return document.querySelectorAll(css_query);
	};
	
	var attr = function attr(elem, name) {
	  return elem.getAttribute(name);
	};
	
	////////////////////////////////////////
	
	var define = exports.define = function define() {
	  var $images = $query('img'),
	      default_src = '/static/img/load.jpg',
	      image = new Image();
	
	  function download_img($imgs, i) {
	    if (!$imgs[i]) return false;
	
	    var downloadingImage = new Image(),
	        data_src = attr($imgs[i], 'data-src');
	
	    downloadingImage.onload = function () {
	      $imgs[i].src = this.src;
	      setTimeout(function () {
	        $imgs[i].style = 'opacity: 1;';
	        download_img($images, i + 1);
	      }, 100);
	    };
	
	    downloadingImage.onerror = function () {
	      $imgs[i].src = default_src;
	      $imgs[i].alt = 'Sorry, an error has occurred.';
	      setTimeout(function () {
	        $imgs[i].style = 'opacity: 1;';
	        $imgs[i].setAttribute('class', 'error');
	        download_img($images, i + 1);
	      }, 100);
	    };
	
	    downloadingImage.src = data_src;
	  }
	
	  image.onload = function () {
	    download_img($images, 0);
	  };
	
	  image.src = default_src;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.load_header_page = exports.change_url = undefined;
	
	var _structure = __webpack_require__(8);
	
	var change_url = exports.change_url = function change_url(url) {
	  history.pushState('', url, url);
	},
	    load_header_page = exports.load_header_page = function load_header_page(object) {
	  _structure.data_controller.change_much({
	    title: object.title,
	    description: object.description
	  });
	
	  $('title').html(_structure.data_controller.get('title'));
	  $('meta[ name="description" ]').attr('content', _structure.data_controller.get('description'));
	}; /**
	    * Created by mrskull on 09.01.17.
	    */

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _views = __webpack_require__(31);
	
	var form_controller = _interopRequireWildcard(_views);
	
	var _controllers = __webpack_require__(32);
	
	var validator = _interopRequireWildcard(_controllers);
	
	var _controllers2 = __webpack_require__(36);
	
	var hide_form = _interopRequireWildcard(_controllers2);
	
	var _controllers3 = __webpack_require__(15);
	
	var auto_form = _interopRequireWildcard(_controllers3);
	
	var _controllers4 = __webpack_require__(38);
	
	var post_button = _interopRequireWildcard(_controllers4);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining public functions
	 */
	
	var define = exports.define = function define() {
	  $('form').submit(prepare_form_to_send);
	
	  validator.define();
	  hide_form.define();
	  auto_form.define();
	  post_button.define();
	};
	
	/**
	 *    Defining private functions
	 */
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	var prepare_form_to_send = function prepare_form_to_send(event) {
	  event.preventDefault();
	
	  var form_name = $(this).data('name'),
	      url = $(this).attr('action'),
	      form_object = $(this).serialize_object();
	
	  form_controller.send(form_name, url, form_object);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.send = undefined;
	
	var _controllers = __webpack_require__(27);
	
	var ground_controllers = _interopRequireWildcard(_controllers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining private functions
	 */
	
	var prepare_post_data = function prepare_post_data(form_name, object) {
	  if (!object) object = {};
	
	  object.__form__ = form_name;
	
	  return object;
	};
	
	/**
	 *    Defining public functions
	 */
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	var send = exports.send = function send(form_name, url, data_post) {
	  data_post = prepare_post_data(form_name, data_post);
	  ground_controllers.change_content(url, data_post);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _checkers = __webpack_require__(33);
	
	var Validators = {};
	
	window.Validators = Validators;
	
	var define = exports.define = function define() {
	
	  $('form[data-test=yes]').each(function () {
	    var name = $(this).data('name'),
	        type = $(this).data('type');
	    if (name || type) {
	      Validators[name] = new _checkers.Constructor_Validator(name, type);
	
	      // Sprawdzanie wszystkich pól by odblokować guzik w razie ich poprawnego wypełnienia
	      var fields_of_form = Validators[name].hasErrors();
	      for (var key in fields_of_form) {
	        if (fields_of_form.hasOwnProperty(key)) {
	          var $field = $('form[data-name=' + name + '] *[name=' + key + ']');
	
	          if ($field.val()) validate($field);
	        }
	      }
	    } else console.error('Validation Error: Incorrect or empty form name/type.');
	  });
	
	  $('form[data-test=yes] .test').keyup(catch_event_validate).change(catch_event_validate);
	
	  $('.show_password').change(function () {
	    if ($(this).is(':checked')) show_password(this);else hide_password(this);
	  });
	};
	
	//////////////////////////////   VIEWS VALIDATOR   ///////////////////////////////////
	
	var running_validator = false,
	    form_name = void 0,
	    $form = void 0,
	    Validator = void 0,
	    field = void 0,
	    field_name = void 0,
	    field_value = void 0;
	
	var catch_event_validate = function catch_event_validate() {
	  validate(this);
	};
	
	var validate = function validate(response_field) {
	  if (running_validator === false) {
	    running_validator = true;
	
	    field = response_field;
	
	    form_name = $(field).parents('form').data('name');
	    $form = $('form[data-name=' + form_name + ']');
	    Validator = Validators[form_name];
	    field_name = $(field).attr('name');
	    field_value = $(field).val();
	
	    // Sprawdzanie pojedynczego pola poprzez checker przypisany do jego nazwy
	    Validator.field(field_name, field_value, show_status);
	  }
	};
	
	var show_status = function show_status(result) {
	  if (result) {
	    var $field = $(field),
	        $status = $field.parent().find('.status');
	
	    var bool = result.bool,
	        message = result.message,
	        correction = result.correction;
	
	    Validator.change_status_field(field_name, bool);
	
	    // Sprawdź czy istnieje poprawiona wartość poli i jeśli tak to przypisz do tego pola.
	    if ($field.val() != correction && typeof correction !== 'undefined' && correction !== '') $field.val(correction);
	
	    if (bool) {
	      $field.removeClass('form_error');
	      $status.html('').fadeOut(200);
	    } else if (typeof message === 'undefined') {
	      $field.addClass('form_error');
	      $status.html('').fadeOut(200);
	    } else {
	      $field.addClass('form_error');
	      $status.html(message).fadeIn(200);
	    }
	  }
	
	  var test_form = Validator.check_list_field();
	  change_status_blockade(test_form);
	
	  running_validator = false;
	};
	
	var change_status_blockade = function change_status_blockade(test_form) {
	  if (typeof test_form === 'boolean') {
	    var $button = $form.find('*[type=submit]');
	
	    if (test_form) $button.prop('disabled', false);else $button.prop('disabled', true);
	  }
	};
	
	//////////////////////////////   VIEWS - SHOW/HIDE PASSWORD   ///////////////////////////////////
	
	var show_password = function show_password(checker) {
	  var $checker = $(checker),
	      $field = $checker.parent().find('input[name=password]');
	  $field.attr('type', 'text');
	};
	
	var hide_password = function hide_password(checker) {
	  var $checker = $(checker),
	      $field = $checker.parent().find('input[name=password]');
	  $field.attr('type', 'password');
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Constructor_Validator = undefined;
	
	var _views = __webpack_require__(34);
	
	Object.defineProperty(exports, 'Constructor_Validator', {
	  enumerable: true,
	  get: function get() {
	    return _views.Constructor_Validator;
	  }
	});
	
	
	/////////////////////////////  Prepare checkers  ///////////////////////////////
	
	_views.Constructor_Validator.prototype.types = {};
	
	/////////////////////////////  Checkers  ///////////////////////////////
	
	_views.checker.create_checker('email', function (value, callback) {
	  var result = _views.checker.create_result(),
	      re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	  if (_views.checker.check_condition(re.test(value))) result = _views.checker.create_error('It\'s not email.');
	
	  callback(result);
	});
	
	_views.checker.create_checker('email_db', function (value, callback) {
	  var result = _views.checker.create_result(),
	      re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	  if (_views.checker.check_condition(re.test(value))) {
	    result = _views.checker.create_error('It\'s not email.');
	    callback(result);
	  } else {
	    _views.checker.exist_in_db('email', value, callback, 'Someone already has that email. Try another?');
	  }
	});
	
	_views.checker.create_checker('password', function (value, callback) {
	  var result = _views.checker.create_result();
	
	  if (_views.checker.check_condition(value.length >= 8)) result = _views.checker.create_error('Short passwords are easy to guess. Try one with at least 8 characters.');
	
	  callback(result);
	});
	
	_views.checker.create_checker('proper_name', function (value, callback) {
	  value = value.charAt(0).toUpperCase() + value.slice(1);
	
	  var result = _views.checker.create_result(value);
	
	  if (_views.checker.check_condition(value.length >= 3)) result = _views.checker.create_error('The name is too short.', value);
	
	  callback(result);
	});
	
	_views.checker.create_checker('number', function (value, callback) {
	  value = value.replace(/\s/g, '');
	
	  var result = _views.checker.create_result(value);
	
	  if (_views.checker.check_condition(value.length === 9)) result = _views.checker.create_error('Number length is 9 digits.', value);
	
	  if (_views.checker.check_condition(!isNaN(value))) result = _views.checker.create_error('The number must consist of digits.', value);
	
	  callback(result);
	});
	
	_views.checker.create_checker('full_name', function (value, callback) {
	  value = value.replace(/\w\S*/g, function (txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	  value = value.replace('  ', ' ');
	
	  var result = _views.checker.create_result(value),
	      split = value.split(' ');
	
	  if (_views.checker.check_condition(split.length >= 2 && split[0] !== '' && split[1] !== '')) result = _views.checker.create_error('Full name consists of minimum 2 word.', value);
	
	  callback(result);
	});
	
	_views.checker.create_checker('no_empty', function (value, callback) {
	  var result = _views.checker.create_result();
	
	  if (_views.checker.check_condition(value !== '')) result = _views.checker.create_error("You can't leave this empty.", value);
	
	  callback(result);
	});
	
	////////////////      LENGTH      ///////////////////
	
	_views.checker.create_checker('length_3', function (value, callback) {
	  var result = _views.checker.create_result();
	
	  if (_views.checker.check_condition(value.length >= 3)) result = _views.checker.create_error('It\'s too short.', value);
	
	  callback(result);
	});
	
	////////////////////////////////////////////

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Constructor_Validator = exports.checker = undefined;
	
	var _config = __webpack_require__(35);
	
	var _structure = __webpack_require__(8);
	
	//////////////////////////////////////////////////////
	
	var checker = exports.checker = {
	
	  create_checker: function create_checker(name, callback) {
	    Constructor_Validator.prototype.types[name] = {
	      validate: callback
	    };
	  },
	
	  check_condition: function check_condition(condition) {
	    return !condition;
	  },
	
	  create_result: function create_result(correction) {
	    var result = {
	      bool: true
	    };
	
	    if (typeof correction !== 'undefined') result.correction = correction;
	
	    return result;
	  },
	
	  create_error: function create_error(message, correction) {
	    var result = {
	      bool: false
	    };
	
	    if (typeof message !== 'undefined') result.message = message;
	
	    if (typeof correction !== 'undefined') result.correction = correction;
	
	    return result;
	  },
	
	  exist_in_db: function exist_in_db(name, value, callback, message) {
	    if (name && value) {
	      var post_data = {
	        __exist__: name,
	        value: value,
	        csrfmiddlewaretoken: _structure.data_controller.get('csrf_token')
	      };
	
	      $.post('', post_data).done(function (data) {
	        if (data.__exist__ !== 'undefined') if (data.__exist__ === 'true') callback(checker.create_error(message));else if (data.__exist__ === 'false') callback(checker.create_result());
	      }).fail(function () {
	        console.error('Something is wrong.');
	        callback(checker.create_error('Validator, don\' work. Please, refresh website.'));
	      });
	    }
	  }
	};
	
	///////////////////////////////////////////////////////////////////////////////////////
	
	var Constructor_Validator = exports.Constructor_Validator = function Constructor_Validator(form_name, form_type) {
	  // define base veriable
	
	  var fields_of_form = void 0,
	      $form = $('form[data-name=' + form_name + ']');
	  this.types = Constructor_Validator.prototype.types;
	  this.config = _config.list_configs[form_type];
	
	  if (!this.config) console.error('Validation Error: Invalid form type of list configs.');
	
	  // definitions function
	
	  this.change_status_field = function (name, value) {
	    if (typeof fields_of_form[name] === 'boolean') {
	      if (typeof value === 'boolean') fields_of_form[name] = value;else console.error('Validation Error: Invalid value in the field ' + value + '.');
	    } else console.error('Validation Error: No manual for the field ' + name + '.');
	  };
	
	  this.check_list_field = function () {
	    for (var key in fields_of_form) {
	      if (fields_of_form.hasOwnProperty(key)) if (fields_of_form[key] === false) return false;
	    }return true;
	  };
	
	  var prepare_list_fields = function prepare_list_fields() {
	    var fields = $form.serializeArray(),
	        obj = {},
	        i = void 0,
	        length = fields.length;
	
	    for (i = 0; i < length; ++i) {
	      if ($form.find('*[name=' + fields[i].name + ']').hasClass('test')) obj[fields[i].name] = false;
	    }return obj;
	  };
	
	  fields_of_form = prepare_list_fields();
	
	  ////////////////////////////////////////////////////
	
	  this.field = function (name, value, callback) {
	    if (name && value) {
	      var type = void 0,
	          _checker = void 0;
	
	      type = this.config[name];
	      _checker = this.types[type];
	
	      if (!_checker) throw {
	        name: 'Validation Error',
	        message: 'No manual for the key ' + name + '.'
	      };
	
	      _checker.validate(value, callback);
	    } else if (value !== '') {
	      var result = checker.create_error('Incorrect value ' + name);
	      callback(result);
	    } else callback(checker.create_error());
	  };
	
	  this.hasErrors = function () {
	    return fields_of_form;
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var list_configs = exports.list_configs = {};
	
	list_configs.register = {
	  username: 'length_3',
	  password: 'password',
	  email: 'email_db'
	};
	
	list_configs.login = {
	  email: 'email',
	  password: 'password'
	};
	
	list_configs.user_address = {
	  full_name: 'full_name',
	  address_line_1: 'no_empty',
	  city: 'proper_name',
	  region: 'proper_name',
	  postcode: 'no_empty',
	  country: 'proper_name'
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _views = __webpack_require__(37);
	
	var form = _interopRequireWildcard(_views);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining events
	 */
	
	var define = exports.define = function define() {
	  var $otoczka_pola = $('.hide_form > .otoczka_pola');
	
	  $otoczka_pola.children('div').click(edit_field);
	
	  $otoczka_pola.children('button').click(save_or_edit);
	};
	
	/**
	 *    Defining private event functions
	 */
	
	/**
	 * Created by mrskull on 17.01.17.
	 */
	
	var edit_field = function edit_field() {
	  var $div = $(this),
	      $field = $div.parent().children('input'),
	      $button = $div.parent().children('button');
	
	  // Change words to input
	  $div.fadeOut(100, function () {
	    $field.fadeIn(100, function () {
	      $(this).focus();
	    });
	    $button.html('Save');
	  });
	};
	
	var save_or_edit = function save_or_edit() {
	  var $button = $(this),
	      data_button = $button.data('type'),
	      $div = $button.parent().children('div'),
	      $field = $button.parent().children('input');
	
	  var save_data = function save_data(response, status) {
	    if (status === 'success')
	      // Change input to words
	      $field.fadeOut(100, function () {
	        $div.html($field.val());
	        $div.fadeIn(100);
	        $button.change_data('type', 'edit').html('Edit');
	      });else $button.html('Save: error');
	  };
	
	  if (data_button === 'edit')
	    // Change words to input
	    $div.fadeOut(100, function () {
	      $field.fadeIn(100, function () {
	        $(this).focus();
	      });
	      $button.change_data('type', 'save').html('Save');
	    });else if (data_button === 'save') form.send(this, save_data);
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by mrskull on 17.01.17.
	 */
	
	/**
	 *    Defining private functions
	 */
	
	var send_prepare_post = function send_prepare_post(name, value) {
	  return {
	    __edit__: name,
	    value: value
	  };
	};
	
	/**
	 *    Defining public functions
	 */
	
	var send = exports.send = function send(field, callback) {
	  var $field = $(field),
	      field_name = $field.attr('name'),
	      field_value = $field.val(),
	      post_data = send_prepare_post(field_name, field_value);
	
	  window.APP.http_request(undefined, post_data, callback);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _views = __webpack_require__(39);
	
	var mini_form = _interopRequireWildcard(_views);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var define = exports.define = function define() {
	  $('.post_button').click(send_post_button);
	}; /**
	    * Created by mrskull on 17.12.16.
	    */
	
	var send_post_button_is_running = false;
	
	var send_post_button = function send_post_button() {
	  if (send_post_button_is_running) return false;
	
	  send_post_button_is_running = true;
	
	  var $button = $(this),
	      text_button = $.trim($button.text()),
	      // Delete white spaces
	  data_name = $button.data('name'),
	      data_value = $button.data('value');
	
	  // Change input on disabled
	  $button.prop('disabled', true).html('Loading...');
	
	  var show_answer = function show_answer(response, status) {
	    if (status === 'success') {
	      $button.html(text_button).prop('disabled', false);
	      window.APP.DATA.redirect = undefined;
	      window.APP.DATA.delay = undefined;
	      APP.throw_event(window.EVENTS.redirect);
	    } else {
	      $button.html(text_button + ': Error').prop('disabled', false);
	    }
	
	    send_post_button_is_running = false;
	  };
	
	  setTimeout(function () {
	    mini_form.send(data_name, data_value, show_answer);
	  }, 100);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by mrskull on 18.12.16.
	 */
	
	var send_prepare_post = function send_prepare_post(button_name, button_value) {
	  return {
	    __button__: button_name,
	    value: button_value
	  };
	};
	
	var send = exports.send = function send(button_name, button_value, callback) {
	  var post_data = send_prepare_post(button_name, button_value);
	
	  window.APP.send_post(undefined, post_data, callback);
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map