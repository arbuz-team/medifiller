/*    JavaScript    */


/*---------------- Kanar ----------------*/

/*  Kanar to osoba zajmująca się sprawdzaniem 
    biletów i wystawianiem mandatów za ich brak.
    Ta klasa łączy klasy Komunikat i Sprawdz. 
    Robi to sprawdzając różne warunki 
    i wyświetlając odpowiedni komunikat */

"use strict"; 


var Kanar = (function()
{

  var Czy_Rowne = function( wartosc_1, wartosc_2 )
  {
    if( Sprawdz.Czy_Nie_Rowne( wartosc_1, wartosc_2 ) )
      Komunikat.Kanar( 'Wartosci nie są równe!' );
  }

  var Czy_Nie_Rowne = function( wartosc_1, wartosc_2 )
  {
    if( Sprawdz.Czy_Rowne( wartosc_1, wartosc_2 ) )
      Komunikat.Kanar( 'Wartosci są równe!' );
  }


  var Czy_Istnieje_Element = function( nazwa_elementu )
  {
    if( Sprawdz.Czy_Nie_Istnieje_Element( nazwa_elementu ) )
      Komunikat.Kanar( 'Element nie istnieje!' );
  }


  var Czy_Nie_Istnieje_Element = function( nazwa_elementu )
  {
    if( Sprawdz.Czy_Istnieje_Element( nazwa_elementu ) )
      Komunikat.Kanar( 'Element istnieje!' );
  }


  var Czy_Tablica = function( tablica )
  {
    if( Sprawdz.Czy_Nie_Tablica( tablica ) )
      Komunikat.Kanar( 'To nie jest tablica!' );
  }


  var Czy_Nie_Tablica = function( tablica )
  {
    if( Sprawdz.Czy_Tablica( tablica ) )
      Komunikat.Kanar( 'To jest tablica!' );
  }


  var Atrybut_Data = function( element, nazwa, wartosc )
  {
    if( Sprawdz.Atrybut_Data( element, nazwa, wartosc ) !== true )
      Komunikat.Kanar( 'Błędny atrybut `data-*` lub błędna wartosc tego atrybutu!' );
  }


//------------------------------------------

  var udostepnione = 
  {
    Czy_Rowne : Czy_Rowne
    , Czy_Nie_Rowne : Czy_Nie_Rowne
    , Czy_Istnieje_Element : Czy_Istnieje_Element
    , Czy_Nie_Istnieje_Element : Czy_Nie_Istnieje_Element
    , Czy_Tablica : Czy_Tablica
    , Czy_Nie_Tablica : Czy_Nie_Tablica
    , Atrybut_Data : Atrybut_Data
  }

  return udostepnione;
})();



