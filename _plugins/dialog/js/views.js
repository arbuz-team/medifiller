/**
 * Created by mrskull on 29.12.16.
 */

import * as dialog_models from './models'
import * as interior_dialog_controllers from './interior/controllers'


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
      .fadeOut(200, clear_data);
  },


  clear_data = function()
  {
    $(selectors.header)
      .html('Loading...');

    $(selectors.content)
      .html('Loading...');
  },


  save_type_and_name = function(type, name)
  {
    let
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
  };


///////////////////////////////////////

export let

  open = function(type, name)
  {
    save_type_and_name(type, name);

    let
      type_from_models = dialog_models.variables.type,
      name_from_models = dialog_models.variables.name;

    interior_dialog_controllers.load(type_from_models, name_from_models, show);
  },


  close = function()
  {
    hide();
  };