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


  /**
   *    Defining private functions
   */

  let send = function(post_data)
  {
    window.APP.http_request(models.settings.action, post_data, function()
    {
      APP.DATA = {
        redirect: '/products/',
        delay: 0,
      };
      APP.throw_event(window.EVENTS.redirect);
    });
  };

};


