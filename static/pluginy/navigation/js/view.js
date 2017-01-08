/**
 * Created by mrskull on 24.11.16.
 */

import {Motion_Plugins_Events} from '../../motion_plugins/view';


/**
 *    Defining public functions
 */
  
  export let define = function()
  {
    let
      config = {
        container: '#NAVIGATION',
        open: 'down',
        can_open_by: 'width',
        can_open_to: 650,
        duration_open: 300,
        duration_close: 200,
      },

      motion_plugins_events = new Motion_Plugins_Events(config);

    motion_plugins_events.define();
  };
 

