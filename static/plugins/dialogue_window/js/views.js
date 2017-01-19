/**
 * Created by mrskull on 29.12.16.
 */

import * as models from './models'


/**
 *    Defining private functions
 */

let
  create_part = function(text)
  {
    return models.html.part.begining + text + models.html.part.ending;
  };


/**
 *    Defining public functions
 */

export let
  selectors = models.selectors,
  window_data = models.window_data,

  open_window = function()
  {
    $(selectors.header)
      .html(window_data.title);

    $(selectors.content)
      .html(window_data.content);


    $(selectors.container)
      .fadeIn(200);

    window.APP.throw_event(window.EVENTS.define);
  },


  close_window = function()
  {
    $(models.selectors.container)
      .fadeOut(200);
  },


  open_alert = function()
  {
    window_data.content = models.html.alert_content.admission;

    open_window();
  },


  open_prompt = function()
  {
    window_data.content = create_part(models.html.prompt_content.admission)
      + create_part(models.html.prompt_content.form)
      + create_part(models.html.prompt_content.ending);

    open_window();
  },


  open_confirm = function()
  {
    window_data.content = models.html.confirm_content.admission
      +'<br />'+ models.html.confirm_content.ending;

    open_window();
  };