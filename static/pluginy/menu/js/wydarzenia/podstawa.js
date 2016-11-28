/**
 * Created by mrskull on 24.11.16.
 */

import {Kontroler_Menu, Kontroler_Danych, EVENTS} from '../podstawa';
export {Kontroler_Danych, EVENTS} from '../podstawa';

/*---------------- Wydarzenia kontrolera Menu ----------------*/

"use strict";

export function Wydarzenia_Kontrolera_Menu()
{
  
  this.Definiuj = function()
  {
    $( '.guzik_menu' ).click( this.Pokaz_Ukryj_Menu );
    $( '#MENU .nakladka' ).click( this.Pokaz_Ukryj_Menu );
    $( '#MENU > .menu a' ).click( this.Pokaz_Ukryj_Menu );

    window.addEventListener('changed_adres', Kontroler_Menu.Zaznacz_Zakladke(), false);
  };


  let Czy_Istnieje_Element = function( id )
  {
    if( $( id ).length )
      return true;

    return false;
  };


  let Sprawdz_Atrybut_Data = function( element, nazwa, wartosc )
  {
    if( Czy_Istnieje_Element( element ) )
    {
      return $( element ).data( nazwa ) === wartosc;
    }

    return false;
  };


  this.Pokaz_Ukryj_Menu = function( event )
  {
    if( event.which === 1 )
    {
      let menu = '#MENU';

      if( Sprawdz_Atrybut_Data( menu, 'wysuniete', 'nie' ) )
        Kontroler_Menu.Pokaz();

      else if( Sprawdz_Atrybut_Data( menu, 'wysuniete', 'tak' ) )
        Kontroler_Menu.Ukryj();

      return false;
    }
  };

}
 

