/**
 * Created by mrskull on 24.11.16.
 */

import * as form_controller from './views'
import * as validator from './validator/controllers'
import * as mini_form from './mini_form/controllers'
import * as post_button from './post_button/controllers'


/**
 *    Defining public functions
 */

  export let define = function()
  {
    $( 'form' ).submit( prepare_form_to_send );

    validator.define();
    mini_form.define();
    post_button.define();
  };


/**
 *    Defining private functions
 */

  let get_form_fields = function( element )
  {
    let
      $fields = $( element ).serializeArray(),
      form_object = {};

    $.each( $fields , function( i, field )
    {
      form_object[ field.name ] = field.value;
    });

    return form_object;
  };



  let prepare_form_to_send = function( event )
  {
    event.preventDefault();

    let
      form_name = $(this).data('name'),
      url = $(this).attr( 'action' ),
      form_object = get_form_fields( this );

    form_controller.send( form_name, url, form_object );
  };
 

