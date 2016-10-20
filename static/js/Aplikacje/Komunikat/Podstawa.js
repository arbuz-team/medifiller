/*    JavaScript    */


/*---------------- Komunikat ----------------*/

"use strict"; 


var Komunikat = (function()
{

  var T = this
    , tablica_komunikatow = []


  var Zapisz_Komunikat = function( typ, tresc )
  {
    tablica_komunikatow.push( [ typ, tresc ] );
  }


  var Zwroc_Tablice_Komunikatow = function()
  {
    return tablica_komunikatow;
  }


  var Wyczysc_Tablice_Komunikatow = function( typ, tresc )
  {
    tablica_komunikatow = [];
  }


  var Blad = function( typ, tresc )
  {
    Zapisz_Komunikat( typ, tresc );

    Konsola.Utworz_Grupe( typ );
    Konsola.Wypisz_Blad( tresc );
    Konsola.Zamknij_Grupe();
  }


  var Log = function( typ, tresc )
  { 
    Zapisz_Komunikat( typ, tresc );

    Konsola.Utworz_Grupe( typ );
    Konsola.Wypisz_Log( tresc );
    Konsola.Zamknij_Grupe();
  }


  var Blad_Testu = function()
  {
    Blad( 'Testowanie', 'Błąd testu!' );
  }


  var Kanar = function( tresc )
  {
    Blad( 'Kanar', tresc );
  }

//------------------------------------------

  var udostepnione = 
  {
    Zwroc_Tablice_Komunikatow : Zwroc_Tablice_Komunikatow
    , Wyczysc_Tablice_Komunikatow : Wyczysc_Tablice_Komunikatow
    , Blad : Blad
    , Log : Log
    , Blad_Testu : Blad_Testu
    , Kanar : Kanar
  }

  return udostepnione;
})();

