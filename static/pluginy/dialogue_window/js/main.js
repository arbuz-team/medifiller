/**
 * Created by mrskull on 29.12.16.
 */

import * as models from './models'


/**
 *    Defining private functions
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
  },


  close_window = function(event)
  {
    $(models.selectors.container)
      .fadeOut(200);
  },


  open_alert = function()
  {
    window_data.content = models.alert_content.admission;

    open_window();
  },


  open_prompt = function()
  {
    window_data.content = models.prompt_content.admission
      +'<br />'+ models.prompt_content.form
      +'<br />'+ models.prompt_content.ending;

    open_window();
  },


  open_confirm = function()
  {
    window_data.content = models.confirm_content.admission
      +'<br />'+ models.confirm_content.ending;

    open_window();
  };