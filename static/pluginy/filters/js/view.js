/**
 * Created by mrskull on 07.01.17.
 */

import {Motion_Plugins_Events} from '../../motion_plugins/view'


/**
 *    Defining public functions
 */

export let define = function()
{
  let
    config = {
      container: '#FILTERS',
      open: 'right',
      can_open_by: 'width',
      can_open_to: 1000,
      duration_open: 200,
      duration_close: 200,
    },

    motion_plugins_events = new Motion_Plugins_Events(config);

  motion_plugins_events.define();
};

