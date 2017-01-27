/**
 * Created by mrskull on 08.01.17.
 */

import * as ground_views          from './views'
import {Plugins_Loader_Controllers}  from '../../plugins_loader/controllers'
import {Form_Controllers}  from '../../forms/js/controllers'
// import {Content_Editable_Controllers}  from '../../content_editable/js/controllers'


/**
 *    Defining private variables
 */

let
  config_loader = {
    name: 'ground',

    container: '#GROUND > .ground',
    first_element: '.block_1',

    auto_first_loading: true,
    load_with_page: true,
  },
  ground_loader_controllers = new Plugins_Loader_Controllers(config_loader),

  ground_form_controllers = new Form_Controllers(ground_loader_controllers);


  // config_content_editable = {},
  // content_editable_controllers = new Content_Editable_Controllers(config_content_editable);


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
      window.APP.throw_event(window.EVENTS.plugins.close);

      ground_views.change_url(url);

      ground_loader_controllers.load(url);
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
    ground_loader_controllers.load();
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

    ground_form_controllers.define();
    // content_editable_controllers.define();
  },


  start = function()
  {
    ground_loader_controllers.define();
  },


  change_content = function(url, post_data)
  {
    ground_loader_controllers.load(url, post_data);
  };