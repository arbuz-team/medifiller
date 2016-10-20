/*    JavaScript    */

"use strict"; 

/*********************** Definiowanie zmiennych globalnych ***********************/

var DOMENA = location.protocol + '//' + location.hostname + ':' + location.port;

/* Pobieranie danych */
/* Wysyłanie */
/* Dostosuj */

/*********************** POBIERANIE DANYCH ***********************/


var pobierz = (function()
{
  function zmienne_wysokosc()
  {
    var obiekt = 
    {
      strona : $(window).height(),
      naglowek : $( '#NAGLOWEK' ).outerHeight(),
      tresc : $( '#TRESC' ).outerHeight(),
      stopka : $( '#STOPKA' ).outerHeight(),

      padding : parseInt( $( '#TRESC' ).css( 'padding-top' ) )
        + parseInt( $( '#TRESC' ).css( 'padding-bottom' ) ),
      margin : parseInt( $( '#TRESC' ).css( 'margin-top' ) )
        + parseInt( $( '#TRESC' ).css( 'margin-bottom' ) )
    }

    return obiekt;
  }



  function ktory_guzik(evt)
  {
    var e = evt;
    var code = e.keyCode || e.which;

    return code;
  }



  function wymiary_grafiki( adres )
  {
    var img = new Image();
    
    img.onload = function()
    {

      var obiekt = {
          width : this.width,
          height : this.height
        };

      dostosuj.tapete( obiekt );

      $(window).resize(function()
      {
        
        dostosuj.tapete( obiekt );

      });
    }

    img.src = adres;
  }



  var udostepnione = 
  {
    zmienne_wysokosc : zmienne_wysokosc,
    ktory_guzik : ktory_guzik,
    wymiary_grafiki : wymiary_grafiki
  }

  return udostepnione;
})();




/*********************** WYSYŁANIE ***********************/

var wyslij = (function()
{

  function numer_filtra( numer )
  {
    $.get( DOMENA +'/wyszukiwarka/wybrany_filtr/'+ numer +'/' ).fail(function() {
      console.log( 'błąd - funkcje - przelacznik zakladek w fitry' );
    });
  }

  function numer_bloku( numer )
  {
    $.get( DOMENA +'/edytuj/wybrana_zakladka/'+ numer +'/' ).fail(function() {
      console.log( 'błąd - funkcje - przelacznik zakladek w fitry' );
    });
  }



  function numer_filtra_i_przekieruj( numer, guzik, domena, adres )
  {
    $.get( DOMENA +'/wyszukiwarka/wybrany_filtr/'+ numer +'/' ).done(function() {

      if( guzik == 1 )
        ruch.przekieruj_do( domena, adres );

      else if( guzik == 2 )
        ruch.otworz_w_nowej_karcie( domena, adres );

    }).fail(function() {
      console.log( 'błąd - funkcje - przelacznik zakladek w fitry' );
    });
  }



  var udostepnione = 
  {
    numer_filtra : numer_filtra
    , numer_bloku : numer_bloku
    , numer_filtra_i_przekieruj : numer_filtra_i_przekieruj
  }

  return udostepnione;
})();




/*********************** DOSTOSUJ ***********************/

var dostosuj = (function()
{

  var wysokosc_strony = function()
  {
    var wysokosc = pobierz.zmienne_wysokosc();

    $( '#TRESC' ).css( 'min-height', (wysokosc.strona - wysokosc.naglowek - wysokosc.stopka - wysokosc.margin) );

    if( $( '#TRESC > .BLOK1' ).is( '.stala_wysokosc' ) )
      $( '#TRESC > .BLOK2' ).css( 'min-height', (wysokosc.strona - wysokosc.naglowek - wysokosc.stopka - wysokosc.margin - parseInt($( '#TRESC > .BLOK1' ).outerHeight()) ) );
    else
      $( '#TRESC > .BLOK1' ).css( 'min-height', (wysokosc.strona - wysokosc.naglowek - wysokosc.stopka - wysokosc.margin) );

    $( '#TRESC.start > .BLOK1' ).css( 'min-height', (wysokosc.strona - wysokosc.naglowek - wysokosc.margin) );
  };



  function tapete( tapeta )
  {
    var miejsce = '#TRESC.start > .BLOK1 > .tlo'
      , okno = {
          width : $(window).width(),
          height : $(window).height() - $( '#NAGLOWEK' ).outerHeight()
        };

    if( okno.width / okno.height >= tapeta.width / tapeta.height )
      $( miejsce ).css( 'background-size', '100% auto' );

    else if( okno.width / okno.height < tapeta.width / tapeta.height )
      $( miejsce ).css( 'background-size', 'auto 100%' );
  }



  var strone_do_scrollbara = function()
  {
    var wysokosci = pobierz.zmienne_wysokosc()
      , strona = wysokosci.strona
      , tresc = wysokosci.naglowek + wysokosci.tresc + wysokosci.stopka
      , right = parseInt( $( '#NAGLOWEK > div' ).css( 'right' ) )

    if( strona < tresc )
    {
      if( right == 0 )
        $( '#NAGLOWEK > div' ).css( 'right', '15px' );
    }
    else if( strona => tresc )
    {
      if( right != 0 )
        $( '#NAGLOWEK > div' ).css( 'right', '0px' );
    }
  };



  function stopBubble(e) 
  {
    if(!e)
      var e = window.event;

    e.cancelBubble = true; 

    if(e.stopPropagation)
      e.stopPropagation();
  }


  var udostepnione = 
  {
    wysokosc_strony : wysokosc_strony
    , tapete : tapete
    , strone_do_scrollbara :  strone_do_scrollbara
    , stopBubble : stopBubble
  }

  return udostepnione;
})();

