/*    JavaScript    */

"use strict"; 

/*********************** WYDARZENIA ***********************/

var wydarzenie = (function()
{

  function div_link(event)
  {
    var adres = $(this).data( 'href' )
      , domena = $(this).data( 'domena' )
      , guzik = pobierz.ktory_guzik(event)

    if( guzik == 1 )
      ruch.przekieruj_do( domena, adres );

    else if( guzik == 2 )
      ruch.otworz_w_nowej_karcie( domena, adres );
  }



  function div_lupa(event)
  {
    var adres = $(this).data( 'href' )
      , domena = $(this).data( 'domena' )
      , numer = $(this).data( 'numer' )
      , guzik = pobierz.ktory_guzik(event)

    wyslij.numer_filtra_i_przekieruj( numer, guzik, domena, adres );
  }



  function select_link() 
  {
    ruch.przekieruj_do( $(this).children( ':selected' ).data( 'domena' ), $(this).val() );
  }



  function select_post()
  {
    ruch.post_i_odswiez( $(this).parent().data( 'href' ), 
      { csrfmiddlewaretoken : $(this).parent().children( 'input[name=csrfmiddlewaretoken]' ).val(), 
        zawartosc : $(this).val() } );
  }



  function pokaz_produkt(event)
  {
    var adres = $(this).data( 'href' )
      , guzik = pobierz.ktory_guzik(event)

    if( guzik == 1 )
      ruch.pokaz_produkt( adres, true );

    else if( guzik == 2 )
      window.open( adres, '_blank' );
  }



  function ukryj_produkt(event)
  {
    var guzik = pobierz.ktory_guzik(event);

    if( guzik == 1 || guzik == 2 )
      ruch.ukryj_produkt();
  }



  function pokaz_ustawienia_produktu(event)
  {
    var numer_produktu = $(this).data( 'numer' );

    if( $(this).children( '.ustawienia' ).is( ':hidden' ) )
    {
      zmiana.pokaz_ustawienia_produktu(numer_produktu);
    }

  }



  function ukryj_ustawienia_produktu(event)
  {
    var $produkt = $(this).parent().parent();
    var numer_produktu = $produkt.parent().parent().data( 'numer' );

    if( $produkt.children( '.obrazek' ).is( ':hidden' ) )
    {
      zmiana.ukryj_ustawienia_produktu(numer_produktu);
    }

  }



  function zmien_zakladke_filtrow(event)
  {
    dostosuj.stopBubble(event);

    if( !$(this).is( '.wybrana' ) )
    {
      zmiana.przelacznik_zakladek_filtry( '#' + $(this).parent().parent().attr( 'id' ), $(this).data( 'numer' ) );

      wyslij.numer_filtra( $(this).data( 'numer' ) );
    }
  }



  function wyczysc_pojedynczy_filtr(event)
  {
    dostosuj.stopBubble(event);

    ruch.wyczysc_filtr( $(this).parent().data( 'numer' ) );
  }



  function zmien_zakladke_blokow()
  {
    if( !$(this).is( '.wybrana' ) )
    {
      zmiana.przelacznik_zakladek_bloki( $(this).data( 'numer' ) );

      wyslij.numer_bloku( $(this).data( 'numer' ) );
    }
  }



  function dostosuj_naglowek()
  {
    var top = parseInt( $(this).scrollTop() );

    if( top > 30 )
      zmiana.zmniejsz_naglowek();

    else
      zmiana.zwieksz_naglowek();
  }



  var udostepnione = 
  {
    div_link : div_link
    , div_lupa : div_lupa
    , select_link : select_link
    , select_post : select_post
    , pokaz_produkt : pokaz_produkt
    , ukryj_produkt : ukryj_produkt
    , pokaz_ustawienia_produktu : pokaz_ustawienia_produktu
    , ukryj_ustawienia_produktu : ukryj_ustawienia_produktu
    , zmien_zakladke_filtrow : zmien_zakladke_filtrow
    , wyczysc_pojedynczy_filtr : wyczysc_pojedynczy_filtr
    , zmien_zakladke_blokow : zmien_zakladke_blokow
    , dostosuj_naglowek : dostosuj_naglowek
  }

  return udostepnione;
})();


////////////////////////////////////////////

$( '.guzik_menu' ).click( zmiana.pokaz_menu );

$( '.link' ).mouseup( wydarzenie.div_link );

$( '.lupa' ).mouseup( wydarzenie.div_lupa );

$( '.link_select > select' ).change( wydarzenie.select_link );

$( '.post_select > select' ).change( wydarzenie.select_post );

$( '.lista_produktow > ul > li.produkt' ).not( '.pokaz_ustawienia' ).click( wydarzenie.pokaz_produkt );

$( '#PRODUKT > .tresc' ).click( wydarzenie.ukryj_produkt );

$( '#PRODUKT > .tresc *' ).click( dostosuj.stopBubble );

$( '.lista_produktow > ul > li.produkt.pokaz_ustawienia' ).click( wydarzenie.pokaz_ustawienia_produktu );

$( '.lista_produktow > ul > li.produkt.pokaz_ustawienia > .ustawienia > .ukryj_ustawienia' )
  .click( wydarzenie.ukryj_ustawienia_produktu );

$( '.filtry > .lista > div' ).not( '.link' ).click( wydarzenie.zmien_zakladke_filtrow );

$( '.filtry > .lista > div' ).not( '.link' ).children( 'div' ).click( wydarzenie.wyczysc_pojedynczy_filtr );

$( '#TRESC > .BLOK1 > .tresc > .zakladka_blok' ).click( wydarzenie.zmien_zakladke_blokow );

/********* Przesunięcie scrollbara guzikiem *********/
$( '.strzalka > .obrazek, .strzalka > .podpis' ).mouseup( ruch.pozycja_scrollbara );

$( '#BLOK_GLOWNY > div' ).scroll( wydarzenie.dostosuj_naglowek );

////////////////////////////////////////////


