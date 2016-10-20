/*    JavaScript    */


/*---------------- Testy wydarzeń Kontrolera Treści ----------------*/

"use strict"; 


var Test_Wydarzenia_Kontrolera_Tresci = (function()
{

  var Uruchom = function()
  {
    Test_Zmien_Adres();
  }

//------------------------------------------

  var Test_Zmien_Adres = function()
  {
    var $link = $( 'a' ).first()
      , adres = $link.attr( 'href' )

    $link.trigger( { type: 'click', which: 1 } );

    Kanar.Czy_Rowne( Kontroler_Danych.Daj( 'sciezka' ), adres )
  }

//------------------------------------------

  var udostepnione = 
  {
    Uruchom : Uruchom
  }

  return udostepnione;
})();
 

