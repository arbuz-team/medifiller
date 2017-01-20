/**
 * Created by mrskull on 29.12.16.
 */

import * as models from './models'


/**
 *    Defining public functions
 */

export let
  selectors = models.selectors,
  window_data = models.window_data;


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


  paste_data = function(response)
  {
    window_data.content = response;

    $(selectors.window)
      .html(window_data.content);

    show();
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


    models.window_data.type = result_type;
    models.window_data.name = result_name;
  };


///////////////////////////////////////


export let

  open = function(type, name)
  {
    save_type_and_name(type, name);

    models.download_content(paste_data);
  },


  close = function()
  {
    hide();
  };