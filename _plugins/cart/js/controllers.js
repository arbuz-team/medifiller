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
    name: 'cart',
    url: '/cart/',

    container: '#CART > .cart',

    auto_first_loading: true,
    load_with_page: false,
  },
  cart_loader_controllers = new Plugins_Loader_Controllers(config_loader),

  config_motion = {
    container: '#CART',
    content: '.cart',
    open: 'left',
    can_open_by: 'width',
    can_open_from: 0,
    duration_open: 200,
    duration_close: 200,
  },
  cart_motion_controllers = new Plugins_Motion_Controllers(config_motion),

  cart_form_controllers = new Form_Controllers(cart_loader_controllers);


/**
 *    Defining public functions
 */

export let

  define = function()
  {
    cart_motion_controllers.define();
    cart_form_controllers.define();
  },


  start = function()
  {
    cart_loader_controllers.define();
    cart_motion_controllers.start();
  },


  plugin_open = function()
  {
    cart_motion_controllers.plugin_open();
  };
