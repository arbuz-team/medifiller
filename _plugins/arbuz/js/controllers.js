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

let

  reload_for_sign_in = function()
  {
    let
      delay = window.APP.DATA.delay,

      reload = function()
      {
        window.APP.throw_event(window.EVENTS.plugins.reload_navigation);
        window.APP.throw_event(window.EVENTS.plugins.reload_cart);
      };

    if(delay)
      setTimeout(reload, delay);
    else
      reload();
  },


  define = function()
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
  window.APP.add_own_event('plugins_reload_sign_in', reload_for_sign_in);

  searcher_controllers.start();
  cart_controllers.start();
  navigation_controllers.start();
  header_controllers.start();
  ground_controllers.start();

  define();
};