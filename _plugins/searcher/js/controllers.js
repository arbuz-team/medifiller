/**
 * Created by mrskull on 07.01.17.
 */

import {Plugins_Loader_Controllers} from '../../plugins_loader/controllers'
import {} from '../../forms/js/auto_form/controllers'
import {Plugins_Motion_Controllers} from '../../plugins_motion/controllers'


/**
 *    Defining private variables
 */

let
  searcher_loader_controllers,
  config_loader = {
    name: 'filters',

    container: '#SEARCHER > .searcher',
    first_element: '*',

    load_with_page: false,
  },

  searcher_motion_controllers,
  config_motion = {
    container: '#SEARCHER',
    content: '.searcher',
    open: 'right',
    can_open_by: 'width',
    can_open_to: 1000,
    duration_open: 200,
    duration_close: 200,
  };


/**
 *    Defining public functions
 */

export let

  define = function()
  {
    searcher_motion_controllers.define();
  },


  start = function()
  {
    // -- Loader configuration
    searcher_loader_controllers = new Plugins_Loader_Controllers(config_loader);
    searcher_loader_controllers.define();


    // -- Motion configuration
    searcher_motion_controllers = new Plugins_Motion_Controllers(config_motion);
    searcher_motion_controllers.start();
  },


  plugin_open = function()
  {
    searcher_motion_controllers.plugin_open();
  };

