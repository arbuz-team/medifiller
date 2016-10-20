/*    JavaScript    */


/*---------------- Wydarzenia kontrolera treści ----------------*/

"use strict"; 


var Wydarzenia_Menu = (function()
{
  
  var Definiuj = function()
  {
    $( '.guzik_menu' ).click( Pokaz_Ukryj_Menu );
    $( '#MENU .nakladka' ).click( Pokaz_Ukryj_Menu );
    $( '#MENU > .menu a' ).click( Pokaz_Ukryj_Menu );
  }


  var Pokaz_Ukryj_Menu = function( event )
  {
    if( event.which === 1 )
    {
      var menu = '#MENU';

      if( Sprawdz.Atrybut_Data( menu, 'wysuniete', 'nie' ) )
        Kontroler_Menu.Pokaz();

      else if( Sprawdz.Atrybut_Data( menu, 'wysuniete', 'tak' ) )
        Kontroler_Menu.Ukryj();

      return false;
    }
  }

//------------------------------------------

  var udostepnione = 
  {
    Definiuj : Definiuj
  }

  return udostepnione;
})();
 

