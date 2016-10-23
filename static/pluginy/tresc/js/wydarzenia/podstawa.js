/*    JavaScript    */


/*---------------- Wydarzenia Kontrolera Treści ----------------*/

"use strict"; 


var Wydarzenia_Kontrolera_Tresci = (function()
{
  
  var Definiuj = function()
  {
    $( 'a' ).click( Zmien_Adres );

    window.addEventListener( "popstate", Cofnij_Adres );
  }

//////////////////////////////////////////////////////////

  var Zmien_Adres = function( event )
  {
    var adres = $( this ).attr( 'href' );

    if( event.which === 1 )
    {
      event.preventDefault();

      if( Kontroler_Danych.Daj( 'sciezka' ) !== adres )
        Kontroler_Tresci.Zmien_Tresc( adres )

      return false;
    }
  }


  var Cofnij_Adres = function()
  {
    Kontroler_Tresci.Uruchom();
  }

//------------------------------------------

  var udostepnione = 
  {
    Definiuj : Definiuj
  }

  return udostepnione;
})();
 
