/**
 * Created by mrskull on 07.01.17.
 */

import {Plugins_Loader_Events} from '../../plugins_loader/view'
import {Plugins_Motion_Events} from '../../plugins_motion/view'


/**
 *    Defining public functions
 */

export let define = function()
{
  let
    config_loader = {
      name: 'cart',
      container: '#CART > .cart',
      first_element: '*',

      load_with_page: false,
    },

    cart_loader_events = new Plugins_Loader_Events(config_loader);

  cart_loader_events.define();


  let
    config_motion = {
      container: '#CART',
      open: 'left',
      can_open_by: 'width',
      can_open_from: 0,
      duration_open: 200,
      duration_close: 200,
    },

    cart_motion_events = new Plugins_Motion_Events(config_motion);

  cart_motion_events.define();
};
