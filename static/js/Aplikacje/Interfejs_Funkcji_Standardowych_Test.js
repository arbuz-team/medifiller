/*    JavaScript    */


/*---------------- Interfejs funkcji standardowych ----------------*/

"use strict"; 


var Test_Interfejs_Funkcji_Standardowych = (function()
{

  var Blad_Testu = 
    function( tresc )
    {
      console.group( 'Błąd testu:' );
      console.error( tresc );
      console.trace();
      console.groupEnd();
    }


  var Uruchom = 
    function()
    {
      Test_Dziedzicz_Po();
      Test_Dodaj_Metode();
    }


  var Test_Dodaj_Metode = 
    function()
    {
      var wynik;

      Function.Dodaj_Metode( 'Funkcja_Testowa', function()
        {
          return 5;
        });

      wynik = Function.Funkcja_Testowa();

      if( wynik !== 5 )
        Blad_Testu();

      delete Function.Funkcja_Testowa();
    }


  var Test_Dziedzicz_Po = 
    function()
    {
      var osoba = {
        "imię": "Jan",
        "nazwisko": "Nowak",
        "nick": "Janek"
      };

      var ja = Object.Dziedzicz_Po(osoba);

        if( ja.nick !== 'Janek' )
          Blad_Testu();


      ja.nick = "Włodek";

        if( ja.nick !== 'Włodek' )
          Blad_Testu();
      
      delete ja.nick;

        if( ja.nick !== 'Janek' )
          Blad_Testu();
    }

//------------------------------------------

  var udostepnione = 
  {
    Uruchom : Uruchom
  }

  return udostepnione;
})();

