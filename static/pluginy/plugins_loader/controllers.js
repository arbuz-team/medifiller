/**
 * Created by mrskull on 24.11.16.
 */

import {data_controller} from '../arbuz/js/structure'
import {Plugins_Loader_Views} from './views'


export let Plugins_Loader_Controllers = function(config)
{
  let
    controller = new Plugins_Loader_Views(config);


  this.define = function()
  {
    window.APP.add_own_event('load', () => {
      controller.start();
    });
  };


/**
 *    Defining private functions
 */

  this.start_link = function(event)
  {
    if(event.which === 1)
    {
      event.preventDefault();
      window.APP.throw_event(EVENTS.close_plugins);

      let url = $(this).attr('href');

      if(data_controller.get('path') !== url)
        controller.change_content(url);
    }
  };


  this.change_content = controller.change_content;


  this.redirect = function()
  {
    let
      url = data_controller.get('path'),
      delay = 0;

    if(typeof APP !== 'undefined' && typeof APP.DATA !== 'undefined')
    {
      if(typeof APP.DATA.redirect !== 'undefined')
        url = APP.DATA.redirect;

      if(typeof APP.DATA.delay !== 'undefined')
        delay = APP.DATA.delay;
    }

    data_controller.change('can_do_redirect', true);

    setTimeout(() =>
    {
      if(data_controller.get('can_do_redirect') === true)
        controller.change_content(url);
    }, delay);
  };
};

