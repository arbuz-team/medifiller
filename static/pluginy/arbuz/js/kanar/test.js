/*    JavaScript    */


/*---------------- Test - Kanar ----------------*/

/*  Kanar to osoba zajmująca się sprawdzaniem 
    biletów i wystawianiem mandatów za ich brak.
    Ta klasa łączy klasy Komunikat i Sprawdz. 
    Robi to sprawdzając różne warunki 
    i wyświetlając odpowiedni komunikat */

"use strict"; 


var Test_Kanar = (function()
{

  var Uruchom = function()
  {
    var K = Kanar;
    K.Czy_Rowne( 'test', 'test' );  // nie dotyczy [''] === [''] 
                                    // oraz {'':''} = {'':''}
    K.Czy_Nie_Rowne( 'test', 'test1' );

    K.Czy_Istnieje_Element( 'body' );
    K.Czy_Nie_Istnieje_Element( 'aha' );
    K.Czy_Tablica( [ '', [ 'test' ] ] );

    K.Czy_Nie_Tablica( 'fs' );
    K.Czy_Nie_Tablica( { test : 'fs' } );

    $( 'body' ).Dodaj_Dane( 'testuj', 'test Kanara' );
    K.Atrybut_Data( 'body', 'testuj', 'test Kanara' );
    $( 'body' ).Usun_Dane( 'testuj' );
  }


//------------------------------------------

  var udostepnione = 
  {
    Uruchom : Uruchom
  }

  return udostepnione;
})();



