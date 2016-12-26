/**
 * Created by mrskull on 24.11.16.
 */

import * as menu_controller from './main';


/*---------------- Wydarzenia kontrolera Menu ----------------*/

/**
 *    Defining public functions
 */
  
  export let define = function()
  {
    $( '.guzik_menu' ).click( this.show_hide_menu );
    $( '#MENU .nakladka' ).click( this.show_hide_menu );
    $( '#MENU > .menu a' ).click( this.show_hide_menu );

    window.addEventListener('changed_url', menu_controller.select_overlap(), false);
  };


  export let show_hide_menu = function( event )
  {
    if( event.which === 1 )
    {
      let menu = '#MENU';

      if( check_atribute_data( menu, 'wysuniete', 'nie' ) )
        menu_controller.show();

      else if( check_atribute_data( menu, 'wysuniete', 'tak' ) )
        menu_controller.hide();

      return false;
    }
  };


/**
 *    Defining private functions
 */

  let is_exist = function( element )
  {
    if( $( element ).length )
      return true;

    return false;
  };


  let check_atribute_data = function( element, name, value )
  {
    if( is_exist( element ) )
    {
      return $( element ).data( name ) === value;
    }

    return false;
  };
 

