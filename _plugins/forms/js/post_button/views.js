/**
 * Created by mrskull on 18.12.16.
 */

import {Post_Button_Models} from './models'


export let Post_Button_Views = function(config)
{
  let
    models = new Post_Button_Models(config),


    set_text = {
      if_is_text: function()
      {
        if($(models.settings.button).children('i').length > 0)
          return false;
        return true;
      },

      sending: function()
      {
        if(set_text.if_is_text())
        {
          clearTimeout(set_text.set_waiting);
          clearTimeout(set_text.set_standard);

          $(models.settings.button).html(models.settings.text_sending);
        }
      },

      set_waiting: undefined,
      waiting: function()
      {
        if(set_text.if_is_text())
        {
          set_text.set_waiting = setTimeout(function(){
            $(models.settings.button).html(models.settings.text_waiting);
          }, models.settings.delay_text_waiting);
        }
      },

      done: function()
      {
        if(set_text.if_is_text())
        {
          clearTimeout(set_text.set_waiting);
          $(models.settings.button).html(models.settings.text_done);
        }
      },

      set_standard: undefined,
      standard: function()
      {
        if(set_text.if_is_text())
        {
          set_text.set_standard = setTimeout(function(){
            $(models.settings.button).html(models.settings.text_standard);
          }, models.settings.delay_text_standard);
        }
      },
    },


    start_loading = function()
    {
      models.state.is_loading = true;
      set_text.sending();
      set_text.waiting();
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

      if(!plugins || typeof plugins !== 'string')
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


    redirect_ground = function()
    {
      let
        url = models.settings.button_redirect;

      if(!url || typeof url !== 'string')
        return false;

      window.APP.DATA.redirect = url;
      window.APP.DATA.delay = 100;
      window.APP.throw_event(window.EVENTS.redirect);
    },


    end_loading = function(JSON_response, status)
    {
      models.state.is_loading = false;

      if(is_error(JSON_response, status))
        return false;

      set_text.done();

      reload_plugins();
      redirect_ground();

      set_text.standard();
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