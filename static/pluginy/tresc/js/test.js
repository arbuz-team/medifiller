/*    JavaScript    */


/*---------------- TESTY - Zmiana treści ----------------*/

"use strict"; 


var Test_Kontroler_Tresci = (function()
{

  var Uruchom = function()
  {
    Test_Zmien_Tresc();
  }

//------------------------------------------

  var Test_Zmien_Tresc = function()
  {
    Kontroler_Danych.Zmien_Wiele( { protokol : '' } );
    
    var Funkcja_1 = function()
    {
      Kanar.Atrybut_Data( Kontroler_Danych.Daj( 'kontener' ), 'url', '/' )

      Kontroler_Danych.Funkcja_Po_Zaladowaniu = Funkcja_2;
      Kontroler_Tresci.Zmien_Tresc( '/komunikat/404/' );
    }
    
    var Funkcja_2 = function()
    {
      Kanar.Atrybut_Data( Kontroler_Danych.Daj( 'kontener' ), 'url', '/komunikat/404/' )
      Kontroler_Danych.Funkcja_Po_Zaladowaniu = function(){};
    }
    
    Kontroler_Danych.Funkcja_Po_Zaladowaniu = Funkcja_1;
    Kontroler_Tresci.Zmien_Tresc( '/' );

  }

//------------------------------------------

  var udostepnione = 
  {
    Uruchom : Uruchom
  }

  return udostepnione;
})();








