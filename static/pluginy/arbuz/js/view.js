/**
 * Created by mrskull on 24.11.16.
 */

import {content_controller_events} from '../../content/js/view'
import {menu_controller_events} from '../../menu/js/view'
import {form_controller_events} from '../../forms/js/view'

/*---------------- Wydarzenia na stronie ----------------*/


let define = function()
{
  // Usuń wszystkie wydarzenia ze wszystkich elementów
  $( '*' ).off();

  content_controller_events.define();
  menu_controller_events.define();
  form_controller_events.define();
};


export let start = function()
{
  define();

  window.addEventListener('define', define, false);
};
