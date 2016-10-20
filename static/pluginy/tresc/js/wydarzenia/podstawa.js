/*    JavaScript    */


/*---------------- Wydarzenia Kontrolera Treści ----------------*/

"use strict"; 


var Wydarzenia_Kontrolera_Tresci = (function()
{
  
  var Definiuj = function()
  {
    $( 'a' ).click( Zmien_Adres );

    $( 'form' ).submit( Przygotuj_Formularz_Do_Wyslania );

    window.addEventListener( "popstate", Cofnij_Adres );
  }

//////////////////////////////////////////////////////////

  var Pobierz_Pola_Formularza = function( element )
  {
    var Pola = $( element ).serializeArray()
      , Obiekt_formularza = {}

    $.each( Pola, function( i, pole )
    {
      Obiekt_formularza[ pole.name ] = pole.value;
    });

    return Obiekt_formularza;
  }



  var Przygotuj_Formularz_Do_Wyslania = function( event )
  {
    var adres = $( this ).attr( 'action' )
      , Obiekt_formularza = Pobierz_Pola_Formularza( this );

    if( typeof adres === undefined || adres === '' )
      adres = Kontroler_Danych.Daj( 'sciezka' );

    Kontroler_Tresci.Zmien_Tresc( adres, Obiekt_formularza );
    
    return false;
  }

//////////////////////////////////////////////////////////

  var Zmien_Adres = function( event )
  {
    var adres = $( this ).attr( 'href' );

    if( event.which === 1 )
    {
      if( Kontroler_Danych.Daj( 'sciezka' ) !== adres )
        Kontroler_Tresci.Zmien_Tresc( adres )

      return false;
    }
  }


  var Cofnij_Adres = function()
  {
    Kontroler_Tresci.Uruchom();
  }

//------------------------------------------

  var udostepnione = 
  {
    Definiuj : Definiuj
  }

  return udostepnione;
})();
 
