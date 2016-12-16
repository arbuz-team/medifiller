/**
 * Created by mrskull on 24.11.16.
 */


import {content_controller, data_controller} from './main';
export {data_controller} from './main';


/*---------------- Wydarzenia Kontrolera Treści ----------------*/

export let content_controller_events = new function Content_Controller_Events()
{
  
  this.define = function()
  {
    $( 'a' ).click( start_link );

    window.addEventListener('popstate', back_url );

    window.addEventListener('change_url', change_url, false);

    window.addEventListener('redirect', redirect, false);

    //////////////////////////////////////////
    window.onload = () => {
      content_controller.start();
    };
  };

//////////////////////////////////////////////////////////

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

  let change_url = function()
  {
    let url = data_controller.prepare_url_to_change();
    content_controller.change_content( url );
  };


  let back_url = function()
  {
    event.preventDefault();
    content_controller.start();
  };


  let redirect = function()
  {
    let url;

    if(typeof APP !== 'undefined' && typeof APP.redirect !== 'undefined')
      url = APP.redirect;
    else
      url = '/';

    setTimeout(() => {
      content_controller.change_content( url );
    }, 2000);
  };


};
 
