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


  this.plugin_open = function(event)
  {
    if(models.check_possibility_of_opening())
    {
      let
        container = models.settings.container,
        hide = models.settings.hide,
        direction_close = models.settings.direction_close,
        duration_open = models.settings.duration_open;

      css[direction_close] = 0;

      $(container)
        .stop()
        .animate(css, duration_open, function(){
          models.change_possibility_of_opening(false);
        })
      .children(hide)
        .fadeIn(duration_open);
    }
  };


  this.plugin_close = function()
  {
    if(models.check_is_open())
    {
      let
        container = models.settings.container,
        hide = models.settings.hide,
        direction_open = models.settings.direction_open,
        direction_close = models.settings.direction_close,
        duration_close = models.settings.duration_close,
        width = models.settings.width,
        height = models.settings.height;

      if(direction_open === 'top' || direction_open === 'bottom' )
        css[direction_close] = -height;

      else if(direction_open === 'right' || direction_open === 'left' )
        css[direction_close] = -width;


      $(container)
        .stop()
        .animate(css, duration_close, function(){
          models.change_possibility_of_opening(true);
        })
      .children(hide)
        .fadeOut(duration_close);
    }
  };
};