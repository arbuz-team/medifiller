/**
 * Created by mrskull on 31.01.17.
 */


export let Post_Button_Models = function(config)
{
  let that = this;

  this.settings = {
    container: undefined,
    button: undefined,
    button_name: undefined,
    button_action: undefined,
    button_value: undefined,
    button_reload: undefined,
    button_url: undefined,
    callback: undefined,

    text_loading: 'Sending...',
    text_done: "It's done!",
    text_error: 'Error / Resend',
    text_standard: undefined,
  };

  let load_settings = function()
  {
    if(typeof config !== 'undefined')
    {
      window.APP.add_if_isset(config, that.settings, 'container');

      window.APP.add_if_isset(config, that.settings, 'callback');

      window.APP.add_if_isset(config, that.settings, 'button');

      window.APP.add_if_isset(config, that.settings, 'button_name');

      window.APP.add_if_isset(config, that.settings, 'button_action');

      window.APP.add_if_isset(config, that.settings, 'button_value');

      window.APP.add_if_isset(config, that.settings, 'button_reload');

      window.APP.add_if_isset(config, that.settings, 'button_url');

      window.APP.add_if_isset(config, that.settings, 'button_html', 'text_standard');
    }
  };

  load_settings();


/////////////////////////

  this.state = {
    is_loading: false,
  };


  this.is_loading = function()
  {
    return that.state.is_loading;
  };


/////////////////////////

  let prepare_post_data = function(action, value)
  {
    let obj = {__button__: action};

    if(value)
      obj.value = value;

    return obj;
  };


  this.send_post = function(callback)
  {
    setTimeout(function()
    {
      let
        url = that.settings.button_url,
        action = that.settings.button_action,
        value = that.settings.button_value,
        post_data = prepare_post_data(action, value);

      console.log(post_data);
      window.APP.http_request(url, post_data, callback);
    }, 200);
  };

};