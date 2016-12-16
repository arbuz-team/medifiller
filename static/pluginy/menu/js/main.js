/**
 * Created by mrskull on 24.11.16.
 */

import {data_controller} from '../../arbuz/js/structure';
export {data_controller} from '../../arbuz/js/structure';

/*---------------- Kontroler Menu ----------------*/

export let menu_controller = new function Menu_Controller()
{
  let $menu = $( '#MENU' )
    , $overlay = $menu.children( '.overlay' );


  this.show = function()
  {
    $menu.animate( { 'right' : '0px' }, 200 );
      $overlay.show();
    $menu.add_data( 'wysuniete', 'tak' );
  };


  this.hide = function()
  {
    $overlay.hide();

    $menu.animate( { right : '-250px' }, 200 );
    $menu.add_data( 'wysuniete', 'nie' );
  };


  this.select_overlap = function()
  {
    let url = data_controller.get( 'all_url' )
      , $overlap = $( '.menu > li > a' )

    $overlap.removeClass( 'wybrany' );

    for( let i = 0; $overlap.length > i; ++i )
      if( $overlap[ i ].href === url )
        $overlap.eq( i ).addClass( 'wybrany' );
  };

};
 

