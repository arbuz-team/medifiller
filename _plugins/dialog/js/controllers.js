/**
 * Created by mrskull on 29.12.16.
 */

import * as models from './models'
import * as dialogue_window_controller from './views'


/**
 *    Defining public functions
 */

  export let define = function()
  {
    let
      selectors = models.selectors;

    $(selectors.container).click(close_with_cancel_event);
    $(selectors.window).click(cancel_event);


    $(selectors.external_buttons).click(open);
  };


/**
 *    Defining events functions
 */

  let

    close_with_cancel_event = function(event)
    {
      cancel_event(event);
      close();
    },


    cancel_event = function(event)
    {
      event.preventDefault();
      event.stopPropagation();
    };


/**
 *    Defining public functions
 */

export let

  open = function()
  {
    let
      $button = $(this),
      type = $button.data('type'),
      name = $button.data('name');

    dialogue_window_controller.open(type, name)
  },


  close = dialogue_window_controller.close;