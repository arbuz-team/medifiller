/**
 * Created by mrskull on 08.01.17.
 */

import {data_controller} from '../../arbuz/js/structure'
import * as ground_views          from './views'
import {Plugins_Loader_Controllers}  from '../../plugins_loader/controllers'


/**
 *    Defining private variables
 */

let
  ground_loader_controllers,
  config_loader = {
    name: 'ground',
    container: '#GROUND > .ground',
    first_element: '.block_1',
  };


/**
 *    Defining private functions
 */

let

  go_to_link = function(event)
  {
    if(event.which === 1)
    {
      let url = $(this).attr('href');

      event.preventDefault();
      window.APP.throw_event(EVENTS.close_plugins);

      ground_views.change_url(url);

      if(data_controller.get('path') !== url)
        ground_loader_controllers.change_content(url);
    }
  },

  redirect = function(event)
  {
    ground_views.change_url(window.APP.DATA.redirect);
    ground_loader_controllers.redirect(event);
  },


  back_url = function()
  {
    event.preventDefault();
    ground_loader_controllers.change_content();
  },


  change_height_content = function()
  {
    let
      height = {
        window: $('#CONTAINTER').innerHeight(),
        header: $('#HEADER').outerHeight(),
      };

    $(config_loader.container).height(height.window - height.header);
  };


/**
 *    Defining public functions
 */

export let

  define = function()
  {
    change_height_content();

    $('a').click(go_to_link);
    window.APP.add_own_event('redirect', redirect);
    window.APP.add_own_event('popstate', back_url);
    $(window).resize(change_height_content);
  },


  start = function()
  {
    ground_loader_controllers = new Plugins_Loader_Controllers(config_loader);
    ground_loader_controllers.define();
  },


  change_content = function(url, post_data)
  {
    ground_loader_controllers.change_content(url, post_data);
  };