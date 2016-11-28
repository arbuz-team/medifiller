/**
 * Created by mrskull on 24.11.16.
 */

import {Kontroler_Danych, EVENTS} from '../../arbuz/js/dane_strony/struktura';
export {Kontroler_Danych, EVENTS} from '../../arbuz/js/dane_strony/struktura';

/*---------------- Kontroler Menu ----------------*/

function Kontroler_Menu()
{
  let $menu = $( '#MENU' )
    , $nakladka = $menu.children( '.nakladka' );


  this.Pokaz = function()
  {
    $menu.animate( { 'right' : '0px' }, 200 );
      $nakladka.show();
    $menu.Dodaj_Dane( 'wysuniete', 'tak' );
  };


  this.Ukryj = function()
  {
    $nakladka.hide();

    $menu.animate( { right : '-250px' }, 200 );
    $menu.Dodaj_Dane( 'wysuniete', 'nie' );
  };


  this.Zaznacz_Zakladke = function()
  {
    let adres = Kontroler_Danych.Daj( 'pelny_adres' )
      , $zakladka = $( '.menu > li > a' )

    $zakladka.removeClass( 'wybrany' );

    for( let i = 0; $zakladka.length > i; ++i )
      if( $zakladka[ i ].href === adres )
        $zakladka.eq( i ).addClass( 'wybrany' );
  };

}

let Menu = new Kontroler_Menu();

export {Menu as Kontroler_Menu};
 

