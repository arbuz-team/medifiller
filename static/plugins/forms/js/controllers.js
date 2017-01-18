/**
 * Created by mrskull on 24.11.16.
 */

import * as form_controller from './views'
import * as validator from './validator/controllers'
import * as hide_form from './hide_form/controllers'
import * as auto_form from './auto_form/controllers'
import * as post_button from './post_button/controllers'


/**
 *    Defining public functions
 */

  export let define = function()
  {
    $( 'form' ).submit( prepare_form_to_send );

    validator.define();
    hide_form.define();
    auto_form.define();
    post_button.define();
  };


/**
 *    Defining private functions
 */

  let prepare_form_to_send = function( event )
  {
    event.preventDefault();

    let
      form_name = $(this).data('name'),
      url = $(this).attr( 'action' ),
      form_object = $( this ).serialize_object();

    form_controller.send( form_name, url, form_object );
  };
 

