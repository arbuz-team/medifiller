/**
 * Created by mrskull on 24.11.16.
 */

import * as content_controller from './main';
import {data_controller} from '../../arbuz/js/structure'


/*---------------- Wydarzenia Kontrolera Treści ----------------*/

/**
 *    Defining public functions
 */

  export let define = function()
  {
    $( 'a' ).click( start_link );

    window.addEventListener('popstate', back_url );

    window.addEventListener('redirect', redirect, false);

    //////////////////////////////////////////
    window.onload = () => {
      content_controller.start();
    };
  };


/**
 *    Defining private functions
 */

  let start_link = function( event )
  {
    event.preventDefault();

    let url = $( this ).attr( 'href' );

    if( event.which === 1 )
    {
      if( data_controller.get( 'path' ) !== url )
        content_controller.change_content( url );
    }
  };


  let back_url = function()
  {
    event.preventDefault();
    content_controller.start();
  };


  let redirect = function()
  {
    let
      url = data_controller.get('path'),
      delay = 0;


    if(typeof APP !== 'undefined' && typeof APP.DATA !== 'undefined')
    {
      if(typeof APP.DATA.redirect !== 'undefined')
        url = APP.DATA.redirect;

      if(typeof APP.DATA.delay !== 'undefined')
        delay = APP.DATA.delay;
    }


    data_controller.change('can_do_redirect', true);

    setTimeout(() =>
    {
      if(data_controller.get('can_do_redirect') === true)
        content_controller.change_content(url);
    }, delay);
  };

