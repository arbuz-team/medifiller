/*    JavaScript    */


/*---------------- Test - Komunikat ----------------*/

"use strict"; 


var Test_Komunikat = Object.create( Komunikat );

Test_Komunikat.Uruchom = 
  function()
  {
    var T = this;

    T.Test_Blad();
    T.Test_Log();
  }


Test_Komunikat.Test_Log = 
  function()
  {
    var K = this
      , tablica_komunikatow

    K.Log( 'Testowanie', 'Testowanie log\'a!' );

    Konsola.Wyczysc();

    tablica_komunikatow = K.Zwroc_Tablice_Komunikatow();

    if( Sprawdz.Czy_Nie_Rowne( tablica_komunikatow[0][0], 'Testowanie' )
     && Sprawdz.Czy_Nie_Rowne( tablica_komunikatow[0][1], 'Testowanie log\'a!' ) )
    {
      console.error( 'Błąd testu!' );
    }

    K.Wyczysc_Tablice_Komunikatow();
  }


Test_Komunikat.Test_Blad = 
  function()
  {
    var K = this
      , tablica_komunikatow

    K.Blad( 'Testowanie', 'Testowanie komunikatu o błędzie!' );

    Konsola.Wyczysc();

    tablica_komunikatow = K.Zwroc_Tablice_Komunikatow();

    if( Sprawdz.Czy_Nie_Rowne( tablica_komunikatow[0][0], 'Testowanie' )
     && Sprawdz.Czy_Nie_Rowne( tablica_komunikatow[0][1], 'Testowanie komunikatu o błędzie!' ) )
    {
      console.error( 'Błąd testu!' );
    }

    K.Wyczysc_Tablice_Komunikatow();
  }
