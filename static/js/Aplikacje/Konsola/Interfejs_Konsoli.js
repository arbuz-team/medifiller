/*    JavaScript    */


/*---------------- Interfejs - Konsola ----------------*/

"use strict"; 


var Konsola = (function()
{

  var Utworz_Grupe = function( tresc )
  {
    console.group( tresc +':' );
  }


  var Zamknij_Grupe = function()
  {
    console.groupEnd();
  }


  var Wypisz_Pozycje_Wywolania = function( typ, tresc )
  {
    console.trace();
  }


  var Wypisz_Log = function( tresc )
  {
    console.log( tresc );
  }


  var Wypisz_Blad = function( tresc )
  {
    console.error( tresc );
  }


  var Wyczysc = function()
  {
    if( TEST_SZCZEGOLOWY === false )
      console.clear();
  }

//------------------------------------------

  var udostepnione = 
  {
    Utworz_Grupe : Utworz_Grupe
    , Zamknij_Grupe : Zamknij_Grupe
    , Wypisz_Pozycje_Wywolania : Wypisz_Pozycje_Wywolania
    , Wypisz_Log : Wypisz_Log
    , Wypisz_Blad : Wypisz_Blad
    , Wyczysc : Wyczysc
  }

  return udostepnione;
})();

