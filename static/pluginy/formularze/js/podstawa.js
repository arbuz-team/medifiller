/*    JavaScript    */


/*---------------- Kontroler Formularzy ----------------*/

"use strict"; 


var Kontroler_Formularzy = (function()
{

  var _Wygeneruj_Dane_Post = function( Obiekt )
  {
    if( !Obiekt )
      return {};

    Obiekt.__formularz__ = 'true';
    Obiekt.csrfmiddlewaretoken = Kontroler_Danych.Daj( 'csrf_token' );

    return Obiekt;
  }


  var _Przetworz_Adres = function( adres )
  {
    if( !adres )
      adres = Kontroler_Danych.Daj( 'sciezka' );

    return adres;
  }


  var _Wyswietl_Komunikat = function( Dane )
  {
    Kontroler_Tresci.Zmien_Tresc( Dane.__url__ );
  }


  var Przeslij = function( adres, Dane_post )
  {
    adres = _Przetworz_Adres( adres );
    Dane_post = _Wygeneruj_Dane_Post( Dane_post );

    $.post( adres, Dane_post )
      .done( _Wyswietl_Komunikat )
  }


/////////////////   SPRAWDZANIE PÓL   ///////////////////

  var $formularz
    , nazwa_pola
    , wartosc_pola;

  var _Przetworz_Adres = function()
  {
    return Kontroler_Danych.Daj( 'sciezka'  );
  }

  var _Przetworz_Dane_Post = function( Obiekt )
  {
    if( !Obiekt )
      var Obiekt = {};

    Obiekt.__istnieje__ = 'true';
    Obiekt.csrfmiddlewaretoken = Kontroler_Danych.Daj( 'csrf_token' );

    return Obiekt;
  }


  var _Wykorzystaj_Dane = function( Dane ) 
  {
    var $komunikat = $formularz.find( '[name="'+ nazwa_pola +'"]' ).parent().children( '.komunikat' )
      , $submit = $formularz.find( '*[type="submit"]' );

    if( Dane.__istnieje__ === 'true' )
    {
      $komunikat
        .removeClass( 'dobrze' )
        .removeClass( 'zle' )
        .addClass( 'zle' )
      $submit.prop('disabled', true);
    }
    else
    {
      $komunikat
        .removeClass( 'dobrze' )
        .removeClass( 'zle' )
        .addClass( 'dobrze' )
      $submit.prop('disabled', false);
    }
  }


  var Sprawdz_Pole = function( pole, nazwa, wartosc )
  {
    var adres = _Przetworz_Adres()
      , Dane_post = {};

    $formularz = $( pole ).parents('form:first');
    nazwa_pola = nazwa;
    wartosc_pola = wartosc;

    Dane_post[ nazwa ] = wartosc;
    Dane_post = _Przetworz_Dane_Post( Dane_post );

    $.post( adres, Dane_post )
      .done( _Wykorzystaj_Dane )
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        Komunikat.Log( "Request Failed: ", err );
      })
  }

//------------------------------------------

  var udostepnione = 
  {
    Przeslij : Przeslij
    , Sprawdz_Pole : Sprawdz_Pole
  }

  return udostepnione;
})();





