/**
 *    Created by mrskull on 24.11.16.
 */

import {data_controller} from '../../arbuz/js/structure';
import * as models from './models'

/*---------------- Kontroler Treści ----------------*/


/**
 *    Defining public functions
 */

  export let change_content = function( url, post_data )
  {
    data_controller.change('can_do_redirect', false);

    models.prepare_url(url);
    models.prepare_post_data( post_data );

    _change_url();
    models.refresh_data();

    _hide_content();
  };


  export let start = function()
  {
    models.refresh_data();
    models.prepare_post_data();

    _hide_content();
  };


/**
 *    Defining content functions
 */

  let _download_content = function( url )
  {
    models.prepare_url(url);
    window.APP.send_post( models.url, models.post_data, _paste_content);
  };


  let _paste_content = function(response, status)
  {
    let
      html = response.responseText,
      code = response.status;


    if(models.error === true)
    {
      if(status !== 'success')
      {
        $(models.settings.container +' > div')
          .not(models.settings.first_element).remove();
        $(models.settings.container + ' > div > .tresc')
          .html('An error has occurred while connecting to server. Please, refresh website or check your connect with network.');
      }
    }
    else if( status !== 'success' )
    {
      models.prepare_post_data();
      models.error = true;
      _download_content( '/statement/'+ code +'/' );
      return false;
    }


    if(models.error !== true || status === 'success')
      $( models.settings.container ).html(html).add_data( 'url', models.url );

    models.error = false;
    models.url = '';
    models.refresh_events();

    _show_content();
  };


  let _paste_data = function( object )
  {
    data_controller.change_much({
      title: object.title,
      description: object.description
    });

    $( 'title' ).html( data_controller.get( 'title' ) );
    $( 'meta[ name="description" ]' ).attr( 'content', data_controller.get( 'description' ) );
  };


  let _change_url = function()
  {
    history.pushState( '', models.url, models.url );
  };


/**
 *    Defining view functions
 */

  let _show_content = function()
  {
    let
      container = models.settings.container,
      opacity = models.settings.show_content.opacity,
      duration = models.settings.show_content.duration;

    $( container )
      .animate( { opacity: opacity }, duration, function(){
        if(window.APP.DATA)
          _paste_data(window.APP.DATA);
      });
  };


  let _hide_content = function()
  {
    let
      container = models.settings.container,
      opacity = models.settings.hide_content.opacity,
      duration = models.settings.hide_content.duration;

    $( container )
      .animate( { opacity: opacity }, duration, () => {
        _download_content();
      });
  };