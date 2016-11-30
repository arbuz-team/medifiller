/**
 * Created by mrskull on 24.11.16.
 */

import {Kontroler_Danych, EVENTS} from '../../arbuz/js/dane_strony/struktura';
export {Kontroler_Danych, EVENTS} from '../../arbuz/js/dane_strony/struktura';

/*---------------- Kontroler Treści ----------------*/

export function Kontroler_Tresci()
{

//// PUBLICZNA ----
  this.Uruchom = function()
  {
    this.Zmien_Tresc();
  };


  let _Odswiez_Dane = function()
  {
    Kontroler_Danych.Resetuj();
  };


  let _Odswiez_Wydarzenia = function()
  {
    window.dispatchEvent( EVENTS.define );
  };


  let _Ukryj_Tresc = function()
  {
    $( Kontroler_Danych.Daj( 'kontener' ) +' > div > .tresc' )
    .animate( { opacity: 0.4 }, 100, _Pobierz_Tresc );
  };


  let _Pokaz_Tresc = function( response, status )
  {
    if( status !== 'success' )
    {
      _Pobierz_Tresc( '/komunikat/404/' );
      return false;
    }

    _Odswiez_Wydarzenia();

    $( Kontroler_Danych.Daj( 'kontener' ) +' > div > .tresc' )
    .animate( { opacity: 1 }, 150, () => {
      window.dispatchEvent( EVENTS.changed_adres )
      Wklej_Dane( window.APP );
    });
  };


  let _Pobierz_Tresc = function( adres )
  {
    adres = _Przetworz_Adres( adres );
    let Dane_post = Kontroler_Danych.Daj( 'Dane_post' );

    $( Kontroler_Danych.Daj( 'kontener' ) )
      .load( adres, Dane_post, _Pokaz_Tresc )
      .Dodaj_Dane( 'url', adres )
  };

  /////////////////////////////////////////////////////////

  let _Przetworz_Adres = function( adres )
  {
    if( !adres )
      adres = Kontroler_Danych.Daj( 'sciezka' );

    return adres;
  };


  let _Wygeneruj_Dane_Post = function( Obiekt )
  {
    if( !Obiekt )
      Obiekt = {};

    Obiekt.__esencja__ = 'true';
    Obiekt.csrfmiddlewaretoken = Kontroler_Danych.Daj( 'csrf_token' );

    return Obiekt;
  };


//// PUBLICZNA ----
  let Wklej_Dane = function( Obiekt )
  {
    Kontroler_Danych.Zmien_Wiele( Obiekt );

    $( 'title' ).html( Kontroler_Danych.Daj( 'tytul' ) );
    $( 'meta[ name="description" ]' ).attr( 'content', Kontroler_Danych.Daj( 'opis' ) );
  };


  let _Zmien_Adres = function( adres )
  {
    history.pushState( '', adres, adres );
  };


//// PUBLICZNA ----
  this.Zmien_Tresc = function( adres, Dane_post )
  {
    adres = _Przetworz_Adres( adres );
    _Zmien_Adres( adres );
    _Odswiez_Dane();

    Dane_post = _Wygeneruj_Dane_Post( Dane_post );
    Kontroler_Danych.Zmien( 'Dane_post', Dane_post );

    _Ukryj_Tresc();
  };
}
