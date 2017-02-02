/**
 * Created by mrskull on 24.11.16.
 */

import {Form_Models} from './models'
import * as validator from './validator/controllers'
import * as hide_form from './hide_form/controllers'
import * as auto_form from './auto_form/controllers'
import * as file_converter from './file_converter/controllers'
// import * as post_button from './post_button/controllers'

export let Form_Controllers = function(content_loader_controllers)
{
  let
    form_models = new Form_Models(content_loader_controllers);


  /**
   *    Defining private functions
   */

  let prepare_form_to_send = function(event)
  {
    let
      form_action = $(this).attr('action'),
      protocol = form_action.substring(0, 4);

    if(protocol !== 'http')
    {
      event.preventDefault();

      let
        form_name = $(this).data('name'),
        url = $(this).attr('action'),
        form_object = $(this).serialize_object();

      form_models.send(form_name, url, form_object);
    }
    else
      console.log('adres zewnętrzny');
  };


  /**
   *    Defining public functions
   */

  this.define = function()
  {
    let $container = $(content_loader_controllers.container);

    $('form', $container).submit(prepare_form_to_send);

    validator.define($container);
    hide_form.define($container);
    auto_form.define($container);
    file_converter.define($container);
    //post_button.define($container);
  };

};

