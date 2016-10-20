/*    JavaScript    */


/*---------------- Testy wydarzeń kontrolera tresci ----------------*/

"use strict"; 


var Test_Wydarzenia_Menu = (function()
{

  var Uruchom = function()
  {
    Test_Wysun_Menu();
  }

//------------------------------------------

  var Test_Wysun_Menu = function()
  {
    var $guzik = $( '#NAGLOWEK .menu .guzik_menu' );

    $guzik.trigger( { type: 'click', which: 1 } );

    Kanar.Atrybut_Data( '#MENU', 'wysuniete', 'tak' );

    $guzik.trigger( { type: 'click', which: 1 } );
  }

//------------------------------------------

  var udostepnione = 
  {
    Uruchom : Uruchom
  }

  return udostepnione;
})();
 

 
