/**
 * Created by mrskull on 06.01.17.
 */

import {Motion_Plugins_Controller} from './main'



export let Motion_Plugins_Events = function(config)
{
  let
    controller = new Motion_Plugins_Controller(config),
    settings = controller.modules.settings;

  this.define = function()
  {
    let
      $window = $(window),
      $body = $('body'),
      $filters = $(settings.container);

    if(settings.direction_open === 'top' || settings.direction_open === 'bottom')
      $body.hammer().on(settings.swipe_open, pre_filters_open);
    else
      $body.hammer().on(settings.swipe_open, controller.filters_open);


    $body.hammer().on(settings.swipe_close, controller.filters_close);

    $body.data('hammer').get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    $filters.click(stop_propagation);

    $body.click(controller.filters_close);

    $window.resize(controller.filters_close);
  };


  let
    pre_filters_open = function(event)
    {
      let y = event.gesture.center.y - event.gesture.distance;

      if(y <= 70)
        controller.filters_open()
    },


    stop_propagation = function(event)
    {
      event.stopPropagation();
    };
};