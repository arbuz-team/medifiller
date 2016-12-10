/**
 * Created by mrskull on 24.11.16.
 */

import {Content_Controller_Events} from '../../tresc/js/wydarzenia/podstawa'
import {Menu_Controller_Events} from '../../menu/js/wydarzenia/podstawa'
import {Form_Controller_Events} from '../../formularze/js/wydarzenia/podstawa'

export {Content_Controller_Events} from '../../tresc/js/wydarzenia/podstawa'
export {Menu_Controller_Events} from '../../menu/js/wydarzenia/podstawa'
export {Form_Controller_Events} from '../../formularze/js/wydarzenia/podstawa'

/*---------------- Wydarzenia na stronie ----------------*/


let content_controller_events = new Content_Controller_Events()
  , menu_controller_events = new Menu_Controller_Events()
  , form_controller_events = new Form_Controller_Events();


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
