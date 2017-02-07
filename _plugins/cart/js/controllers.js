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

  cart_form_controllers = new Form_Controllers(cart_loader_controllers),


  manage_key = function(event)
  {
    if(event.keyCode === 27)
      cart_motion_controllers.plugin_close();

    if(event.ctrlKey && event.shiftKey && event.keyCode === 88)
    {
      event.preventDefault();
      if(cart_motion_controllers.is_open())
        cart_motion_controllers.plugin_close();
      else
        cart_motion_controllers.plugin_open();
    }
  };


/**
 *    Defining public functions
 */

export let

  define = function()
  {
    cart_form_controllers.define();
    cart_motion_controllers.define();

    $('.cart-close', $(config_motion.container)).click(cart_motion_controllers.plugin_close);

    $('body').keydown(manage_key);
  },


  start = function()
  {
    cart_loader_controllers.define();
    cart_motion_controllers.start();
  },


  plugin_open = cart_motion_controllers.plugin_open,


  plugin_close = cart_motion_controllers.plugin_close,


  open_or_close = function()
  {
    if(cart_motion_controllers.is_open())
      plugin_close();
    else
      plugin_open();
  },


  reload = function()
  {
    cart_motion_controllers.plugin_open();
  };
