/*    JavaScript    */


/*---------------- Kontroler Menu ----------------*/

"use strict"; 


var Kontroler_Menu = (function()
{
  var $menu = $( '#MENU' )
    , $nakladka = $menu.children( '.nakladka' );


  var Pokaz = function()
  {
    $menu.animate( { 'right' : '0px' }, 200 );
      $nakladka.show();
    $menu.Dodaj_Dane( 'wysuniete', 'tak' );

    return true;
  }


  var Ukryj = function()
  {
    $nakladka.hide();

    $menu.animate( { right : '-250px' }, 200 );
    $menu.Dodaj_Dane( 'wysuniete', 'nie' );

    return true;
  }


  var Zaznacz_Zakladke = function()
  {
    var adres = Kontroler_Danych.Daj( 'pelny_adres' )
      , $zakladka = $( '.menu > li > a' )

    $zakladka.removeClass( 'wybrany' );

    for( var i = 0; $zakladka.length > i; ++i )
      if( $zakladka[ i ].href === adres )
        $zakladka.eq( i ).addClass( 'wybrany' );
  }

//------------------------------------------

  var udostepnione = 
  {
    Pokaz : Pokaz
    , Ukryj : Ukryj
    , Zaznacz_Zakladke : Zaznacz_Zakladke
  }

  return udostepnione;
})();
 

