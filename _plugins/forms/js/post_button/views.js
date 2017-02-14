/**
 * Created by mrskull on 18.12.16.
 */

import {Post_Button_Models} from './models'


export let Post_Button_Views = function(config)
{
  let
    models = new Post_Button_Models(config),


    start_loading = function()
    {
      models.state.is_loading = true;
      $(models.settings.button).html(models.settings.text_loading);
    },


    is_error = function(JSON_response, status)
    {
      if(status !== 'success')
      {
        $(models.settings.button).html(models.settings.text_error);
        return true;
      }

      let response = JSON.parse(JSON_response);

      if (response.__button__ !== 'true')
      {
        $(models.settings.button).html(models.settings.text_error);
        return true;
      }

      return false;
    },


    reload_plugins = function()
    {
      let
        plugins = models.settings.button_reload,
        plugins_array, array_length;

      if(!plugins && typeof plugins === 'string')
        return false;

      plugins_array = plugins.split(' ');
      array_length = plugins_array.length;

      for(let i = 0; i < array_length; ++i)
        if(plugins_array[i])
        {
          window.APP.DATA.delay = 200;
          window.APP.throw_event(window.EVENTS.plugins['reload_'+ plugins_array[i]]);
        }
    },


    end_loading = function(JSON_response, status)
    {
      models.state.is_loading = false;

      if(is_error(JSON_response, status))
        return false;

      $(models.settings.button).html(models.settings.text_done);

      reload_plugins();
    };


  this.start = function()
  {
    if(models.is_loading())
      return false;

    start_loading();
    models.send_post(end_loading);
  };

  this.models = models;

};