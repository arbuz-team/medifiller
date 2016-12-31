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
	
	var _view = __webpack_require__(10);
	
	var page_controller = _interopRequireWildcard(_view);
	
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
	
	// ---- defining private functions
	
	var send_post_preprocess_url = function send_post_preprocess_url(response_url) {
	  if (response_url) return response_url;else return _structure.data_controller.get('path');
	}; /**
	    * Created by mrskull on 20.12.16.
	    */
	
	var send_post_prepare = function send_post_prepare(post_data) {
	  if (!post_data) post_data = {};
	
	  post_data[_structure.data_controller.get_crsf('name')] = _structure.data_controller.get_crsf('value');
	
	  return post_data;
	};
	
	// ---- defining global functions
	
	window.APP.send_post = function (url, data_post, callback) {
	  url = send_post_preprocess_url(url);
	  data_post = send_post_prepare(data_post);
	
	  $.ajax({
	    type: "POST",
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
	      can_do_redirect: false,
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
	
	var _view = __webpack_require__(11);
	
	var content_controller_events = _interopRequireWildcard(_view);
	
	var _view2 = __webpack_require__(15);
	
	var menu_controller_events = _interopRequireWildcard(_view2);
	
	var _view3 = __webpack_require__(17);
	
	var form_controller_events = _interopRequireWildcard(_view3);
	
	var _view4 = __webpack_require__(27);
	
	var dialogue_window_events = _interopRequireWildcard(_view4);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*---------------- Wydarzenia na stronie ----------------*/
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	var define = function define() {
	  // Usuń wszystkie wydarzenia ze wszystkich elementów
	  $('*').off();
	
	  content_controller_events.define();
	  menu_controller_events.define();
	  form_controller_events.define();
	  dialogue_window_events.define();
	};
	
	var start = exports.start = function start() {
	  define();
	
	  window.addEventListener('define', define, false);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _main = __webpack_require__(12);
	
	var content_controller = _interopRequireWildcard(_main);
	
	var _structure = __webpack_require__(8);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*---------------- Wydarzenia Kontrolera Treści ----------------*/
	
	/**
	 *    Defining public functions
	 */
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	var define = exports.define = function define() {
	  $('a').click(start_link);
	
	  window.addEventListener('popstate', back_url);
	
	  window.addEventListener('redirect', redirect, false);
	
	  //////////////////////////////////////////
	  window.onload = function () {
	    content_controller.start();
	  };
	};
	
	/**
	 *    Defining private functions
	 */
	
	var start_link = function start_link(event) {
	  event.preventDefault();
	
	  var url = $(this).attr('href');
	
	  if (event.which === 1) {
	    if (_structure.data_controller.get('path') !== url) content_controller.change_content(url);
	  }
	};
	
	var back_url = function back_url() {
	  event.preventDefault();
	  content_controller.start();
	};
	
	var redirect = function redirect() {
	  var url = _structure.data_controller.get('path'),
	      delay = 0;
	
	  if (typeof APP !== 'undefined' && typeof APP.DATA !== 'undefined') {
	    if (typeof APP.DATA.redirect !== 'undefined') url = APP.DATA.redirect;
	
	    if (typeof APP.DATA.delay !== 'undefined') delay = APP.DATA.delay;
	  }
	
	  _structure.data_controller.change('can_do_redirect', true);
	
	  setTimeout(function () {
	    if (_structure.data_controller.get('can_do_redirect') === true) content_controller.change_content(url);
	  }, delay);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.start = exports.change_content = undefined;
	
	var _structure = __webpack_require__(8);
	
	var _models = __webpack_require__(13);
	
	var models = _interopRequireWildcard(_models);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*---------------- Kontroler Treści ----------------*/
	
	/**
	 *    Defining public functions
	 */
	
	/**
	 *    Created by mrskull on 24.11.16.
	 */
	
	var change_content = exports.change_content = function change_content(url, post_data) {
	  _structure.data_controller.change('can_do_redirect', false);
	
	  models.prepare_url(url);
	  models.prepare_post_data(post_data);
	
	  _change_url();
	  models.refresh_data();
	
	  _hide_content();
	};
	
	var start = exports.start = function start() {
	  models.refresh_data();
	  models.prepare_post_data();
	
	  _hide_content();
	};
	
	/**
	 *    Defining content functions
	 */
	
	var _download_content = function _download_content(url) {
	  models.prepare_url(url);
	  window.APP.send_post(models.url, models.post_data, _paste_content);
	};
	
	var _paste_content = function _paste_content(response, status) {
	  var html = response.responseText,
	      code = response.status;
	
	  if (models.error === true) {
	    if (status !== 'success') {
	      $(models.settings.container + ' > div').not('.BLOK1').remove();
	      $(models.settings.container + ' > div > .tresc').html('An error has occurred while connecting to server. Please, refresh website or check your connect with network.');
	    }
	  } else if (status !== 'success') {
	    models.prepare_post_data();
	    models.error = true;
	    _download_content('/statement/' + code + '/');
	    return false;
	  }
	
	  if (models.error !== true || status === 'success') $(models.settings.container).html(html).add_data('url', models.url);
	
	  models.error = false;
	  models.url = '';
	  models.refresh_events();
	
	  _show_content();
	};
	
	var _paste_data = function _paste_data(object) {
	  _structure.data_controller.change_much({
	    title: object.title,
	    description: object.description
	  });
	
	  $('title').html(_structure.data_controller.get('title'));
	  $('meta[ name="description" ]').attr('content', _structure.data_controller.get('description'));
	};
	
	var _change_url = function _change_url() {
	  history.pushState('', models.url, models.url);
	};
	
	/**
	 *    Defining view functions
	 */
	
	var _show_content = function _show_content() {
	  var container = models.settings.container,
	      opacity = models.settings.show_content.opacity,
	      duration = models.settings.show_content.duration;
	
	  $(container).animate({ opacity: opacity }, duration, function () {
	    if (window.APP.DATA) _paste_data(window.APP.DATA);
	  });
	};
	
	var _hide_content = function _hide_content() {
	  var container = models.settings.container,
	      opacity = models.settings.hide_content.opacity,
	      duration = models.settings.hide_content.duration;
	
	  $(container).animate({ opacity: opacity }, duration, function () {
	    _download_content();
	  });
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.refresh_events = exports.refresh_data = exports.prepare_post_data = exports.prepare_url = exports.error = exports.post_data = exports.url = exports.settings = undefined;
	
	var _structure = __webpack_require__(8);
	
	var _img_loader = __webpack_require__(14);
	
	var img_loader = _interopRequireWildcard(_img_loader);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Plugin settings
	 */
	
	/**
	 * Created by mrskull on 26.12.16.
	 */
	
	var settings = exports.settings = {
	  show_content: {
	    duration: 150, opacity: 1
	  },
	
	  hide_content: {
	    duration: 100, opacity: 0.4
	  },
	
	  container: '#TRESC'
	};
	
	/**
	 *    Plugin variables
	 */
	
	var url = exports.url = '',
	    post_data = exports.post_data = {},
	    error = exports.error = false;
	
	/**
	 *    Defining prepare functions
	 */
	
	var prepare_url = exports.prepare_url = function prepare_url(response_url) {
	  if (response_url) exports.url = url = response_url;else exports.url = url = _structure.data_controller.get('path');
	};
	
	var prepare_post_data = exports.prepare_post_data = function prepare_post_data(object) {
	  if (!object) object = {};
	
	  if (typeof object.__form__ === 'undefined') object.__content__ = 'true';
	
	  exports.post_data = post_data = object;
	};
	
	/**
	 *    Defining refresh functions
	 */
	
	var refresh_data = exports.refresh_data = function refresh_data() {
	  _structure.data_controller.reset();
	};
	
	var refresh_events = exports.refresh_events = function refresh_events() {
	  APP.throw_event(window.EVENTS.define);
	  img_loader.define();
	};

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.show_hide_menu = exports.define = undefined;
	
	var _main = __webpack_require__(16);
	
	var menu_controller = _interopRequireWildcard(_main);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*---------------- Wydarzenia kontrolera Menu ----------------*/
	
	/**
	 *    Defining public functions
	 */
	
	var define = exports.define = function define() {
	  $('.guzik_menu').click(this.show_hide_menu);
	  $('#MENU .nakladka').click(this.show_hide_menu);
	  $('#MENU > .menu a').click(this.show_hide_menu);
	
	  window.addEventListener('changed_url', menu_controller.select_overlap(), false);
	}; /**
	    * Created by mrskull on 24.11.16.
	    */
	
	var show_hide_menu = exports.show_hide_menu = function show_hide_menu(event) {
	  if (event.which === 1) {
	    var menu = '#MENU';
	
	    if (check_atribute_data(menu, 'wysuniete', 'nie')) menu_controller.show();else if (check_atribute_data(menu, 'wysuniete', 'tak')) menu_controller.hide();
	
	    return false;
	  }
	};
	
	/**
	 *    Defining private functions
	 */
	
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.select_overlap = exports.hide = exports.show = undefined;
	
	var _structure = __webpack_require__(8);
	
	/*---------------- Kontroler Menu ----------------*/
	
	/**
	 *    Defining private veriables
	 */
	
	var $menu = $('#MENU'),
	    $overlay = $menu.children('.overlay');
	
	/**
	 *    Defining public functions
	 */
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	var show = exports.show = function show() {
	  $menu.animate({ 'right': '0px' }, 200);
	  $overlay.show();
	  $menu.add_data('wysuniete', 'tak');
	};
	
	var hide = exports.hide = function hide() {
	  $overlay.hide();
	
	  $menu.animate({ right: '-250px' }, 200);
	  $menu.add_data('wysuniete', 'nie');
	};
	
	var select_overlap = exports.select_overlap = function select_overlap() {
	  var url = _structure.data_controller.get('all_url'),
	      $overlap = $('.menu > li > a');
	
	  $overlap.removeClass('wybrany');
	
	  for (var i = 0; $overlap.length > i; ++i) {
	    if ($overlap[i].href === url) $overlap.eq(i).addClass('wybrany');
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _main = __webpack_require__(18);
	
	var form_controller = _interopRequireWildcard(_main);
	
	var _views = __webpack_require__(19);
	
	var validator = _interopRequireWildcard(_views);
	
	var _view = __webpack_require__(23);
	
	var mini_form = _interopRequireWildcard(_view);
	
	var _view2 = __webpack_require__(25);
	
	var post_button = _interopRequireWildcard(_view2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining public functions
	 */
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	var define = exports.define = function define() {
	  $('form').submit(prepare_form_to_send);
	
	  validator.define();
	  mini_form.define();
	  post_button.define();
	};
	
	/**
	 *    Defining private functions
	 */
	
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
	
	  var form_name = $(this).data('name'),
	      url = $(this).attr('action'),
	      form_object = get_form_fields(this);
	
	  form_controller.send(form_name, url, form_object);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.send = undefined;
	
	var _main = __webpack_require__(12);
	
	var content_controller = _interopRequireWildcard(_main);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining private functions
	 */
	
	var _prepare_post_data = function _prepare_post_data(form_name, object) {
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
	  data_post = _prepare_post_data(form_name, data_post);
	  content_controller.change_content(url, data_post);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _checkers = __webpack_require__(20);
	
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Constructor_Validator = undefined;
	
	var _validator = __webpack_require__(21);
	
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Constructor_Validator = exports.checker = undefined;
	
	var _config = __webpack_require__(22);
	
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
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _main = __webpack_require__(24);
	
	var form = _interopRequireWildcard(_main);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining events
	 */
	
	var define = exports.define = function define() {
	  var $otoczka_pola = $('.mini_form > .otoczka_pola');
	
	  $otoczka_pola.children('div').click(edit_field);
	
	  $otoczka_pola.children('button').click(save_or_edit);
	};
	
	/**
	 *    Defining private event functions
	 */
	
	/**
	 * Created by mrskull on 17.12.16.
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
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by mrskull on 18.12.16.
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
	
	  window.APP.send_post(undefined, post_data, callback);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _main = __webpack_require__(26);
	
	var mini_form = _interopRequireWildcard(_main);
	
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
/* 26 */
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

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.define = undefined;
	
	var _models = __webpack_require__(28);
	
	var models = _interopRequireWildcard(_models);
	
	var _main = __webpack_require__(29);
	
	var dialogue_window_controller = _interopRequireWildcard(_main);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining public functions
	 */
	
	/**
	 * Created by mrskull on 29.12.16.
	 */
	
	var define = exports.define = function define() {
	  var selectors = models.selectors,
	      open_events = models.open_events;
	
	  $(selectors.container).click(close_window);
	  $(selectors.dialogue_window).click(cancel_event);
	
	  APP.add_own_event(open_events.alert, open_alert_window);
	  APP.add_own_event(open_events.prompt, open_prompt_window);
	  APP.add_own_event(open_events.confirm, open_confirm_window);
	
	  $(selectors.submit + '.alert').click(function () {
	    APP.throw_event(window.EVENTS.open_alert);
	  });
	
	  $(selectors.submit + '.prompt').click(function () {
	    APP.throw_event(window.EVENTS.open_prompt);
	  });
	
	  $(selectors.submit + '.confirm').click(function () {
	    APP.throw_event(window.EVENTS.open_confirm);
	  });
	};
	
	/**
	 *    Defining events functions
	 */
	
	var window_data = models.window_data,
	    open_alert_window = function open_alert_window() {
	  window_data.type = 'alert';
	  window_data.title = 'This is alert';
	  models.alert_content.admission = '<b>ble ble</b> aha, no ok...';
	
	  dialogue_window_controller.open_alert();
	},
	    open_prompt_window = function open_prompt_window() {
	  window_data.type = 'prompt';
	  window_data.name = 'authorisation';
	  window_data.title = 'Authorisation';
	  models.prompt_content.admission = 'If you want save the changes enter your password.';
	
	  dialogue_window_controller.open_prompt();
	},
	    open_confirm_window = function open_confirm_window() {
	  window_data.type = 'confirm';
	  window_data.name = 'stupid';
	  window_data.title = 'You are stupid?';
	  models.confirm_content.admission = 'You have to confirm that you are stupid.';
	
	  dialogue_window_controller.open_confirm();
	},
	    close_window = function close_window(event) {
	  event.preventDefault();
	  event.stopPropagation();
	
	  dialogue_window_controller.close_window();
	},
	    cancel_event = function cancel_event(event) {
	  event.preventDefault();
	  event.stopPropagation();
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by mrskull on 29.12.16.
	 */
	
	var selectors = exports.selectors = {
	  container: '#DIALOGUE_WINDOW',
	  dialogue_window: '#DIALOGUE_WINDOW > .window',
	  header: '#DIALOGUE_WINDOW > .window > .window-header',
	  content: '#DIALOGUE_WINDOW > .window > .window-content',
	  submit: 'button.submit_secure'
	},
	    open_events = exports.open_events = {
	  alert: 'open_alert',
	  prompt: 'open_prompt',
	  confirm: 'open_confirm'
	},
	    window_data = exports.window_data = {
	  type: '',
	  name: '',
	  title: '',
	  content: '',
	  post_data: {}
	},
	    alert_content = exports.alert_content = {
	  admission: '',
	  ending: '<button>Ok</button>'
	},
	    prompt_content = exports.prompt_content = {
	  admission: '',
	  form: '<input type="password" name="password" placeholder="password" />',
	  ending: '<button>Ok</button><button>Cancel</button>'
	},
	    confirm_content = exports.confirm_content = {
	  admission: '',
	  ending: '<button>Ok</button><button>Cancel</button>'
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.open_confirm = exports.open_prompt = exports.open_alert = exports.close_window = exports.open_window = exports.window_data = exports.selectors = undefined;
	
	var _models = __webpack_require__(28);
	
	var models = _interopRequireWildcard(_models);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 *    Defining private functions
	 */
	
	var selectors = exports.selectors = models.selectors,
	    window_data = exports.window_data = models.window_data,
	    open_window = exports.open_window = function open_window() {
	  $(selectors.header).html(window_data.title);
	
	  $(selectors.content).html(window_data.content);
	
	  $(selectors.container).fadeIn(200);
	},
	    close_window = exports.close_window = function close_window(event) {
	  $(models.selectors.container).fadeOut(200);
	},
	    open_alert = exports.open_alert = function open_alert() {
	  window_data.content = models.alert_content.admission;
	
	  open_window();
	},
	    open_prompt = exports.open_prompt = function open_prompt() {
	  window_data.content = models.prompt_content.admission + '<br />' + models.prompt_content.form + '<br />' + models.prompt_content.ending;
	
	  open_window();
	},
	    open_confirm = exports.open_confirm = function open_confirm() {
	  window_data.content = models.confirm_content.admission + '<br />' + models.confirm_content.ending;
	
	  open_window();
	}; /**
	    * Created by mrskull on 29.12.16.
	    */

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map