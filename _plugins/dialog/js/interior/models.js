/**
 * Created by mrskull on 21.01.17.
 */

import {Plugins_Loader_Controllers} from '../../../plugins_loader/controllers'
import {selectors as dialog_selectors} from '../models'


let

  dialog_loader_controllers = new Plugins_Loader_Controllers({
    name: 'dialog',

    container: '#DIALOG > .dialog',

    duration: {
      show: 0,
      hide: 0,
    },
  });


///////////////////////////////////////

export let

  selectors = {
    container: dialog_selectors.content,
    buttons: dialog_selectors.content +' .dialog-content-button',
  },

  variables = {},

  reset_variables = (function()
  {
    let define = function()
    {
      variables = {
        type: '',
        name: '',
        value: '',
        post_data: undefined,
      };
    };
    define();

    return define;
  })(),


  prepare_post_data = function()
  {
    if(!variables.post_data)
      variables.post_data = {};

    variables.post_data['dialog_type'] = variables.type;
    variables.post_data['dialog_name'] = variables.name;

    if(variables.value)
      variables.post_data['dialog_value'] = variables.value;
  },


  load = function(callback)
  {
    prepare_post_data();

    dialog_loader_controllers.load(undefined, variables.post_data, callback);
  },


  reload = function(callback)
  {
    dialog_loader_controllers.load(undefined, variables.post_data, callback);
  };