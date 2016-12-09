/*    JavaScript    */

import {Form_Controller, data_controller, EVENTS} from '../podstawa'
import {define} from '../validator/views'

let form_controller = new Form_Controller();

export function Form_Controller_Events()
{

  this.define = function()
  {
    $( 'form' ).submit( prepare_form_to_send );

    define();
  };

//////////////////////////////////////////////////////////

  let get_form_fields = function( element )
  {
    let $fields = $( element ).serializeArray()
      , form_object = {};

    $.each( $fields , function( i, field )
    {
      form_object[ field.name ] = field.value;
    });

    return form_object;
  };



  let prepare_form_to_send = function( event )
  {
    event.preventDefault();

    let url = $( this ).attr( 'action' )
      , form_object = get_form_fields( this );

    if( typeof url === 'undefined' || url === '' )
      url = data_controller.get( 'path' );

    form_controller.Przeslij( url, form_object );
  };

}
 

