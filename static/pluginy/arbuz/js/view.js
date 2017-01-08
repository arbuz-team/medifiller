/**
 * Created by mrskull on 24.11.16.
 */

import * as filter_controller_events      from '../../filters/js/view'
import * as cart_controller_events        from '../../cart/js/view'
import * as navigation_controller_events  from '../../navigation/js/view'
import * as dialogue_window_events        from '../../dialogue_window/js/view'

import * as ground_controller_events     from '../../ground/js/view'
import * as form_controller_events        from '../../forms/js/view'


/*---------------- Wydarzenia na stronie ----------------*/

let define = function()
{
  // Usuń wszystkie wydarzenia ze wszystkich elementów
  $( '*' ).off();

  filter_controller_events.define();
  cart_controller_events.define();
  navigation_controller_events.define();
  dialogue_window_events.define();
  ground_controller_events.define();

  form_controller_events.define();
};


export let start = function()
{
  window.addEventListener('define', define, false);

  define();
};