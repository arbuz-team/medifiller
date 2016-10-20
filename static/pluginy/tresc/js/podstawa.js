/*    JavaScript    */


/*---------------- Tresc ----------------*/

"use strict"; 


var Kontroler_Tresci = (function()
{

  var _Odswiez_Dane = function()
  {
    Kontroler_Danych.Resetuj();
  }


  var _Odswiez_Wydarzenia = function()
  {
    Wydarzenia.Definiuj();
  }


  var _Ukryj_Tresc = function()
  {
    $( Kontroler_Danych.Daj( 'kontener' ) +' > div > .tresc' )
    .animate( { opacity: 0.4 }, 100, _Pobierz_Tresc );
  }


  var _Pokaz_Tresc = function( response, status )
  {
    if( status !== 'success' )
    {
      Zmien_Adres( '/komunikat/404/' )
    }

    _Odswiez_Wydarzenia();

    $( Kontroler_Danych.Daj( 'kontener' ) +' > div > .tresc' )
    .animate( { opacity: 1 }, 150, Kontroler_Menu.Zaznacz_Zakladke() );
  }


  var _Pobierz_Tresc = function()
  {
    var adres = Kontroler_Danych.Daj( 'sciezka' )
      , Dane_post = Kontroler_Danych.Daj( 'Dane_post' );

    $( Kontroler_Danych.Daj( 'kontener' ) )
      .load( adres, Dane_post, _Pokaz_Tresc )
      .Dodaj_Dane( 'url', adres )
  }

/////////////////////////////////////////////////////////

  var _Przetworz_Adres = function( adres )
  {
    if( !adres )
      adres = Kontroler_Danych.Daj( 'sciezka' );

    return adres;
  }


  var _Wygeneruj_Dane_Post = function( Obiekt )
  {
    if( !Obiekt )
    {
      Obiekt = {};
      Obiekt.__arbuz__ = 'true';
    }

    Obiekt.csrfmiddlewaretoken = Kontroler_Danych.Daj( 'csrf_token' );

    return Obiekt;
  }


  var Wklej_Dane = function( Obiekt )
  {
    Kontroler_Danych.Zmien_Wiele( Obiekt );

    $( 'title' ).html( Kontroler_Danych.Daj( 'tytul' ) );
    $( 'meta[ name="description" ]' ).attr( 'content', Kontroler_Danych.Daj( 'opis' ) );
  }


  var Uruchom = function()
  {
    Zmien_Tresc();
  }


  var Zmien_Adres = function( adres )
  {
    history.pushState( '', adres, adres );
  }


  var Zmien_Tresc = function( adres, Dane_post )
  {
    adres = _Przetworz_Adres( adres );
    Zmien_Adres( adres );
    _Odswiez_Dane();

    Dane_post = _Wygeneruj_Dane_Post( Dane_post );
    Kontroler_Danych.Zmien( 'Dane_post', Dane_post );

    _Ukryj_Tresc();
  }

//------------------------------------------

  var udostepnione = 
  {
    Uruchom : Uruchom
    , Wklej_Dane : Wklej_Dane
    , Zmien_Tresc : Zmien_Tresc
  }

  return udostepnione;
})();




