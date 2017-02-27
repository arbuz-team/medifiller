/**
 * Created by mrskull on 21.01.17.
 */

import * as interior_dialog_views   from './views'
import {close as dialog_close}      from '../controllers'
import {Form_Controllers}           from '../../../forms/js/controllers'
import {Post_Button_Controllers}    from '../../../forms/js/post_button/controllers'


/////////////////////////////

export let

  load = interior_dialog_views.load;


let

  selectors = interior_dialog_views.selectors,
  variables = interior_dialog_views.variables,

  post_button_controllers = new Post_Button_Controllers({
    container: '#DIALOG > .dialog'
  }),

  dialog_form_controllers = new Form_Controllers(interior_dialog_views);


export let

  recognize_button = function()
  {
    let
      $button = $(this);

    variables.button_name = $button.data('dialog-button');

    switch(variables.button_name)
    {
      case 'cancel': dialog_close();
        break;

      case 'send': $('form', selectors.container).submit();
        break;

      default: console.error('Dialog error: Don\'t recognize button.');
    }
  },


  define = function()
  {
    $(selectors.buttons).click(recognize_button);

    post_button_controllers.define();
    dialog_form_controllers.define();
  };