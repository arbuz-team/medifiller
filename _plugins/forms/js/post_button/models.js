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
    url: undefined,

    text_loading: 'Sending...',
    text_done: "It's done!",
    text_error: 'Error / Resend',
    text_standard: undefined,
  };

  let load_settings = function()
  {
    if(typeof config !== 'undefined')
    {
      // -- Container
      if(typeof config.container !== 'undefined')
        that.settings.container = config.container;

      // -- Callback
      if(typeof config.callback !== 'undefined')
        that.settings.callback = config.callback;

      // -- Button
      if(typeof config.button !== 'undefined')
        that.settings.button = config.button;

      // -- Button name
      if(typeof config.button_name !== 'undefined')
        that.settings.button_name = config.button_name;

      // -- Button url
      if(typeof config.button_url !== 'undefined')
        that.settings.url = config.button_url;

      // -- Button button_html
      if(typeof config.button_html !== 'undefined')
        that.settings.text_standard = config.button_html;
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

  this.send_post = function(callback)
  {
    setTimeout(function(){
      window.APP.http_request(that.settings.url, {__button__: true}, callback);
    }, 200);
  };

};