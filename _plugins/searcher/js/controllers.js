/**
 * Created by mrskull on 07.01.17.
 */

import {Plugins_Loader_Controllers} from '../../plugins_loader/controllers'
import {Plugins_Motion_Controllers} from '../../plugins_motion/controllers'
import {Form_Controllers}  from '../../forms/js/controllers'


/**
 *    Defining private variables
 */

let
  config_loader = {
    name: 'searcher',
    url: '/searcher/',

    container: '#SEARCHER > .searcher',

    auto_first_loading: true,
  },
  searcher_loader_controllers = new Plugins_Loader_Controllers(config_loader),

  config_motion = {
    container: '#SEARCHER',
    content: '.searcher',
    open: 'right',
    can_open_by: 'width',
    can_open_to: 1000,
    duration_open: 200,
    duration_close: 200,
  },
  searcher_motion_controllers = new Plugins_Motion_Controllers(config_motion),

  searcher_form_controllers = new Form_Controllers(searcher_loader_controllers);


/**
 *    Defining public functions
 */

export let

  define = function()
  {
    searcher_motion_controllers.define();
    searcher_form_controllers.define();
  },


  start = function()
  {
    searcher_loader_controllers.define();
    searcher_motion_controllers.start();
  },


  plugin_open = function()
  {
    searcher_motion_controllers.plugin_open();
  };

