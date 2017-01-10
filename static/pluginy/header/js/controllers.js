/**
 * Created by mrskull on 08.01.17.
 */

import {Plugins_Loader_Controllers} from '../../plugins_loader/controllers'


/**
 *    Defining private variables
 */

let
  header_loader_events,
  config_loader = {
    name: 'navigation',
    container: '#HEADER > .header',
    first_element: '*',
  };


/**
 *    Defining public functions
 */

export let

  define = function()
  {

  },


  start = function()
  {
    header_loader_events = new Plugins_Loader_Controllers(config_loader);
    header_loader_events.define();
  };