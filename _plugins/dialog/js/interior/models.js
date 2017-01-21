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
    post_data: {}
  },


  prepare_post_data = function(type, name)
  {
    variables.post_data = {};

    variables.post_data.type = type;
    variables.post_data.name = name;
  },


  load = function(type, name, callback)
  {
    prepare_post_data(type, name);

    dialog_loader_controllers.load(undefined, variables.post_data, callback);
  };