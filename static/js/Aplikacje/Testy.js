/*    JavaScript    */


/*---------------- Testy ----------------*/

"use strict"; 


var TEST = false; // DEBUG
var TEST_SZCZEGOLOWY = false;



var Testuj_Strone = function()
{
  console.clear();

  try
  {
    //------------------ Testy interfejsów ------------------
    Test_Interfejs_Funkcji_Standardowych.Uruchom();

    //------------------ Testy aplikacji ------------------
    Test_Komunikat.Uruchom();
    Test_Sprawdz.Uruchom();
    Test_Tresc.Uruchom();

    //------------------ Testy interfejsów aplikacji ------------------
    Test_Kanar.Uruchom(); // Interfejs klas `Komunikat` i `Sprawdz`
    
    
    Testuj_Strone.Sprawdz_Komunikaty();
  }
  catch( blad )
  {
    Testuj_Strone.Wyswietl_Wyjatek( blad );

    return 'Testy - Błędy!';
  }

  TEST_SZCZEGOLOWY = false;
  
  return 'Testy - OK!';
}



Testuj_Strone.Dokladnie = function()
{
  TEST_SZCZEGOLOWY = true;

  var wynik_testow = Testuj_Strone();

  TEST_SZCZEGOLOWY = false;

  return wynik_testow;
}


Testuj_Strone.Wyswietl_Wyjatek = function( blad )
{
  if( blad )
  {
    console.group( 'Wyjątek: ' );
    console.error( blad );
    console.trace();
    console.groupEnd();
  }
}


Testuj_Strone.Sprawdz_Komunikaty = function()
{
  var tablica_komunikatow = Komunikat.Zwroc_Tablice_Komunikatow();

  if( tablica_komunikatow.length )
  {
    if( TEST_SZCZEGOLOWY )
      throw 'Wystąpiły niespodziewane komunikaty!';
    else
      throw '';
  }
}



if( TEST )
  console.log( Testuj_Strone() );

