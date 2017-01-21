/**
 * Created by mrskull on 08.01.17.
 */

import {Plugins_Loader_Controllers} from '../../plugins_loader/controllers'
import * as searcher_controllers from '../../searcher/js/controllers'
import * as navigation_controllers from '../../navigation/js/controllers'
import * as cart_controllers from '../../cart/js/controllers'


/**
 *    Defining private variables
 */

let
  header_loader_events,
  config_loader = {
    name: 'navigation',
    url: '/navigation/',

    container: '#HEADER > .header',

    auto_first_loading: true,
  };


/**
 *    Defining public functions
 */

export let

  define = function()
  {
    $('#HEADER .navigation-mini-filter > button').click(searcher_controllers.plugin_open);

    $('#HEADER .navigation-mini-navigation > button').click(navigation_controllers.plugin_open);

    $('#HEADER .navigation-mini-cart > button').click(cart_controllers.plugin_open);
  },


  start = function()
  {
    header_loader_events = new Plugins_Loader_Controllers(config_loader);
    header_loader_events.define();
  };