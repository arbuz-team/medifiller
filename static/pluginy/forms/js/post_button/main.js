/**
 * Created by mrskull on 18.12.16.
 */

let send_prepare_post = function(button_name, button_value)
{
  return {
    __button__ : button_name,
    value : button_value,
  };
};


export let send = function(button_name, button_value, callback)
{
  let post_data = send_prepare_post(button_name, button_value);

  window.APP.send_post(undefined, post_data, callback);
};