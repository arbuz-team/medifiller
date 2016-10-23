/*    JavaScript    */


/*---------------- Wydarzenia Kontrolera formularzy ----------------*/

"use strict"; 


var Wydarzenia_Kontrolera_Formularzy = (function()
{
  
  var Definiuj = function()
  {
    $( 'form' ).submit( Przygotuj_Formularz_Do_Wyslania );

    $( '.sprawdz_pole > input' ).focusout( _Sprawdz_Pole );
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
    event.preventDefault();

    var adres = $( this ).attr( 'action' )
      , Obiekt_formularza = Pobierz_Pola_Formularza( this );

    if( typeof adres === undefined || adres === '' )
      adres = Kontroler_Danych.Daj( 'sciezka' );

    Kontroler_Formularzy.Przeslij( adres, Obiekt_formularza );
    
    return false;
  }

//////////////////////////////////////////////////////////

  var _Sprawdz_Pole = function( event )
  {
    var $this = $( this )
      , nazwa = $this.attr( 'name' )
      , wartosc = $this.val()

    if( nazwa && wartosc )
      Kontroler_Formularzy.Sprawdz_Pole( this, nazwa, wartosc )
  }

//------------------------------------------

  var udostepnione = 
  {
    Definiuj : Definiuj
  }

  return udostepnione;
})();
 

