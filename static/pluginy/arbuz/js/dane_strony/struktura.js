/*    JavaScript    */


/*---------------- Struktura Dane_Strony ----------------*/

"use strict"; 


var Kontroler_Danych = (function()
{
  var Prywatne_Dane = {}
    , Publiczne_Dane = {}
    , Funkcja_Po_Zaladowaniu = function(){};

  var Resetuj = function()
  {
    Prywatne_Dane = {
      protokol : location.protocol
      , nazwa_hosta : location.hostname
      , pelna_nazwa_hosta : location.host
      , port : location.port
      , domena : location.protocol +'://'+ location.host
      , sciezka : location.pathname
      , pelny_adres : location.href
      , historia : []
      , csrf_token : $( 'input[ name=csrfmiddlewaretoken ]').val()
    }

    Publiczne_Dane = {
      nazwa_strony : 'Arbuz Team'
      , tytul : 'Ładuję... - Arbuz Team'
      , opis : 'To jest opis'
      , tresc_komunikatu : 'Pusty komunikat.'
      , kontener : '#TRESC'
      , Dane_post : {}
    }
  }
  Resetuj();

  var Daj = function( nazwa )
  {
    if( Prywatne_Dane[ nazwa ] )
      return Prywatne_Dane[ nazwa ];

    else if( Publiczne_Dane[ nazwa ] )
        return Publiczne_Dane[ nazwa ];
      else
        Komunikat.Blad( 'Błędne wywołanie', 'Nie ma takiej zmiennej.' );
  }


  var Zmien = function( nazwa, wartosc )
  {
    if( Publiczne_Dane[ nazwa ] || Publiczne_Dane[ nazwa ] )
      Publiczne_Dane[ nazwa ] = wartosc;
    else if( Prywatne_Dane[ nazwa ] )
      Komunikat.Blad( 'Brak dostępu', 'Zmienna prywatna.' );
    else
      Komunikat.Blad( 'Błędne wywołanie', 'Nie ma takiej zmiennej.' );
  }


  var Zmien_Wiele = function( Obiekt )
  {
    for( var nazwa in Obiekt )
      if( nazwa = 'tytul')
      {
        if( Obiekt[ nazwa ] != '' )
          Zmien( nazwa, Obiekt[ nazwa ] +' - '+ Publiczne_Dane.nazwa_strony );
        else
          Zmien( nazwa, Publiczne_Dane.nazwa_strony );
      }
      else
        Zmien( nazwa, Obiekt[ nazwa ] );
  }


//------------------------------------------

  var udostepnione = 
  {
    Resetuj : Resetuj
    , Daj : Daj
    , Zmien : Zmien
    , Zmien_Wiele : Zmien_Wiele
  }

  return udostepnione;
})();
