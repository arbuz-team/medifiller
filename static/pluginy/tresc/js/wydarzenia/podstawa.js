/**
 * Created by mrskull on 24.11.16.
 */

"use strict";


import {Kontroler_Tresci, Kontroler_Danych, EVENTS} from '../podstawa';
export {Kontroler_Danych, EVENTS} from '../podstawa';

let Tresc = new Kontroler_Tresci();


/*---------------- Wydarzenia Kontrolera Treści ----------------*/

export function Wydarzenia_Kontrolera_Tresci()
{
  
  this.Definiuj = function()
  {
    $( 'a' ).click( Zmien_Adres );

    window.addEventListener( "popstate", Cofnij_Adres );

    window.onload = () => {
      Tresc.Uruchom();
    };
  };

//////////////////////////////////////////////////////////

  let Zmien_Adres = function( event )
  {
    event.preventDefault();
    let adres = $( this ).attr( 'href' );

    if( event.which === 1 )
    {
      if( Kontroler_Danych.Daj( 'sciezka' ) !== adres )
        Tresc.Zmien_Tresc( adres );
    }
  };


  let Cofnij_Adres = function()
  {
    event.preventDefault();
    Tresc.Uruchom();
  }

}
 
