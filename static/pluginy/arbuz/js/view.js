/**
 * Created by mrskull on 24.11.16.
 */

import * as content_controller_events from '../../content/js/view'
import * as menu_controller_events from '../../menu/js/view'
import * as form_controller_events from '../../forms/js/view'
import * as dialogue_window_events from '../../dialogue_window/js/view'
import * as extensions_events from './extensions/view'


/*---------------- Wydarzenia na stronie ----------------*/

let define = function()
{
  // Usuń wszystkie wydarzenia ze wszystkich elementów
  $( '*' ).off();

  content_controller_events.define();
  menu_controller_events.define();
  form_controller_events.define();
  dialogue_window_events.define();
  extensions_events.define();
};


export let start = function()
{
  define();

  window.addEventListener('define', define, false);
};
