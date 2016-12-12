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
	
	var _wydarzenia = __webpack_require__(7);
	
	var page_controller = _interopRequireWildcard(_wydarzenia);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	page_controller.start();
	
	// import './autosize-master/dist/autosize';

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	/*    JavaScript    */
	
	/*---------------- Interfejs funkcji standardowych ----------------*/
	
	/*Object.prototype.Dziedzicz_Po = function( rodzic )
	{
	  var dziecko = function() {};
	  dziecko.prototype = rodzic;
	  return new dziecko();
	}*/
	
	Function.prototype.add_method = function (name, callback) {
	  this.prototype[name] = callback;
	  return this;
	};
	
	$.prototype.add_data = function (name, value) {
	  $(this).attr('data-' + name, value);
	  $(this).data(name, value);
	  return this;
	};
	
	$.prototype.delete_data = function (name) {
	  $(this).removeAttr('data-' + name);
	  $(this).removeData(name);
	  return this;
	};
	
	Array.prototype.delete_empty = function () {
	  var url_array = [];
	
	  for (var j = 0, i = 0; this.length > i; i++) {
	    if (this[i]) {
	      url_array[j] = this[i];
	      j++;
	    }
	  }
	
	  return url_array;
	};
	
	/*
	Function.Dodaj_Metode( 'inherits', function( Parent )
	{
	  this.prototype = new Parent();
	  return this;
	})
	*/

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.start = undefined;
	
	var _podstawa = __webpack_require__(8);
	
	var _podstawa2 = __webpack_require__(12);
	
	var _podstawa3 = __webpack_require__(14);
	
	/*---------------- Wydarzenia na stronie ----------------*/
	
	var define = function define() {
	  // Usuń wszystkie wydarzenia ze wszystkich elementów
	  $('*').off();
	
	  _podstawa.content_controller_events.define();
	  _podstawa2.menu_controller_events.define();
	  _podstawa3.form_controller_events.define();
	}; /**
	    * Created by mrskull on 24.11.16.
	    */
	
	var start = exports.start = function start() {
	  define();
	
	  window.addEventListener('define', define, false);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.content_controller_events = exports.data_controller = undefined;
	
	var _podstawa = __webpack_require__(9);
	
	Object.defineProperty(exports, 'data_controller', {
	  enumerable: true,
	  get: function get() {
	    return _podstawa.data_controller;
	  }
	});
	
	
	/*---------------- Wydarzenia Kontrolera Treści ----------------*/
	
	var content_controller_events = exports.content_controller_events = new function Content_Controller_Events() {
	
	  this.define = function () {
	    $('a').click(start_link);
	
	    window.addEventListener('popstate', back_url);
	
	    window.addEventListener('change_url', change_url, false);
	
	    window.addEventListener('redirect', redirect, false);
	
	    //////////////////////////////////////////
	    window.onload = function () {
	      _podstawa.content_controller.start();
	    };
	  };
	
	  //////////////////////////////////////////////////////////
	
	  var start_link = function start_link(event) {
	    event.preventDefault();
	    var url = $(this).attr('href');
	
	    if (event.which === 1) {
	      if (_podstawa.data_controller.get('path') !== url) _podstawa.content_controller.change_content(url);
	    }
	  };
	
	  var change_url = function change_url() {
	    var url = _podstawa.data_controller.prepare_url_to_change();
	    _podstawa.content_controller.change_content(url);
	  };
	
	  var back_url = function back_url() {
	    event.preventDefault();
	    _podstawa.content_controller.start();
	  };
	
	  var redirect = function redirect() {
	    var url = void 0;
	
	    if (typeof APP !== 'undefined' && typeof APP.redirect !== 'undefined') url = APP.redirect;else url = '/';
	
	    setTimeout(function () {
	      _podstawa.content_controller.change_content(url);
	    }, 2000);
	  };
	}();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.content_controller = exports.data_controller = undefined;
	
	var _struktura = __webpack_require__(10);
	
	Object.defineProperty(exports, 'data_controller', {
	  enumerable: true,
	  get: function get() {
	    return _struktura.data_controller;
	  }
	});
	
	
	/*---------------- Kontroler Treści ----------------*/
	
	var content_controller = exports.content_controller = new function Content_Controller() {
	  var url = void 0,
	      post_data = void 0;
	
	  ///////////////////////////////////////////////////////////////////////////
	
	  var _refresh_data = function _refresh_data() {
	    _struktura.data_controller.reset();
	  };
	
	  var _refresh_events = function _refresh_events() {
	    window.dispatchEvent(window.EVENTS.define);
	  };
	
	  var _show_content = function _show_content(response, status, error) {
	    var $kontener = $(_struktura.data_controller.get('container') + ' > div > .tresc');
	
	    if (error === 'yes') {
	      if (status !== 'success') {
	        $kontener.html('An error has occurred while connecting to server. Please, refresh website or check your connect with network.');
	      }
	    } else {
	      if (status !== 'success') {
	        _download_content('/statement/404/', 'yes');
	        return false;
	      }
	    }
	
	    _refresh_events();
	
	    $kontener.animate({ opacity: 1 }, 150, function () {
	      if (window.APP) paste_data(window.APP);
	    });
	  };
	
	  var _download_content = function _download_content(response_url, error) {
	    url = _preprocess_url(response_url);
	
	    $(_struktura.data_controller.get('container')).load(url, post_data, function (response, status) {
	      if (error) _show_content(response, status, error);else _show_content(response, status);
	    }).add_data('url', url);
	  };
	
	  var _hide_content = function _hide_content() {
	    $(_struktura.data_controller.get('container') + ' > div > .tresc').animate({ opacity: 0.4 }, 100, function () {
	      _download_content();
	    });
	  };
	
	  ///////////////////////////////////////////////////////////////////////////
	
	  this.change_content = function (response_url, response_post_data) {
	    url = _preprocess_url(response_url);
	    _change_url(url);
	    _refresh_data();
	
	    post_data = _prepare_post_data(response_post_data);
	
	    _hide_content();
	  };
	
	  this.start = function () {
	    _refresh_data();
	
	    post_data = _prepare_post_data();
	
	    _hide_content();
	  };
	
	  ///////////////////////////////////////////////////////////////////////////
	
	  var _preprocess_url = function _preprocess_url(response_url) {
	    if (!response_url) if (url) return url;else return _struktura.data_controller.get('path');
	
	    return response_url;
	  };
	
	  var _prepare_post_data = function _prepare_post_data(object) {
	    if (!object) object = {};
	
	    if (typeof object.__form__ === 'undefined') object.__content__ = 'true';
	    object.csrfmiddlewaretoken = _struktura.data_controller.get('csrf_token');
	
	    return object;
	  };
	
	  var paste_data = function paste_data(object) {
	    _struktura.data_controller.change_much(object);
	
	    $('title').html(_struktura.data_controller.get('title'));
	    $('meta[ name="description" ]').attr('content', _struktura.data_controller.get('description'));
	  };
	
	  var _change_url = function _change_url(url) {
	    history.pushState('', url, url);
	  };
	}();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.data_controller = undefined;
	
	__webpack_require__(11);
	
	/*---------------- Struktura Dane_Strony ----------------*/
	
	var data_controller = exports.data_controller = new function Data_Controler() {
	  var private_data = void 0,
	      public_data = void 0;
	
	  this.reset = function () {
	    private_data = {
	      protocol: location.protocol,
	      host_name: location.hostname,
	      all_hosta_name: location.host,
	      port: location.port,
	      domena: location.protocol + '://' + location.host,
	      path: location.pathname,
	      all_url: location.href,
	      history: [],
	      csrf_token: $('input[ name=csrfmiddlewaretoken ]').val() || ''
	    };
	
	    public_data = {
	      url_to_change: '',
	      page_name: 'Spasungate',
	      title: 'Loading... - Spasungate',
	      description: 'This page is shop, which is ownership Spasungate.',
	      statement_content: 'Empty statement.',
	      container: '#TRESC'
	    };
	  };
	
	  this.reset();
	
	  this.get = function (name) {
	    if (typeof private_data[name] !== 'undefined') return private_data[name];else if (typeof public_data[name] !== 'undefined') return public_data[name];else {
	      console.warn('Wrong call! Veriable with this name doesn\'t exist.');
	      console.trace();
	    }
	  };
	
	  this.change = function (name, wartosc) {
	    if (typeof public_data[name] !== 'undefined') public_data[name] = wartosc;else if (typeof private_data[name] !== 'undefined') {
	      console.warn('Wrong call! Veriable with this name doesn\'t exist.');
	      console.trace();
	    } else {
	      console.warn('Wrong call! Veriable with this name doesn\'t exist.');
	      console.trace();
	    }
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
	
	  this.prepare_url_to_change = function () {
	    if (public_data.url_to_change !== '') return public_data.url_to_change;else return '/';
	  };
	}(); /**
	      * Created by mrskull on 24.11.16.
	      */

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	window.EVENTS = {
	  define: new Event('define'),
	  change_url: new Event('change_url'),
	  redirect: new Event('redirect')
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.menu_controller_events = exports.data_controller = undefined;
	
	var _podstawa = __webpack_require__(13);
	
	Object.defineProperty(exports, 'data_controller', {
	  enumerable: true,
	  get: function get() {
	    return _podstawa.data_controller;
	  }
	});
	
	
	/*---------------- Wydarzenia kontrolera Menu ----------------*/
	
	var menu_controller_events = exports.menu_controller_events = new function Menu_Controller_Events() {
	
	  this.define = function () {
	    $('.guzik_menu').click(this.show_hide_menu);
	    $('#MENU .nakladka').click(this.show_hide_menu);
	    $('#MENU > .menu a').click(this.show_hide_menu);
	
	    window.addEventListener('changed_url', _podstawa.menu_controller.select_overlap(), false);
	  };
	
	  var is_exist = function is_exist(element) {
	    if ($(element).length) return true;
	
	    return false;
	  };
	
	  var check_atribute_data = function check_atribute_data(element, name, value) {
	    if (is_exist(element)) {
	      return $(element).data(name) === value;
	    }
	
	    return false;
	  };
	
	  this.show_hide_menu = function (event) {
	    if (event.which === 1) {
	      var menu = '#MENU';
	
	      if (check_atribute_data(menu, 'wysuniete', 'nie')) _podstawa.menu_controller.show();else if (check_atribute_data(menu, 'wysuniete', 'tak')) _podstawa.menu_controller.hide();
	
	      return false;
	    }
	  };
	}();

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.menu_controller = exports.data_controller = undefined;
	
	var _struktura = __webpack_require__(10);
	
	Object.defineProperty(exports, 'data_controller', {
	  enumerable: true,
	  get: function get() {
	    return _struktura.data_controller;
	  }
	});
	
	
	/*---------------- Kontroler Menu ----------------*/
	
	var menu_controller = exports.menu_controller = new function Menu_Controller() {
	  var $menu = $('#MENU'),
	      $overlay = $menu.children('.overlay');
	
	  this.show = function () {
	    $menu.animate({ 'right': '0px' }, 200);
	    $overlay.show();
	    $menu.add_data('wysuniete', 'tak');
	  };
	
	  this.hide = function () {
	    $overlay.hide();
	
	    $menu.animate({ right: '-250px' }, 200);
	    $menu.add_data('wysuniete', 'nie');
	  };
	
	  this.select_overlap = function () {
	    var url = _struktura.data_controller.get('all_url'),
	        $overlap = $('.menu > li > a');
	
	    $overlap.removeClass('wybrany');
	
	    for (var i = 0; $overlap.length > i; ++i) {
	      if ($overlap[i].href === url) $overlap.eq(i).addClass('wybrany');
	    }
	  };
	}();

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.form_controller_events = undefined;
	
	var _podstawa = __webpack_require__(15);
	
	var _views = __webpack_require__(16);
	
	var validator = _interopRequireWildcard(_views);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*    JavaScript    */
	
	var form_controller_events = exports.form_controller_events = new function Form_Controller_Events() {
	
	  this.define = function () {
	    $('form').submit(prepare_form_to_send);
	
	    validator.define();
	  };
	
	  //////////////////////////////////////////////////////////
	
	  var get_form_fields = function get_form_fields(element) {
	    var $fields = $(element).serializeArray(),
	        form_object = {};
	
	    $.each($fields, function (i, field) {
	      form_object[field.name] = field.value;
	    });
	
	    return form_object;
	  };
	
	  var prepare_form_to_send = function prepare_form_to_send(event) {
	    event.preventDefault();
	
	    var form_name = $(this).data('form'),
	        url = $(this).attr('action'),
	        form_object = get_form_fields(this);
	
	    if (typeof url === 'undefined' || url === '') url = _podstawa.data_controller.get('path');
	
	    _podstawa.form_controller.send(form_name, url, form_object);
	  };
	}();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.form_controller = exports.data_controller = undefined;
	
	var _struktura = __webpack_require__(10);
	
	Object.defineProperty(exports, 'data_controller', {
	  enumerable: true,
	  get: function get() {
	    return _struktura.data_controller;
	  }
	});
	
	var _podstawa = __webpack_require__(9);
	
	var form_controller = exports.form_controller = new function Form_Controller() {
	
	  var _prepare_post_data = function _prepare_post_data(form_name, object) {
	    if (!object) return {};
	
	    object.__form__ = form_name;
	
	    return object;
	  };
	
	  this.send = function (form_name, url, data_post) {
	    data_post = _prepare_post_data(form_name, data_post);
	    _podstawa.content_controller.change_content(url, data_post);
	  };
	
	  /////////////////   SPRAWDZANIE PÓL   ///////////////////
	
	  // let $form
	  //   , field_name
	  //   , field_value;
	  //
	  //
	  // let _preprocess_post_data = function( object )
	  // {
	  //   if( !object )
	  //     object = {};
	  //
	  //   object.__istnieje__ = 'true';
	  //   object.csrfmiddlewaretoken = data_controller.get( 'csrf_token' );
	  //
	  //   return object;
	  // };
	}();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _checkers = __webpack_require__(17);
	
	var Validators = {};
	
	window.Validators = Validators;
	
	var define = exports.define = function define() {
	
	  $('form[data-test=yes]').each(function () {
	    var name = $(this).attr('data-form');
	    if (name) {
	      if (typeof Validators[name] === 'undefined') Validators[name] = new _checkers.Constructor_Validator(name);
	    } else console.error('Validation Error: Incorrect or empty form name "' + name + '".');
	  });
	
	  $('form[data-test=yes] .test').keyup(validate).change(validate);
	
	  $('.show_password').change(function () {
	    if ($(this).is(':checked')) show_password(this);else hide_password(this);
	  });
	};
	
	//////////////////////////////   VIEWS VALIDATOR   ///////////////////////////////////
	
	var running_validator = false,
	    form_name = void 0,
	    Validator = void 0,
	    field = void 0,
	    field_name = void 0,
	    field_value = void 0;
	
	var validate = function validate() {
	  if (running_validator === false) {
	    running_validator = true;
	
	    field = this;
	    form_name = $(field).parents('form').data('form');
	    Validator = Validators[form_name];
	    field_name = $(field).attr('name');
	    field_value = $(field).val();
	
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
	    var $form = $('form[data-form=' + form_name + ']'),
	        $button = $form.find('*[type=submit]');
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Constructor_Validator = undefined;
	
	var _validator = __webpack_require__(18);
	
	Object.defineProperty(exports, 'Constructor_Validator', {
	  enumerable: true,
	  get: function get() {
	    return _validator.Constructor_Validator;
	  }
	});
	
	
	/////////////////////////////  Prepare checkers  ///////////////////////////////
	
	_validator.Constructor_Validator.prototype.types = {};
	
	/////////////////////////////  Checkers  ///////////////////////////////
	
	_validator.checker.create_checker('email', function (value, callback) {
	  var result = _validator.checker.create_result(),
	      re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	  if (_validator.checker.check_condition(re.test(value))) result = _validator.checker.create_error('It\'s not email.');
	
	  callback(result);
	});
	
	_validator.checker.create_checker('email_db', function (value, callback) {
	  var result = _validator.checker.create_result(),
	      re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	  if (_validator.checker.check_condition(re.test(value))) {
	    result = _validator.checker.create_error('It\'s not email.');
	    callback(result);
	  } else {
	    _validator.checker.exist_in_db('email', value, callback, 'Someone already has that email. Try another?');
	  }
	});
	
	_validator.checker.create_checker('password', function (value, callback) {
	  var result = _validator.checker.create_result();
	
	  if (_validator.checker.check_condition(value.length >= 8)) result = _validator.checker.create_error('Short passwords are easy to guess. Try one with at least 8 characters.');
	
	  callback(result);
	});
	
	_validator.checker.create_checker('proper_name', function (value, callback) {
	  value = value.charAt(0).toUpperCase() + value.slice(1);
	
	  var result = _validator.checker.create_result(value);
	
	  if (_validator.checker.check_condition(value.length >= 3)) result = _validator.checker.create_error('The name is too short.', value);
	
	  callback(result);
	});
	
	_validator.checker.create_checker('number', function (value, callback) {
	  value = value.replace(/\s/g, '');
	
	  var result = _validator.checker.create_result(value);
	
	  if (_validator.checker.check_condition(value.length === 9)) result = _validator.checker.create_error('Number length is 9 digits.', value);
	
	  if (_validator.checker.check_condition(!isNaN(value))) result = _validator.checker.create_error('The number must consist of digits.', value);
	
	  callback(result);
	});
	
	_validator.checker.create_checker('full_name', function (value, callback) {
	  value = value.replace(/\w\S*/g, function (txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	  value = value.replace('  ', ' ');
	
	  var result = _validator.checker.create_result(value),
	      split = value.split(' ');
	
	  if (_validator.checker.check_condition(split.length >= 2 && split[0] !== '' && split[1] !== '')) result = _validator.checker.create_error('Full name consists of minimum 2 word.', value);
	
	  callback(result);
	});
	
	_validator.checker.create_checker('no_empty', function (value, callback) {
	  var result = _validator.checker.create_result();
	
	  if (_validator.checker.check_condition(value !== '')) result = _validator.checker.create_error("You can't leave this empty.", value);
	
	  callback(result);
	});
	
	////////////////      LENGTH      ///////////////////
	
	_validator.checker.create_checker('length_3', function (value, callback) {
	  var result = _validator.checker.create_result();
	
	  if (_validator.checker.check_condition(value.length >= 3)) result = _validator.checker.create_error('It\'s too short.', value);
	
	  callback(result);
	});
	
	////////////////////////////////////////////

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Constructor_Validator = exports.checker = undefined;
	
	var _config = __webpack_require__(19);
	
	var _struktura = __webpack_require__(10);
	
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
	        csrfmiddlewaretoken: _struktura.data_controller.get('csrf_token')
	      };
	
	      $.post('', post_data).done(function (data) {
	        if (data.__exist__ !== 'undefined') if (data.__exist__ === 'true') callback(checker.create_error(message));else if (data.__exist__ === 'false') callback(checker.create_result());
	      }).fail(function (err) {
	        console.error(err);
	      });
	    }
	  }
	};
	
	//////////////////////////////////////////////////////
	
	var Constructor_Validator = exports.Constructor_Validator = function Constructor_Validator(form_name) {
	  // define base veriable
	
	  var fields_of_form = void 0;
	  this.types = Constructor_Validator.prototype.types;
	  this.config = _config.list_configs[form_name];
	
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
	
	  var prepare_list_fields = function prepare_list_fields(form) {
	    var fields = $(form).serializeArray(),
	        obj = {},
	        i = void 0,
	        length = fields.length;
	    for (i = 0; i < length; ++i) {
	      if ($(form).find('*[name=' + fields[i].name + ']').hasClass('test')) obj[fields[i].name] = false;
	    }return obj;
	  };
	
	  fields_of_form = prepare_list_fields($('form[data-form=' + form_name + ']'));
	
	  ////////////////////////////////////////////////////
	
	  this.field = function (name, value, callback) {
	    var results = [];
	
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
	      results = checker.create_error('Incorrect value ' + name);
	      callback(results);
	    } else callback(checker.create_error());
	  };
	
	  this.hasErrors = function () {
	    return fields_of_form;
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var list_configs = exports.list_configs = {};
	
	list_configs.register = {
	  username: 'length_3',
	  password: 'password',
	  email: 'email'
	};
	
	list_configs.login = {
	  email: 'email_db',
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map