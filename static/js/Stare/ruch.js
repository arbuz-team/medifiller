/*    JavaScript    */

"use strict"; 

/*********************** RUCH ***********************/

var ruch = (function()
{

  var stary_adres;



  function przekieruj_do( domena, adres )
  {
    if( domena == 'inna' )
      var url = adres;

    else
      var url = DOMENA + adres;

    window.location.href = url;
  }



  function otworz_w_nowej_karcie( domena, adres )
  {
    if( domena == 'inna' )
      window.open( adres, '_blank' );

    else
    {
      var url = DOMENA + adres;
      window.open( url, '_blank' );
    }
  }



  function pokaz_produkt( adres, plynnosc )
  {
    if( adres )
    {
      var czy_oferta = window.location.pathname.split( '/' )[1]
        , id = adres.split( '/' )[2]
        , url = DOMENA +'/produkt/szczegoly/'+ id +'/'

      if( czy_oferta == 'oferta' )
      {
        stary_adres = window.location.href

        window.history.pushState(
          { page : adres },
          adres,
          adres
        );
      }
      else
        stary_adres = DOMENA +'/oferta/'

      $.get( url, function(dane)
      {
        $( 'head' ).append( '<script>'+ dane +'zmiana.pokaz_produkt( dane_produktu, '+ plynnosc +' ); </script>' );
      });
    }
    else
      console.log('Brak wartości zmiennych');
  }



  function ukryj_produkt()
  {
    window.history.pushState(
      { page : stary_adres },
      stary_adres,
      stary_adres
    );

    zmiana.ukryj_produkt();
  }



  function post_i_odswiez( adres, dane )
  {
    $.post( DOMENA + adres, dane, function() {
      location.reload();
    })

    .fail(function() 
    {
      console.warn( 'Wystąpił błąd podczas przesyłania danych - ' + url );
    })
  }



  function pozycja_scrollbara()
  {
    var element = $(this).parent().data( 'href' )
      , aktualna_pozycja = $( '#BLOK_GLOWNY' ).scrollTop()
      , pozycja_elementu = $( element ).position()

    $( '#BLOK_GLOWNY > div' ).animate( { 'scrollTop': (pozycja_elementu.top + 30) }, 400 );
  }



  function sprawdz_cofnij( url, dane )
  {
    console.log( "location: " + url + ", state: " + dane );
  }



  function wyczysc_filtr( numer )
  {
    _przekieruj_do( 'ta', '/wyszukiwarka/usun_sesje_filtra/'+ numer +'/' )
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////


  var udostepnione = 
  {
    przekieruj_do : przekieruj_do
    , otworz_w_nowej_karcie : otworz_w_nowej_karcie
    , pokaz_produkt : pokaz_produkt
    , ukryj_produkt : ukryj_produkt
    , post_i_odswiez : post_i_odswiez
    , pozycja_scrollbara : pozycja_scrollbara
    , sprawdz_cofnij : sprawdz_cofnij
    , wyczysc_filtr : wyczysc_filtr
  }

  return udostepnione;
})();

