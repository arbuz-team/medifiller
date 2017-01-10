/**
 * Created by mrskull on 06.01.17.
 */

import {Plugins_Motion_Views} from './views'


export let Plugins_Motion_Controllers = function(config)
{
  let
    controller = new Plugins_Motion_Views(config),
    settings = controller.models.settings;


  this.start = function()
  {
    set_start_position();
  };


  this.define = function()
  {
    let
      $window = $(window),
      $body = $('body'),
      $content = $(settings.content);


    // -- Swipe events

    if(settings.direction_open === 'top' || settings.direction_open === 'bottom')
      $body.hammer().on(settings.swipe_open, pre_plugin_open);
    else
      $body.hammer().on(settings.swipe_open, controller.plugin_open);

    $body.hammer().on(settings.swipe_close, controller.plugin_close);

    $body.data('hammer').get('swipe').set({ direction: Hammer.DIRECTION_ALL });


    // -- Other events

    $body.click(controller.plugin_close);

    $window.resize(controller.plugin_close);

    window.APP.add_own_event('close_plugins', controller.plugin_close);

    $content.click(stop_propagation);


    // -- Functions running during defining

    set_start_position();
  };


  //////////////////////////////////////////


  let
    pre_plugin_open = function(event)
    {
      let y = event.gesture.center.y - event.gesture.distance;

      if(y <= 70)
        controller.plugin_open();
    },


    set_start_position = function()
    {
      let
        position,
        height = settings.height,
        width = settings.width,
        direction_open = settings.direction_open,
        direction_close = settings.direction_close;

      if(direction_open === 'top' || direction_open === 'bottom')
        position = -height;

      else if(direction_open === 'left' || direction_open === 'right')
        position = -width;

      if(position)
        $(settings.container).css(direction_close, position);
    },


    stop_propagation = function(event)
    {
      event.stopPropagation();
    };
};