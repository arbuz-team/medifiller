/**
 * Created by mrskull on 06.01.17.
 */

import {Plugins_Motion_Models} from './models'


export let Plugins_Motion_Views = function(config)
{
  let
    models = new Plugins_Motion_Models(config),
    css = {};

  this.models = models;


  this.plugin_open = function()
  {
    if(models.check_possibility_of_opening())
    {
      css[models.settings.direction_close] = 0;

      $(models.settings.container)
        .stop()
        .animate(css, models.settings.duration_open, function(){
          models.change_possibility_of_opening(false);
        });
    }
  };


  this.plugin_close = function()
  {
    if(models.check_is_open())
    {
      if(models.settings.direction_open === 'top' || models.settings.direction_open === 'bottom' )
        css[models.settings.direction_close] = -models.settings.height;

      else if(models.settings.direction_open === 'right' || models.settings.direction_open === 'left' )
        css[models.settings.direction_close] = -models.settings.width;


      $(models.settings.container)
        .stop()
        .animate(css, models.settings.duration_close, function(){
          models.change_possibility_of_opening(true);
        });
    }
  };
};