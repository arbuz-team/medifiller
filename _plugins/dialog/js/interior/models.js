/**
 * Created by mrskull on 21.01.17.
 */

import {Plugins_Loader_Controllers} from '../../../plugins_loader/controllers'
import {selectors as dialog_selectors} from '../models'


let

  config_loader = {
    name: 'dialog',

    container: '#DIALOG > .dialog',

    duration: {
      show: 0,
      hide: 0,
    },
  },

  dialog_loader_controllers = new Plugins_Loader_Controllers(config_loader);


///////////////////////////////////////

export let

  selectors = {
    container: dialog_selectors.content,
    buttons: dialog_selectors.content +' button.dialog-content-button',
  },

  variables = {
    button_type: '',
    button_name: '',
    button_url: '',
    button_value: '',
    post_data: {},
  },


  prepare_post_data = function(post_data)
  {
    if(!post_data)
    {
      variables.post_data = {};

      variables.post_data.type = variables.button_type;
      variables.post_data.dialog_name = variables.button_name;

      if(variables.button_value)
        variables.post_data.value = variables.button_value;
    }
    else
      variables.post_data = post_data;
  },


  load = function(url, post_data, callback)
  {
    prepare_post_data(post_data);

    dialog_loader_controllers.load(url, variables.post_data, callback);
  };