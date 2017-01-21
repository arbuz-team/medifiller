/**
 * Created by mrskull on 24.11.16.
 */

import * as searcher_controllers       from '../../searcher/js/controllers'
import * as cart_controllers         from '../../cart/js/controllers'
import * as navigation_controllers   from '../../navigation/js/controllers'
import * as header_controllers       from '../../header/js/controllers'
import * as dialog_controllers         from '../../dialog/js/controllers'

import * as ground_controllers       from '../../ground/js/controllers'


/*---------------- Wydarzenia na stronie ----------------*/

let define = function()
{
  // Usuń wszystkie wydarzenia ze wszystkich elementów
  $( '*' ).off();

  searcher_controllers.define();
  cart_controllers.define();
  navigation_controllers.define();
  header_controllers.define();
  dialog_controllers.define();
  ground_controllers.define();
};


export let start = function()
{
  window.addEventListener('define', define, false);

  searcher_controllers.start();
  cart_controllers.start();
  navigation_controllers.start();
  header_controllers.start();
  ground_controllers.start();

  define();
};