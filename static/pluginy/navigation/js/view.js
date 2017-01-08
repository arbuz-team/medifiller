/**
 * Created by mrskull on 24.11.16.
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
      name: 'navigation',
      container: '#NAVIGATION > .navigation',
      first_element: '*',

      load_with_page: false,
    },

    navigation_loader_events = new Plugins_Loader_Events(config_loader);

  navigation_loader_events.define();


  let
    config_motion = {
      container: '#NAVIGATION',
      open: 'down',
      can_open_by: 'width',
      can_open_to: 650,
      duration_open: 300,
      duration_close: 200,
    },

    navigation_motion_events = new Plugins_Motion_Events(config_motion);

  navigation_motion_events.define();
};
 

