/**
 * Created by mrskull on 17.12.16.
 */

import * as mini_form from './main'


export let define = function()
{
  $('.post_button')
    .click(send_post_button);
};


let send_post_button_is_running = false;

let send_post_button = function()
{
  if(send_post_button_is_running)
    return false;

  send_post_button_is_running = true;


  let $button = $(this),
    text_button = $.trim($button.text()), // Delete white spaces
    data_name = $button.data('name'),
    data_value = $button.data('value');

  // Change input on disabled
  $button
    .prop('disabled', true)
    .html('Loading...');

  let show_answer = function(response, status)
  {
    if(status === 'success')
    {
      $button
        .html(text_button)
        .prop('disabled', false);
      window.APP.DATA.redirect = undefined;
      window.APP.DATA.delay = undefined;
      window.dispatchEvent(window.EVENTS.redirect);
    }
    else
    {
      $button
        .html(text_button +': Error')
        .prop('disabled', false);
    }

    send_post_button_is_running = false;
  };

  setTimeout(() => {
    mini_form.send(data_name, data_value, show_answer);
  }, 100);

};