/**
 * Created by mrskull on 24.11.16.
 */

import {EVENTS} from '../kreator_wydarzen';
export {EVENTS} from '../kreator_wydarzen';

/*---------------- Struktura Dane_Strony ----------------*/

let Kontroler_Danych = function()
{
  let Prywatne_Dane,
      Publiczne_Dane;

  this.Resetuj = function()
  {
    Prywatne_Dane = {
      protokol : location.protocol,
      nazwa_hosta : location.hostname,
      pelna_nazwa_hosta : location.host,
      port : location.port,
      domena : location.protocol +'://'+ location.host,
      sciezka : location.pathname,
      pelny_adres : location.href,
      historia : [],
      csrf_token : $( 'input[ name=csrfmiddlewaretoken ]').val() || '',
    };

    Publiczne_Dane = {
      nazwa_strony : 'Arbuz Team',
      tytul : 'Ładuję... - Arbuz Team',
      opis : 'To jest opis',
      tresc_komunikatu : 'Pusty komunikat.',
      kontener : '#TRESC',
      Dane_post : {},
    };
  };

  this.Resetuj();


  this.Daj = function( nazwa )
  {
    if( typeof  Prywatne_Dane[ nazwa ] !== 'undefined' )
      return Prywatne_Dane[ nazwa ];

    else if( typeof Publiczne_Dane[ nazwa ] !== 'undefined' )
        return Publiczne_Dane[ nazwa ];
      else
        console.warn( 'Błędne wywołanie! Nie ma takiej zmiennej.'+ nazwa );
  };


  this.Zmien = function( nazwa, wartosc )
  {
    if( typeof Publiczne_Dane[ nazwa ] !== 'undefined' )
      Publiczne_Dane[ nazwa ] = wartosc;
    else if( typeof Prywatne_Dane[ nazwa ] !== 'undefined' )
      console.warn( 'Brak dostępu! Zmienna prywatna.' );
    else
      console.warn( 'Błędne wywołanie! Nie ma takiej zmiennej. Z' );
  };


  this.Zmien_Wiele = function( Obiekt )
  {
    for( let nazwa in Obiekt )
      if( Obiekt.hasOwnProperty( nazwa ) )
      {
        if( nazwa === 'tytul' )
        {
          if( Obiekt[ nazwa ] !== '' )
            this.Zmien( nazwa, Obiekt[ nazwa ] +' - '+ Publiczne_Dane.nazwa_strony );
          else
            this.Zmien( nazwa, Publiczne_Dane.nazwa_strony );
        }
        else
          this.Zmien( nazwa, Obiekt[ nazwa ] );
      }
  };

};

let Dane = new Kontroler_Danych();

export { Dane as Kontroler_Danych }
