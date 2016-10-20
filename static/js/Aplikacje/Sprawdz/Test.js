/*    JavaScript    */


/*---------------- TESTY - Sprawdz ----------------*/

"use strict"; 


var Test_Sprawdz = (function()
{


  var Uruchom = function()
  {
    Test_Czy_Rowne();
    Test_Czy_Nie_Rowne();
    Test_Czy_Istnieje_Element();
    Test_Czy_Nie_Istnieje_Element();
    Test_Czy_Tablica();
    Test_Czy_Nie_Tablica();
    Test_Atrybut_Data();
  }


  var Test_Atrybut_Data = function()
  {
    $( 'body' ).data( 'testuj', 'test' );

    if( Sprawdz.Atrybut_Data( 'body', 'testuj', 'test' ) !== true
     || Sprawdz.Atrybut_Data( 'body', 'testuj', 'test111' ) !== false 
     || Sprawdz.Atrybut_Data( 'body', 'testuj_zle', 'test' ) !== false 
     || Sprawdz.Atrybut_Data( 'xxx', 'testuj_zle', 'test' ) !== false )
      Komunikat.Blad_Testu();
  }


  var Test_Czy_Nie_Tablica = function()
  {
    var tablica_1
      , tablica_2 = [ '', '', [ '', '' ] ]
      , tablica_3 = 'tekst'

    if( Sprawdz.Czy_Nie_Tablica( tablica_1 ) !== true
     && Sprawdz.Czy_Nie_Tablica( tablica_2 ) !== false 
     && Sprawdz.Czy_Nie_Tablica( tablica_3 ) !== true )
      Komunikat.Blad_Testu();
  }


  var Test_Czy_Tablica = function()
  {
    var tablica_1
      , tablica_2 = [ '', '', [ '', '' ] ]
      , tablica_3 = 'tekst'

    if( Sprawdz.Czy_Tablica( tablica_1 ) !== false
     && Sprawdz.Czy_Tablica( tablica_2 ) !== true
     && Sprawdz.Czy_Tablica( tablica_3 ) !== false )
      Komunikat.Blad_Testu();
  }


  var Test_Czy_Istnieje_Element = function()
  {
    var wynik = Sprawdz.Czy_Istnieje_Element( 'body' );
    if( wynik === false )
      Komunikat.Blad_Testu();
  }


  var Test_Czy_Nie_Istnieje_Element = function()
  {
    var wynik = Sprawdz.Czy_Nie_Istnieje_Element( 'body' );
    if( wynik === true )
      Komunikat.Blad_Testu();

    wynik = Sprawdz.Czy_Nie_Istnieje_Element( 'aha' );
    if( wynik !== true )
      Komunikat.Blad_Testu();
  }


  var Test_Czy_Nie_Rowne = function()
  {
    var wynik = Sprawdz.Czy_Nie_Rowne( '', '' );
    if( wynik === true )
      Komunikat.Blad_Testu();


    wynik = Sprawdz.Czy_Nie_Rowne( ['xxx'], '' );
    if( wynik === false )
      Komunikat.Blad_Testu();


    wynik = Sprawdz.Czy_Nie_Rowne( ['xxx'], {'0' : 'xxx'} );
    if( wynik === false )
      Komunikat.Blad_Testu();
  }


  var Test_Czy_Rowne = function()
  {
    var wynik = Sprawdz.Czy_Rowne( '', '' );
    if( wynik === false )
      Komunikat.Blad_Testu();


    wynik = Sprawdz.Czy_Rowne( 50, 50 );
    if( wynik === false )
      Komunikat.Blad_Testu();


    wynik = Sprawdz.Czy_Rowne( ['xxx'], '' );
    if( wynik === true )
      Komunikat.Blad_Testu();


    wynik = Sprawdz.Czy_Rowne( ['xxx'], {'0' : 'xxx'} );
    if( wynik === true )
      Komunikat.Blad_Testu();
  }

//------------------------------------------

  var udostepnione = 
  {
    Uruchom : Uruchom
  }

  return udostepnione;
})();






