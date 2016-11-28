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
	
	var Kontroler_Strony = _interopRequireWildcard(_wydarzenia);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	Kontroler_Strony.Uruchom();
	
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
	
	Function.prototype.Dodaj_Metode = function (nazwa, funkcja) {
	  this.prototype[nazwa] = funkcja;
	  return this;
	};
	
	$.prototype.Dodaj_Dane = function (nazwa, wartosc) {
	  $(this).attr('data-' + nazwa, wartosc);
	  $(this).data(nazwa, wartosc);
	  return this;
	};
	
	$.prototype.Usun_Dane = function (nazwa) {
	  $(this).removeAttr('data-' + nazwa);
	  $(this).removeData(nazwa);
	  return this;
	};
	
	Array.prototype.Usun_Puste = function () {
	  var tablica_adresu = [];
	
	  for (var j = 0, i = 0; this.length > i; i++) {
	    if (this[i]) {
	      tablica_adresu[j] = this[i];
	      j++;
	    }
	  }
	
	  return tablica_adresu;
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
	exports.Uruchom = exports.Wydarzenia_Kontrolera_Menu = exports.EVENTS = exports.Wydarzenia_Kontrolera_Tresci = undefined;
	
	var _podstawa = __webpack_require__(8);
	
	Object.defineProperty(exports, 'Wydarzenia_Kontrolera_Tresci', {
	  enumerable: true,
	  get: function get() {
	    return _podstawa.Wydarzenia_Kontrolera_Tresci;
	  }
	});
	Object.defineProperty(exports, 'EVENTS', {
	  enumerable: true,
	  get: function get() {
	    return _podstawa.EVENTS;
	  }
	});
	
	var _podstawa2 = __webpack_require__(12);
	
	Object.defineProperty(exports, 'Wydarzenia_Kontrolera_Menu', {
	  enumerable: true,
	  get: function get() {
	    return _podstawa2.Wydarzenia_Kontrolera_Menu;
	  }
	});
	
	
	/*---------------- Wydarzenia na stronie ----------------*/
	
	'use strict';
	
	var Wydarzenia_Tresci = new _podstawa.Wydarzenia_Kontrolera_Tresci(),
	    Wydarzenia_Menu = new _podstawa2.Wydarzenia_Kontrolera_Menu();
	
	var Definiuj = function Definiuj() {
	  // Usuń wszystkie wydarzenia ze wszystkich elementów
	  $('*').off();
	
	  Wydarzenia_Tresci.Definiuj();
	  Wydarzenia_Menu.Definiuj();
	  // Wydarzenia_Kontrolera_Formularzy.Definiuj();
	};
	
	var Uruchom = exports.Uruchom = function Uruchom() {
	  Definiuj();
	
	  window.addEventListener('define', Definiuj, false);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by mrskull on 24.11.16.
	 */
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EVENTS = exports.Kontroler_Danych = undefined;
	
	var _podstawa = __webpack_require__(9);
	
	Object.defineProperty(exports, 'Kontroler_Danych', {
	  enumerable: true,
	  get: function get() {
	    return _podstawa.Kontroler_Danych;
	  }
	});
	Object.defineProperty(exports, 'EVENTS', {
	  enumerable: true,
	  get: function get() {
	    return _podstawa.EVENTS;
	  }
	});
	exports.Wydarzenia_Kontrolera_Tresci = Wydarzenia_Kontrolera_Tresci;
	
	
	var Tresc = new _podstawa.Kontroler_Tresci();
	
	/*---------------- Wydarzenia Kontrolera Treści ----------------*/
	
	function Wydarzenia_Kontrolera_Tresci() {
	
	  this.Definiuj = function () {
	    $('a').click(Zmien_Adres);
	
	    window.addEventListener("popstate", Cofnij_Adres);
	
	    window.onload = function () {
	      Tresc.Uruchom();
	    };
	  };
	
	  //////////////////////////////////////////////////////////
	
	  var Zmien_Adres = function Zmien_Adres(event) {
	    event.preventDefault();
	    var adres = $(this).attr('href');
	
	    if (event.which === 1) {
	      if (_podstawa.Kontroler_Danych.Daj('sciezka') !== adres) Tresc.Zmien_Tresc(adres);
	    }
	  };
	
	  var Cofnij_Adres = function Cofnij_Adres() {
	    event.preventDefault();
	    Tresc.Uruchom();
	  };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EVENTS = exports.Kontroler_Danych = undefined;
	
	var _struktura = __webpack_require__(10);
	
	Object.defineProperty(exports, 'Kontroler_Danych', {
	  enumerable: true,
	  get: function get() {
	    return _struktura.Kontroler_Danych;
	  }
	});
	Object.defineProperty(exports, 'EVENTS', {
	  enumerable: true,
	  get: function get() {
	    return _struktura.EVENTS;
	  }
	});
	exports.Kontroler_Tresci = Kontroler_Tresci;
	
	
	/*---------------- Kontroler Treści ----------------*/
	
	function Kontroler_Tresci() {
	
	  //// PUBLICZNA ----
	  this.Uruchom = function () {
	    this.Zmien_Tresc();
	  };
	
	  var _Odswiez_Dane = function _Odswiez_Dane() {
	    _struktura.Kontroler_Danych.Resetuj();
	  };
	
	  var _Odswiez_Wydarzenia = function _Odswiez_Wydarzenia() {
	    window.dispatchEvent(_struktura.EVENTS.define);
	  };
	
	  var _Ukryj_Tresc = function _Ukryj_Tresc() {
	    $(_struktura.Kontroler_Danych.Daj('kontener') + ' > div > .tresc').animate({ opacity: 0.4 }, 100, _Pobierz_Tresc);
	  };
	
	  var _Pokaz_Tresc = function _Pokaz_Tresc(response, status) {
	    if (status !== 'success') {
	      _Pobierz_Tresc('/komunikat/404/');
	      return false;
	    }
	
	    _Odswiez_Wydarzenia();
	    Wklej_Dane(window.APP);
	
	    $(_struktura.Kontroler_Danych.Daj('kontener') + ' > div > .tresc').animate({ opacity: 1 }, 150, function () {
	      window.dispatchEvent(_struktura.EVENTS.changed_adres);
	    });
	  };
	
	  var _Pobierz_Tresc = function _Pobierz_Tresc(adres) {
	    adres = _Przetworz_Adres(adres);
	    var Dane_post = _struktura.Kontroler_Danych.Daj('Dane_post');
	
	    $(_struktura.Kontroler_Danych.Daj('kontener')).load(adres, Dane_post, _Pokaz_Tresc).Dodaj_Dane('url', adres);
	  };
	
	  /////////////////////////////////////////////////////////
	
	  var _Przetworz_Adres = function _Przetworz_Adres(adres) {
	    if (!adres) adres = _struktura.Kontroler_Danych.Daj('sciezka');
	
	    return adres;
	  };
	
	  var _Wygeneruj_Dane_Post = function _Wygeneruj_Dane_Post(Obiekt) {
	    if (!Obiekt) Obiekt = {};
	
	    Obiekt.__esencja__ = 'true';
	    Obiekt.csrfmiddlewaretoken = _struktura.Kontroler_Danych.Daj('csrf_token');
	
	    return Obiekt;
	  };
	
	  //// PUBLICZNA ----
	  var Wklej_Dane = function Wklej_Dane(Obiekt) {
	    _struktura.Kontroler_Danych.Zmien_Wiele(Obiekt);
	
	    $('title').html(_struktura.Kontroler_Danych.Daj('tytul'));
	    $('meta[ name="description" ]').attr('content', _struktura.Kontroler_Danych.Daj('opis'));
	  };
	
	  var _Zmien_Adres = function _Zmien_Adres(adres) {
	    history.pushState('', adres, adres);
	  };
	
	  //// PUBLICZNA ----
	  this.Zmien_Tresc = function (adres, Dane_post) {
	    adres = _Przetworz_Adres(adres);
	    _Zmien_Adres(adres);
	    _Odswiez_Dane();
	
	    Dane_post = _Wygeneruj_Dane_Post(Dane_post);
	    _struktura.Kontroler_Danych.Zmien('Dane_post', Dane_post);
	
	    _Ukryj_Tresc();
	  };
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Kontroler_Danych = exports.EVENTS = undefined;
	
	var _kreator_wydarzen = __webpack_require__(11);
	
	Object.defineProperty(exports, 'EVENTS', {
	  enumerable: true,
	  get: function get() {
	    return _kreator_wydarzen.EVENTS;
	  }
	});
	
	
	/*---------------- Struktura Dane_Strony ----------------*/
	
	var Kontroler_Danych = function Kontroler_Danych() {
	  var Prywatne_Dane = void 0,
	      Publiczne_Dane = void 0;
	
	  this.Resetuj = function () {
	    Prywatne_Dane = {
	      protokol: location.protocol,
	      nazwa_hosta: location.hostname,
	      pelna_nazwa_hosta: location.host,
	      port: location.port,
	      domena: location.protocol + '://' + location.host,
	      sciezka: location.pathname,
	      pelny_adres: location.href,
	      historia: [],
	      csrf_token: $('input[ name=csrfmiddlewaretoken ]').val() || ''
	    };
	
	    Publiczne_Dane = {
	      nazwa_strony: 'Arbuz Team',
	      tytul: 'Ładuję... - Arbuz Team',
	      opis: 'To jest opis',
	      tresc_komunikatu: 'Pusty komunikat.',
	      kontener: '#TRESC',
	      Dane_post: {}
	    };
	  };
	
	  this.Resetuj();
	
	  this.Daj = function (nazwa) {
	    if (typeof Prywatne_Dane[nazwa] !== 'undefined') return Prywatne_Dane[nazwa];else if (typeof Publiczne_Dane[nazwa] !== 'undefined') return Publiczne_Dane[nazwa];else console.warn('Błędne wywołanie! Nie ma takiej zmiennej.' + nazwa);
	  };
	
	  this.Zmien = function (nazwa, wartosc) {
	    if (typeof Publiczne_Dane[nazwa] !== 'undefined') Publiczne_Dane[nazwa] = wartosc;else if (typeof Prywatne_Dane[nazwa] !== 'undefined') console.warn('Brak dostępu! Zmienna prywatna.');else console.warn('Błędne wywołanie! Nie ma takiej zmiennej. Z');
	  };
	
	  this.Zmien_Wiele = function (Obiekt) {
	    for (var nazwa in Obiekt) {
	      if (Obiekt.hasOwnProperty('nazwa')) {
	        if (nazwa === 'tytul') {
	          if (Obiekt[nazwa] !== '') this.Zmien(nazwa, Obiekt[nazwa] + ' - ' + Publiczne_Dane.nazwa_strony);else this.Zmien(nazwa, Publiczne_Dane.nazwa_strony);
	        } else this.Zmien(nazwa, Obiekt[nazwa]);
	      }
	    }
	  };
	};
	
	var Dane = new Kontroler_Danych();
	
	exports.Kontroler_Danych = Dane;

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Created by mrskull on 24.11.16.
	 */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EVENTS = exports.EVENTS = {
	  define: new Event('define'),
	  changed_adres: new Event('change_adres')
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EVENTS = exports.Kontroler_Danych = undefined;
	
	var _podstawa = __webpack_require__(13);
	
	Object.defineProperty(exports, 'Kontroler_Danych', {
	  enumerable: true,
	  get: function get() {
	    return _podstawa.Kontroler_Danych;
	  }
	});
	Object.defineProperty(exports, 'EVENTS', {
	  enumerable: true,
	  get: function get() {
	    return _podstawa.EVENTS;
	  }
	});
	exports.Wydarzenia_Kontrolera_Menu = Wydarzenia_Kontrolera_Menu;
	
	
	/*---------------- Wydarzenia kontrolera Menu ----------------*/
	
	"use strict";
	
	function Wydarzenia_Kontrolera_Menu() {
	
	  this.Definiuj = function () {
	    $('.guzik_menu').click(this.Pokaz_Ukryj_Menu);
	    $('#MENU .nakladka').click(this.Pokaz_Ukryj_Menu);
	    $('#MENU > .menu a').click(this.Pokaz_Ukryj_Menu);
	
	    window.addEventListener('changed_adres', _podstawa.Kontroler_Menu.Zaznacz_Zakladke(), false);
	  };
	
	  var Czy_Istnieje_Element = function Czy_Istnieje_Element(id) {
	    if ($(id).length) return true;
	
	    return false;
	  };
	
	  var Sprawdz_Atrybut_Data = function Sprawdz_Atrybut_Data(element, nazwa, wartosc) {
	    if (Czy_Istnieje_Element(element)) {
	      return $(element).data(nazwa) === wartosc;
	    }
	
	    return false;
	  };
	
	  this.Pokaz_Ukryj_Menu = function (event) {
	    if (event.which === 1) {
	      var menu = '#MENU';
	
	      if (Sprawdz_Atrybut_Data(menu, 'wysuniete', 'nie')) _podstawa.Kontroler_Menu.Pokaz();else if (Sprawdz_Atrybut_Data(menu, 'wysuniete', 'tak')) _podstawa.Kontroler_Menu.Ukryj();
	
	      return false;
	    }
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Kontroler_Menu = exports.EVENTS = exports.Kontroler_Danych = undefined;
	
	var _struktura = __webpack_require__(10);
	
	Object.defineProperty(exports, 'Kontroler_Danych', {
	  enumerable: true,
	  get: function get() {
	    return _struktura.Kontroler_Danych;
	  }
	});
	Object.defineProperty(exports, 'EVENTS', {
	  enumerable: true,
	  get: function get() {
	    return _struktura.EVENTS;
	  }
	});
	
	
	/*---------------- Kontroler Menu ----------------*/
	
	function Kontroler_Menu() {
	  var $menu = $('#MENU'),
	      $nakladka = $menu.children('.nakladka');
	
	  this.Pokaz = function () {
	    $menu.animate({ 'right': '0px' }, 200);
	    $nakladka.show();
	    $menu.Dodaj_Dane('wysuniete', 'tak');
	  };
	
	  this.Ukryj = function () {
	    $nakladka.hide();
	
	    $menu.animate({ right: '-250px' }, 200);
	    $menu.Dodaj_Dane('wysuniete', 'nie');
	  };
	
	  this.Zaznacz_Zakladke = function () {
	    var adres = _struktura.Kontroler_Danych.Daj('pelny_adres'),
	        $zakladka = $('.menu > li > a');
	
	    $zakladka.removeClass('wybrany');
	
	    for (var i = 0; $zakladka.length > i; ++i) {
	      if ($zakladka[i].href === adres) $zakladka.eq(i).addClass('wybrany');
	    }
	  };
	}
	
	var Menu = new Kontroler_Menu();
	
	exports.Kontroler_Menu = Menu;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map