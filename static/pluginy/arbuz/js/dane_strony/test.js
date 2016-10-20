/*    JavaScript    */


/*---------------- Testy struktury Dane_Strony ----------------*/

"use strict"; 


var Test_Kontroler_Danych = (function()
{
  var Uruchom = function()
  {
    Test_Daj();
    Test_Zmien()
    Test_Zmien_Wiele();
  }


  var Test_Daj = function()
  {
    Kanar.Czy_Rowne( Kontroler_Danych.Daj( 'protokol' ), location.protocol );
    Kanar.Czy_Rowne( Kontroler_Danych.Daj( 'nazwa_strony' ), 'Arbuz Team' );
    Kanar.Czy_Nie_Rowne( Kontroler_Danych.Daj( 'kontener' ), 'xd' );
  }


  var Test_Zmien = function()
  {
    Kontroler_Danych.Zmien( 'kontener', 'body' );
    Kontroler_Danych.Zmien( 'protokol', 'body' );

    var komunikaty = Komunikat.Zwroc_Ostatni();

    Kanar.Czy_Rowne( Kontroler_Danych.Daj( 'kontener' ), 'body' );
    Kanar.Czy_Rowne( komunikaty[0], 'Brak dostępu' )
    Kanar.Czy_Rowne( komunikaty[1], 'Zmienna prywatna.' )
    Konsola.Wyczysc();
    Komunikat.Wyczysc_Tablice_Komunikatow();
  }


  var Test_Zmien_Wiele = function()
  {
  }

//------------------------------------------

  var udostepnione = 
  {
    Uruchom : Uruchom
  }

  return udostepnione;
})();

