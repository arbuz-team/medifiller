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


  dim = function(callback)
  {
    $(selectors.container)
      .animate({ opacity: .4 }, 200, callback);
  },


  lighten = function()
  {
    $(selectors.container)
      .animate({ opacity: 1 }, 200);
  },


  save_type_and_name = function(dialog_data)
  {
    let
      type = dialog_data.type,
      name = dialog_data.name,
      value = dialog_data.value;

    if(!type || !name)
    {
      console.error('Dialog error: Type or name is invalid.');
      return false;
    }

    interior_dialog_models.reset_variables();

    interior_dialog_models.variables.type = type;
    interior_dialog_models.variables.name = name;
    interior_dialog_models.variables.value = value;
  },


  prepare_post_data = function(additional_data)
  {
    let
      post_data = {},
      isset = 0;

    if(interior_dialog_models.variables.type === 'confirm')
      for(let data in additional_data)
      {
        if(additional_data.hasOwnProperty(data))
          if(additional_data[data])
          {
            post_data[data] = additional_data[data];
            ++isset;
          }
          else
          {
            post_data[data] = '';
            ++isset;
          }
      }

    if(isset > 0)
      interior_dialog_models.variables.post_data = post_data;
    else
      interior_dialog_models.variables.post_data = undefined;
  };


///////////////////////////////////////

export let

  open = function(dialog_data, additional_data)
  {
    if(save_type_and_name(dialog_data) === false)
      return false;

    if(prepare_post_data(additional_data) === false)
      return false;

    interior_dialog_controllers.load(show);
  },


  reload = function()
  {
    dim(function(){
      interior_dialog_controllers.reload(lighten);
    });
  },


  close = function()
  {
    hide();
  };