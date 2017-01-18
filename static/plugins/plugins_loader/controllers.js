/**
 * Created by mrskull on 24.11.16.
 */

import {data_controller} from '../arbuz/js/structure'
import {Plugins_Loader_Views} from './views'


export let Plugins_Loader_Controllers = function(config)
{
  let
    plugin_loader_views = new Plugins_Loader_Views(config);

  this.change_content = plugin_loader_views.change_content;


  /**
   *    Defining private functions
   */


  this.redirect = function()
  {
    let
      url = data_controller.get('path'),
      delay = 0,
      variables = plugin_loader_views.models.variables;

    if(typeof APP !== 'undefined' && typeof APP.DATA !== 'undefined')
    {
      if(typeof APP.DATA.redirect !== 'undefined')
        url = APP.DATA.redirect;

      if(typeof APP.DATA.delay !== 'undefined')
        delay = APP.DATA.delay;
    }

    variables.can_do_redirect = true;
    clearTimeout(variables.redirect_time_out);

    variables.redirect_time_out = setTimeout(() =>
    {
      if(plugin_loader_views.models.variables.can_do_redirect === true)
        plugin_loader_views.change_content(url);
    }, delay);
  };


  /**
   *    Defining public functions
   */

  this.define = function()
  {
    window.APP.add_own_event('load', () => {
      plugin_loader_views.change_content();
    });
  };
};

