/**
 * Created by mrskull on 24.11.16.
 */

import * as searcher_controller       from '../../searcher/js/controllers'
import * as cart_controller         from '../../cart/js/controllers'
import * as navigation_controller   from '../../navigation/js/controllers'
import * as header_controller       from '../../header/js/controllers'
import * as dialogue_window         from '../../dialogue_window/js/controllers'

import * as ground_controller       from '../../ground/js/controllers'
import * as form_controller         from '../../forms/js/controllers'


/*---------------- Wydarzenia na stronie ----------------*/

let define = function()
{
  // Usuń wszystkie wydarzenia ze wszystkich elementów
  $( '*' ).off();

  searcher_controller.define();
  cart_controller.define();
  navigation_controller.define();
  header_controller.define();
  dialogue_window.define();
  ground_controller.define();

  form_controller.define();
};


export let start = function()
{
  window.addEventListener('define', define, false);

  searcher_controller.start();
  cart_controller.start();
  navigation_controller.start();
  header_controller.start();
  ground_controller.start();

  define();
};