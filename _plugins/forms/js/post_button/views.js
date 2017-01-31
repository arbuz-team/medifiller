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


    end_loading = function(JSON_response, status)
    {
      models.state.is_loading = false;

      if(is_error(JSON_response, status))
        return false;


      $(models.settings.button).html(models.settings.text_done);

      setTimeout(function(){
        if(typeof models.settings.callback === 'function')
          models.settings.callback();
        else
          $(models.settings.button).html(models.settings.text_standard);
      }, 1000);
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