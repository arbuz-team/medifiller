/**
 * Created by mrskull on 17.01.17.
 */

/**
 *    Defining private functions
 */
import {Auto_Form_Models} from './models'


export let Auto_Form_Views = function(config)
{
  let
    models = new Auto_Form_Models(config);

  this.models = models;


  /**
   *    Defining public functions
   */

  this.send_checkbox = function()
  {
    let
      $field = $(this),
      post_data = {};

    post_data['__'+ models.settings.origin +'__'] = $field.data('name');
    post_data['name'] = $field.attr('name');

    if($field.is(':checked'))
      post_data['action'] = 'append';
    else
      post_data['action'] = 'delete';

    send(post_data);
  };


  this.send_default = function()
  {
    let
      $field = $(this),
      post_data = {};

    post_data['__'+ models.settings.origin +'__'] = $field.data('name');
    post_data['value'] = $field.val();

    send(post_data);
  };


  // let check_is_key_code_printable_or_functional = function(event)
  // {
  //   let keycode = event.keyCode;
  //
  //   let valid =
  //     (keycode > 47 && keycode < 58)   ||   // number keys
  //     keycode === 8 || keycode === 46 ||    // backspace & delete
  //     keycode === 32 || keycode === 13   || // spacebar & return key(s) (if you want to allow carriage returns)
  //     (keycode > 64 && keycode < 91)   ||   // letter keys
  //     (keycode > 95 && keycode < 112)  ||   // numpad keys
  //     (keycode > 185 && keycode < 193) ||   // ;=,-./` (in order)
  //     (keycode > 218 && keycode < 223);     // [\]' (in order)
  //
  //   return valid;
  // };


  // this.send_on_key_up = function(event)
  // {
  //   if(check_is_key_code_printable_or_functional(event))
  //   {
  //     let
  //       $field = $(this),
  //       post_data = {};
  //
  //     post_data['__'+ models.settings.origin +'__'] = $field.data('name');
  //     post_data['value'] = $field.val();
  //
  //     send(post_data);
  //   }
  // };


  let check_is_key_code_enter = function(event)
  {
    return event.keyCode === 13;
  };


  this.send_on_enter = function(event)
  {
    if(check_is_key_code_enter(event))
    {
      event.preventDefault();
      let
        $field = $(this),
        post_data = {};

      post_data['__'+ models.settings.origin +'__'] = $field.data('name');
      post_data['value'] = $field.val();

      models.settings.delay = 0;

      send(post_data);
    }
  };


  /**
   *    Defining private functions
   */

  let send = function(post_data)
  {
    window.APP.http_request(models.settings.action, post_data, function()
    {
      APP.DATA = {
        redirect: '/products/',
      };

      if(typeof models.settings.delay !== 'undefined')
        APP.DATA.delay = models.settings.delay;
      else
        APP.DATA.delay = 1000;

      APP.throw_event(window.EVENTS.redirect);
    });
  };

};


