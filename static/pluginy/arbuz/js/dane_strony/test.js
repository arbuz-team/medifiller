/*    JavaScript    */


/*---------------- Testy struktury Dane_Strony ----------------*/

"use strict"; 


describe( 'W strukturze Dane_Strony', function()
{
  it( 'dane zostały dobrze pobrane,', function()
  {
    expect( Kontroler_Danych.Daj( 'protokol' ) ).toBe( location.protocol );
    expect( Kontroler_Danych.Daj( 'nazwa_strony' ) ).toBe( 'Arbuz Team' );
    expect( Kontroler_Danych.Daj( 'kontener' ) ).not.toBe( 'xd' );
  })


  it( 'pojedyncze dane zostały dobrze dodane,', function()
  {
    Kontroler_Danych.Zmien( 'kontener', 'body' );
    Kontroler_Danych.Zmien( 'protokol', 'body' );

    var komunikaty = Komunikat.Zwroc_Ostatni();

    Kanar.Czy_Rowne( Kontroler_Danych.Daj( 'kontener' ), 'body' );

    expect( Kontroler_Danych.Daj( 'kontener' ) ).toBe( 'body' );
    expect( Kontroler_Danych.Daj( 'protokol' ) ).not.toBe( 'body' );
  })


  it( 'wiele danych zostało zmienionych na raz', function()
  {
    Kontroler_Danych.Zmien_Wiele({
      tytul : 'Wizytówka'
      , opis : 'Ta strona opowiada o nas. ;)'
    });

    Kontroler_Danych.Zmien_Wiele({
      protokol : 'Wizytówka'
      , csrf_token : 'foijsaoifjsi'
    });

    expect( Kontroler_Danych.Daj( 'tytul' ) ).toBe( 'Wizytówka - '+ Kontroler_Danych.Daj( 'nazwa_strony' ) );
    expect( Kontroler_Danych.Daj( 'opis' ) ).toBe( 'Ta strona opowiada o nas. ;)' );
    expect( Kontroler_Danych.Daj( 'protokol' ) ).not.toBe( 'Wizytówka' );
    expect( Kontroler_Danych.Daj( 'csrf_token' ) ).not.toBe( 'foijsaoifjsi' );
  })

});

