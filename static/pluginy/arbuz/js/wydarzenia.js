/**
 * Created by mrskull on 24.11.16.
 */

import {Wydarzenia_Kontrolera_Tresci, EVENTS} from '../../tresc/js/wydarzenia/podstawa';
import {Wydarzenia_Kontrolera_Menu} from '../../menu/js/wydarzenia/podstawa';

export {Wydarzenia_Kontrolera_Tresci, EVENTS} from '../../tresc/js/wydarzenia/podstawa';
export {Wydarzenia_Kontrolera_Menu} from '../../menu/js/wydarzenia/podstawa';

/*---------------- Wydarzenia na stronie ----------------*/

'use strict';

let Wydarzenia_Tresci = new Wydarzenia_Kontrolera_Tresci()
  , Wydarzenia_Menu = new Wydarzenia_Kontrolera_Menu();


let Definiuj = function()
{
  // Usuń wszystkie wydarzenia ze wszystkich elementów
  $( '*' ).off();

  Wydarzenia_Tresci.Definiuj();
  Wydarzenia_Menu.Definiuj();
  // Wydarzenia_Kontrolera_Formularzy.Definiuj();
};


export let Uruchom = function()
{
  Definiuj();

  window.addEventListener('define', Definiuj, false);
};
