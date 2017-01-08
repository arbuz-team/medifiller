/**
 * Created by mrskull on 08.01.17.
 */

import * as img_loader from './img_loader';
import {Plugins_Loader_Events} from '../../plugins_loader/view'


/**
 *    Defining public functions
 */

export let define = function()
{
  let
    config = {
      name: 'ground',
      container: '#GROUND > .ground',
      first_element: '.block_1',

      load_with_page: true,
    },

    plugins_loader_events = new Plugins_Loader_Events(config);

  plugins_loader_events.define();
  img_loader.define();

  $('a').click(plugins_loader_events.start_link);

  window.APP.add_own_event('redirect', plugins_loader_events.redirect, false);

  window.addEventListener('popstate', plugins_loader_events.back_url );
};