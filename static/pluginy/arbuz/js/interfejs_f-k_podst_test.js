/*    JavaScript    */


/*---------------- Interfejs funkcji standardowych ----------------*/

"use strict"; 

describe( 'Interfejs funkcji standardowych:', function()
{
  it( 'Metoda została poprawnie dodana.', function()
  {
    var wynik;

    Function.Dodaj_Metode( 'Funkcja_Testowa', function()
    {
      return 5;
    });

    wynik = Function.Funkcja_Testowa();

    delete Function.Funkcja_Testowa;

    expect( wynik ).toBe( 5 );
  })



  it('Puste pola zostały usunięte z tablicy.', function()
  {
    var tablica = [ '', 'o_nas', '', 'nic' ];

    tablica = tablica.Usun_Puste();

    expect( tablica[ 0 ] ).toBe( 'o_nas' );
    expect( tablica[ 1 ] ).toBe( 'nic' );
    expect( tablica[ 0 ] ).not.toBe( '' );
    expect( tablica[ 2 ] ).not.toBe( 'xd' );
  })

});


