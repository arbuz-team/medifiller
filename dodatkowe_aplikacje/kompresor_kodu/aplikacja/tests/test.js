/*    JavaScript    */


/*---------------- Struktura Dane_Strony ----------------*/

"use strict"; 


var Dane_Strony = (function()
{
  var Dane = {};

  var Resetuj = function()
  {
    Dane = {
      protokol : location.protocol
      , nazwa_hosta : location.hostname
      , pelna_nazwa_hosta : location.host
      , port : location.port
      , domena : location.protocol +'://'+ location.host
      , sciezka : location.pathname
      , pelny_adres : location.href
      
      , nazwa_strony : 'Arbuz Team'
      , tytul : 'Arbuz Team'
      , opis : 'To jest opis'
      , csrf_token : $( 'input[ name=csrfmiddlewaretoken ]').val()
      , kontener : '#TRESC'
    }
  }
  Resetuj();

  var Daj = function( nazwa )
  {
    return Dane[ nazwa ];
  }


  var Zmien = function( nazwa, wartosc )
  {
    if( Dane[ nazwa ] )
      Dane[ nazwa ] = wartosc;
  }


  var Zmien_Wiele = function( Obiekt )
  {
    for( var nazwa in Obiekt )
      if( nazwa = 'tytul')
        if( Obiekt[ nazwa ] != '' )
          Dane[ nazwa ] = Obiekt[ nazwa ] +' - '+ Dane.nazwa_strony;
        else
          Dane[ nazwa ] = Dane.nazwa_strony;
      else
        Dane[ nazwa ] = Obiekt[ nazwa ];
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
