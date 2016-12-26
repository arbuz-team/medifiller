/**
 * Created by mrskull on 24.11.16.
 */

import {data_controller} from '../../arbuz/js/structure';


/*---------------- Kontroler Menu ----------------*/

/**
 *    Defining private veriables
 */

  let $menu = $( '#MENU' )
    , $overlay = $menu.children( '.overlay' );


/**
 *    Defining public functions
 */

  export let show = function()
  {
    $menu.animate( { 'right' : '0px' }, 200 );
      $overlay.show();
    $menu.add_data( 'wysuniete', 'tak' );
  };


  export let hide = function()
  {
    $overlay.hide();

    $menu.animate( { right : '-250px' }, 200 );
    $menu.add_data( 'wysuniete', 'nie' );
  };


  export let select_overlap = function()
  {
    let url = data_controller.get( 'all_url' )
      , $overlap = $( '.menu > li > a' );

    $overlap.removeClass( 'wybrany' );

    for( let i = 0; $overlap.length > i; ++i )
      if( $overlap[ i ].href === url )
        $overlap.eq( i ).addClass( 'wybrany' );
  };

 

