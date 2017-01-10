/**
 * Created by mrskull on 08.01.17.
 */

import {data_controller} from '../../arbuz/js/structure'
import * as img_loader          from './img_loader';
import * as views          from './views'
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
 *    Defining public functions
 */

export let
  define = function()
  {
    img_loader.define();

    $('a').click(start_link);

    window.APP.add_own_event('redirect', ground_loader_controllers.redirect, false);

    window.addEventListener('popstate', back_url);

    $(window).resize(change_height_content);

    change_height_content();
  },


  start = function()
  {
    ground_loader_controllers = new Plugins_Loader_Controllers(config_loader);
    ground_loader_controllers.define();
  },


  start_link = function(event)
  {
    if(event.which === 1)
    {
      event.preventDefault();
      window.APP.throw_event(EVENTS.close_plugins);

      let url = $(this).attr('href');

      views.change_url(url);

      if(data_controller.get('path') !== url)
        ground_loader_controllers.change_content(url);
    }
  };


let

  back_url = function()
  {
    event.preventDefault();
    ground_loader_controllers.start();
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