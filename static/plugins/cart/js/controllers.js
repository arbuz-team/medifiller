/**
 * Created by mrskull on 07.01.17.
 */

import {Plugins_Loader_Controllers} from '../../plugins_loader/controllers'
import {Plugins_Motion_Controllers} from '../../plugins_motion/controllers'


/**
 *    Defining private variables
 */

let
  cart_loader_controllers,
  config_loader = {
    name: 'cart',
    container: '#CART > .cart',
    first_element: '*',

    load_with_page: false,
  },

  cart_motion_controllers,
  config_motion = {
    container: '#CART',
    content: '.cart',
    open: 'left',
    can_open_by: 'width',
    can_open_from: 0,
    duration_open: 200,
    duration_close: 200,
  };


/**
 *    Defining public functions
 */

export let

  define = function()
  {
    cart_motion_controllers.define();
  },


  start = function()
  {
    // -- Loader configuration
    cart_loader_controllers = new Plugins_Loader_Controllers(config_loader);
    cart_loader_controllers.define();


    // -- Motion configuration
    cart_motion_controllers = new Plugins_Motion_Controllers(config_motion);
    cart_motion_controllers.start();
  },


  plugin_open = function()
  {
    cart_motion_controllers.plugin_open();
  };
