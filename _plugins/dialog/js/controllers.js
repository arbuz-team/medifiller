/**
 * Created by mrskull on 29.12.16.
 */

import * as dialog_views from './views'
import * as interior_dialog_controllers from './interior/controllers'


/**
 *    Defining public functions
 */

  export let

    define = function()
    {
      let
        selectors = dialog_views.selectors;

      $(selectors.container).click(close_with_cancel_event);
      $(selectors.window).click(cancel_event);

      $(selectors.external_buttons).click(open);

      window.APP.add_own_event('dialog_close', close_with_delay);

      interior_dialog_controllers.define();
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


    close_with_delay = function()
    {
      let delay;

      if(window.APP.DATA.delay)
        delay = window.APP.DATA.delay;
      else
        delay = 2000;

      setTimeout(close, delay);
    },


    cancel_event = function(event)
    {
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
      button_data = {
        type:   $button.data('type'),
        name:   $button.data('name'),
        url:    $button.data('url'),
        value:  $button.data('value'),
      },
      dialog_data = {
        dialog_name:   $button.data('dialog-name'),
        dialog_action:    $button.data('dialog-action'),
        dialog_value:    $button.data('dialog-value'),
        dialog_reload:    $button.data('dialog-reload'),
        dialog_redirect:    $button.data('dialog-redirect'),
        dialog_url:    $button.data('dialog-url'),
      };

    dialog_views.open(button_data, dialog_data)
  },


  close = dialog_views.close;