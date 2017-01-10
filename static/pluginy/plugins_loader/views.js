/**
 *    Created by mrskull on 24.11.16.
 */

import {data_controller} from '../arbuz/js/structure';
import {Plugins_Loader_Models} from './models'


export let Plugins_Loader_Views = function(config)
{
  let
    models = new Plugins_Loader_Models(config);

  this.models = models;


  /**
   *    Defining public functions
   */

  this.start = function()
  {
    models.refresh_data();
    models.prepare_post_data();

    hide_content();
  };


  this.change_content = function(url, post_data)
  {
    models.variables.can_do_redirect = false;

    models.prepare_url(url);
    models.prepare_post_data(post_data);

    models.refresh_data();

    hide_content();
  };


/**
 *    Defining view functions
 */

  let hide_content = function()
  {
    let
      container = models.settings.container,
      opacity = models.settings.opacity.hide,
      duration = models.settings.duration.hide;

    $(container)
    .animate({opacity: opacity}, duration, () =>
    {
      download_content();
    });
  };


  /**
   *    Defining content functions
   */

  let download_content = function(url)
  {
    models.prepare_url(url);

    window.APP.http_request(models.variables.url, models.variables.post_data, paste_content);
  };


  let paste_content = function(response, status)
  {
    let
      html = response.responseText,
      code = response.status,
      container = models.settings.container;

    if(status !== 'success')
      if(models.variables.error === true)
        $(container)
          .html('An error has occurred while connecting to server. Please, refresh website or check your connect with network.');
      else
      {
        models.prepare_post_data();
        models.variables.error = true;

        download_content('/statement/' + code + '/');

        return false;
      }

    if(models.variables.error !== true || status === 'success')
      $(container).html(html).add_data('url', models.variables.url);

    models.variables.error = false;
    models.variables.url = '';
    models.refresh_events();

    show_content();
  };


  let show_content = function()
  {
    let
      container = models.settings.container,
      opacity = models.settings.opacity.show,
      duration = models.settings.duration.show;

    $(container)
    .animate({opacity: opacity}, duration, function()
    {
      // if(models.settings.load_with_page && window.APP.DATA)
      //   load_header_page(window.APP.DATA);
    });
  };
};