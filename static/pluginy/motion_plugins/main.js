/**
 * Created by mrskull on 06.01.17.
 */

import {Modules} from './modules'


export let Motion_Plugins_Controller = function(config)
{
  let
    modules = new Modules(config),
    css = {};

  this.modules = modules;


  this.filters_open = function()
  {
    if(modules.check_possibility_of_opening())
    {
      css[modules.settings.direction_close] = 0;

      $(modules.settings.container)
        .stop()
        .animate(css, modules.settings.duration_open, function()
        {
          modules.change_possibility_of_opening(false);
        });
    }
  };


  this.filters_close = function()
  {
    if(modules.check_is_open())
    {
      if(modules.settings.direction_open === 'top' || modules.settings.direction_open === 'bottom' )
        css[modules.settings.direction_close] = -modules.settings.height;

      else if(modules.settings.direction_open === 'right' || modules.settings.direction_open === 'left' )
        css[modules.settings.direction_close] = -modules.settings.width;


      $(modules.settings.container)
        .stop()
        .animate(css, modules.settings.duration_close, function()
        {
          modules.change_possibility_of_opening(true);
        });
    }
  };
};