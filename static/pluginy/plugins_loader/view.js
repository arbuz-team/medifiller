/**
 * Created by mrskull on 24.11.16.
 */

import {data_controller} from '../arbuz/js/structure'
import {Plugins_Loader_Controller} from './main'



export let Plugins_Loader_Events = function(config)
{
  let
    controller = new Plugins_Loader_Controller(config),
    settings = controller.models.settings;

  this.define = function()
  {

    //////////////////////////////////////////

    $(window).resize(change_height_content);

    this.start_first_load();
  };


  this.start_first_load = function()
  {
    window.APP.add_own_event('load', () => {
      change_height_content();
      controller.start();
    });
  };


/**
 *    Defining private functions
 */

  let change_height_content = function()
  {
    let
      height = {
        window: $('#CONTAINTER').innerHeight(),
        header: $('#HEADER').outerHeight(),
      };

    $(settings.container).height(height.window - height.header);
  };


  this.start_link = function(event)
  {
    if(event.which === 1)
    {
      event.preventDefault();

      let url = $(this).attr('href');

      if(data_controller.get('path') !== url)
        controller.change_content(url);
    }
  };


  this.back_url = function()
  {
    event.preventDefault();
    controller.start();
  };


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

