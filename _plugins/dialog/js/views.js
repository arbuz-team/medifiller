/**
 * Created by mrskull on 29.12.16.
 */

import * as dialog_models from './models'
import * as interior_dialog_controllers from './interior/controllers'
import * as interior_dialog_models from './interior/models'


/**
 *    Defining public functions
 */

export let
  selectors = dialog_models.selectors;

/**
 *    Defining private functions
 */

let

  show = function()
  {
    $(selectors.container)
      .fadeIn(200);
  },


  hide = function()
  {
    $(selectors.container)
      .fadeOut(200);
  },


  clear_data = function()
  {
    $(selectors.header)
      .html('Loading...');

    $(selectors.content)
      .html('Loading...');
  },


  save_type_and_name = function(button_data)
  {
    let
      type = button_data.type,
      name = button_data.name,
      value = button_data.value,
      result_type,
      result_name,
      default_type = 'alert',
      default_name = 'default';

    if(type)
      result_type = type;
    else
      result_type = default_type;

    if(name)
      result_name = name;
    else
      result_name = default_name;


    dialog_models.variables.type = result_type;
    dialog_models.variables.name = result_name;

    interior_dialog_models.variables.button_type = result_type;
    interior_dialog_models.variables.button_name = result_name;
    interior_dialog_models.variables.button_value = value;
  },


  prepare_post_data = function(dialog_data)
  {
    let
      post_data = {},
      isset = 0;

    if(dialog_models.variables.type === 'confirm')
      for(let data in dialog_data)
      {
        if(dialog_data.hasOwnProperty(data))
          if(dialog_data[data])
          {
            post_data[data] = dialog_data[data];
            ++isset;
          }
          else
          {
            post_data[data] = '';
            ++isset;
          }
      }

    if(isset > 0)
      dialog_models.variables.post_data = post_data;
    else
      dialog_models.variables.post_data = undefined;
  };


///////////////////////////////////////

export let

  open = function(button_data, dialog_data)
  {
    save_type_and_name(button_data);
    prepare_post_data(dialog_data);

    interior_dialog_controllers.load(button_data.url, dialog_models.variables.post_data, show);
  },


  close = function()
  {
    hide();
  };