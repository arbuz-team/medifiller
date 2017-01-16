/**
 * Created by mrskull on 06.01.17.
 */

import {Plugins_Motion_Views} from './views'


export let Plugins_Motion_Controllers = function(config)
{
  let
    plugin_motion_views = new Plugins_Motion_Views(config),
    settings = plugin_motion_views.models.settings;

  ///////////////////////////////

  let

    swipe_open = function()
    {
      if(plugin_motion_views.models.check_possibility_of_swipe())
        plugin_motion_views.plugin_open();
    },


    swipe_close = function()
    {
      if(plugin_motion_views.models.check_possibility_of_swipe())
        plugin_motion_views.plugin_close();
    },


    pre_swipe_open = function(event)
    {
      let y = event.gesture.center.y - event.gesture.distance;

      if(y <= 70)
        swipe_open();
    },


    set_start_position = function()
    {
      let
        $container = $(settings.container),
        $content = $container.children(settings.content),
        position,
        height = $content.outerHeight(),
        width = $content.outerWidth(),
        direction_open = settings.direction_open,
        direction_close = settings.direction_close;

      settings.height = height;
      settings.width = width;

      if(direction_open === 'top' || direction_open === 'bottom')
        position = -height;

      else if(direction_open === 'left' || direction_open === 'right')
        position = -width;

      if(position)
        $($container).css(direction_close, position);
    },


    stop_propagation = function(event)
    {
      event.stopPropagation();
    };


  //////////////////////////////////////////

  this.define = function()
  {
    let
      $window = $(window),
      $body = $('body'),
      $container = $(settings.container),
      $hide = $(settings.container +' > '+ settings.hide);

    // -- Swipe events

    if(settings.direction_open === 'top' || settings.direction_open === 'bottom')
      $body.hammer().on(settings.swipe_open, pre_swipe_open);
    else
      $body.hammer().on(settings.swipe_open, swipe_open);

    $body.hammer().on(settings.swipe_close, swipe_close);

    $body.data('hammer').get('swipe').set({ direction: Hammer.DIRECTION_ALL });


    // -- Other events

    $body.click(swipe_close);
    $hide.click(swipe_close);
    $window.resize(swipe_close);
    window.APP.add_own_event('close_plugins', swipe_close);

    $container.click(stop_propagation);

    set_start_position();
  };


  this.start = function()
  {
    set_start_position();
  };


  this.plugin_open = plugin_motion_views.plugin_open;
};