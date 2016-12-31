/**
 * Created by mrskull on 26.12.16.
 */

import {data_controller} from '../../arbuz/js/structure';
import * as img_loader from './img_loader';


/**
 *    Plugin settings
 */

  export let
    settings = {
      show_content: {
        duration: 150, opacity: 1,
      },

      hide_content: {
        duration: 100, opacity: 0.4,
      },

      container: '#TRESC'
    };


/**
 *    Plugin variables
 */

  export let
    url = '',
    post_data = {},
    error = false;




/**
 *    Defining prepare functions
 */

  export let prepare_url = function( response_url )
  {
    if( response_url )
      url = response_url;
    else
      url = data_controller.get( 'path' );
  };


  export let prepare_post_data = function( object )
  {
    if( !object )
      object = {};

    if( typeof object.__form__ === 'undefined')
      object.__content__ = 'true';

    post_data = object;
  };


/**
 *    Defining refresh functions
 */

  export let refresh_data = function()
  {
    data_controller.reset();
  };


  export let refresh_events = function()
  {
    APP.throw_event( window.EVENTS.define );
    img_loader.define();
  };