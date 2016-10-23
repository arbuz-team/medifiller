/*    JavaScript    */


/*---------------- Wydarzenia na stronie ----------------*/

"use strict"; 


var Wydarzenia = (function()
{
  
  var Definiuj = function()
  {
    // Usuń wszystkie wydarzenia ze wszystkich elementów
    $( '*' ).off();

    Wydarzenia_Kontrolera_Tresci.Definiuj();
    Wydarzenia_Menu.Definiuj();
    Wydarzenia_Kontrolera_Formularzy.Definiuj();
  }

//------------------------------------------

  var udostepnione = 
  {
    Definiuj : Definiuj
  }

  return udostepnione;
})();
 
