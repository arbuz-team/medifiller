/**
 * Created by mrskull on 21.01.17.
 */

import * as interior_dialog_views from './views'
import {close as dialog_close} from '../controllers'
import {Form_Controllers}  from '../../../forms/js/controllers'




/////////////////////////////

export let

  load = interior_dialog_views.load;


let

  selectors = interior_dialog_views.selectors,

  dialog_form_controllers = new Form_Controllers(interior_dialog_views);


export let

  recognize_button = function(event)
  {
    let
      $button = $(this),
      name = $button.data('name');

    switch(name)
    {
      case 'cancel': dialog_close();
        break;

      case 'send': $('form', selectors.container).submit();
        break;
    }
  },


  define = function()
  {
    $(selectors.buttons).click(recognize_button);
    dialog_form_controllers.define();
  };