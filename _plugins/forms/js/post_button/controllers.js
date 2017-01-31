/**
 * Created by mrskull on 17.12.16.
 */


import {Post_Button_Views} from './views'


export let Post_Button_Controllers = function(config)
{
  if(typeof config === 'undefined' && typeof config.container === 'undefined')
  {
    console.error('Exeption error: invalid container.');
    return {};
  }


  let
    buttons_views = {},


    manage_buttons = function(event)
    {
      event.preventDefault();
      event.stopPropagation();

      let
        button_name = $(this).data('name');

      buttons_views[button_name].start();
    },


    create_button_views = function()
    {
      let
        button_name = $(this).data('name');
      config.button = this;
      config.button_name = button_name;
      config.button_url = $(this).data('url');
      config.button_html = $(this).html();

      buttons_views[button_name] = new Post_Button_Views(config);
    };


  this.define = function()
  {
    let $post_buttons = $('.post_button', config.container);

    $post_buttons
      .each(create_button_views);

    $post_buttons
      .click(manage_buttons);
  };
};