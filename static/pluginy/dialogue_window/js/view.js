/**
 * Created by mrskull on 29.12.16.
 */

import * as models from './models'
import * as dialogue_window_controller from './main'


/**
 *    Defining public functions
 */

  export let define = function()
  {
    let
      selectors = models.selectors,
      open_events = models.open_events;

    $(selectors.container).click(close_window);
    $(selectors.dialogue_window).click(cancel_event);

    APP.add_own_event(open_events.alert, open_alert_window);
    APP.add_own_event(open_events.prompt, open_prompt_window);
    APP.add_own_event(open_events.confirm, open_confirm_window);


    $(selectors.submit +'.alert').click(function(){
      APP.throw_event(window.EVENTS.open_alert);
    });

    $(selectors.submit +'.prompt').click(function(){
      APP.throw_event(window.EVENTS.open_prompt);
    });

    $(selectors.submit +'.confirm').click(function(){
      APP.throw_event(window.EVENTS.open_confirm);
    });
  };


/**
 *    Defining events functions
 */

let
  window_data = models.window_data,

  open_alert_window = function()
  {
    window_data.type = 'alert';
    window_data.title = 'This is alert';
    models.html.alert_content.admission = '<b>ble ble</b> aha, no ok...';

    dialogue_window_controller.open_alert();
  },


  open_prompt_window = function()
  {
    window_data.type = 'prompt';
    window_data.name = 'authorisation';
    window_data.title = 'Authorisation';
    models.html.prompt_content.admission = '<div>If you want save the changes enter your password.</div>';

    dialogue_window_controller.open_prompt();
  },


  open_confirm_window = function()
  {
    window_data.type = 'confirm';
    window_data.name = 'stupid';
    window_data.title = 'You are stupid?';
    models.html.confirm_content.admission = '<div>You have to confirm that you are stupid.</div>';

    dialogue_window_controller.open_confirm();
  },


  close_window = function(event)
  {
    event.preventDefault();
    event.stopPropagation();

    dialogue_window_controller.close_window();
  },


  cancel_event = function(event)
  {
    event.preventDefault();
    event.stopPropagation();
  };