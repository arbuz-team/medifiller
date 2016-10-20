/*    JavaScript    */

"use strict"; 

/*********************** ZMIANA ***********************/

var zmiana = (function()
{

  function zmniejsz_naglowek()
  {
    var $naglowek = $( '#NAGLOWEK > div' )

      , wysokosc_naglowka = parseInt( $naglowek.parent().css( 'max-height' ) )
      , wysokosc_rzeczywista = $naglowek.outerHeight()

    if( wysokosc_naglowka == wysokosc_rzeczywista && wysokosc_rzeczywista != 70 )
    {
      var $pole_menu = $naglowek.children( '.menu' )
        , $wyszukiwarka = $naglowek.children( '.wyszukiwarka' )
        , $logo = $naglowek.children( '.tytul' )
        , $after = $logo.children()
      
        , logo_wysokosc = wysokosc_naglowka - 30
        , logo_szerokosc = logo_wysokosc * ($logo.outerWidth() / wysokosc_naglowka)
        , after_wysokosc = wysokosc_naglowka - 30
        , after_szerokosc = after_wysokosc * ($after.outerWidth() / wysokosc_naglowka)

      $naglowek.height( wysokosc_naglowka - 30 );
      $pole_menu.css({ 'position' : 'relative', 'top' : '-30px' });
      $wyszukiwarka.css({ 'position' : 'relative', 'top' : '-30px' });

      $logo.height( logo_wysokosc )
           .width( logo_szerokosc );
      $after.height( after_wysokosc )
            .width( after_szerokosc )
            .css( 'background-size', logo_szerokosc +'px auto' )
            .css( 'left', logo_szerokosc );
    }
  }



  function zwieksz_naglowek()
  {
    var $naglowek = $( '#NAGLOWEK > div' )

      , wysokosc_naglowka = parseInt( $naglowek.parent().css( 'max-height' ) )
      , wysokosc_rzeczywista = $naglowek.outerHeight()

    if( wysokosc_naglowka != wysokosc_rzeczywista && wysokosc_naglowka != 70 )
    {
      var $pole_menu = $naglowek.children( '.menu' )
        , $wyszukiwarka = $naglowek.children( '.wyszukiwarka' )
        , $logo = $naglowek.children( '.tytul' )
        , $after = $logo.children()

      $naglowek.height( '' );
      $pole_menu.css( 'top', '' );
      $wyszukiwarka.css( 'top', '' );

      $logo.height( '' )
           .width( '' );
      $after.height( '' )
            .width( '' )
            .css( 'background-size', '' )
            .css( 'left', '' );
    }
  }



  function przelacznik_zakladek_filtry( element, numer )
  {
    var $filtry = $(element)
      , $lista = $filtry.children( '.lista' )
      , $zakladki = $filtry.children( '.zakladka' )

    $lista.children( '.wybrana' ).removeClass( 'wybrana' );
    $lista.children( '[data-numer="'+ numer +'"]' ).addClass( 'wybrana' );
    
    $filtry.children( '.zakladka.wybrana' ).removeClass( 'wybrana' ).fadeOut(200, function() 
    {
      $filtry.children( '.zakladka_' + numer ).fadeIn(200, function()
      {

        autosize.update( $( 'textarea' ) );
      
      }).addClass( 'wybrana' );
    });
  }



  function przelacznik_zakladek_bloki( numer )
  {
    var numer = parseInt(numer)
      , $kliknieta = $( '.BLOK1 > .tresc > .zakladka_blok[data-numer='+ numer +']' )
      , $wybrany_blok = $( '.BLOK2 > .tresc.blok'+ numer )
      , $lista_zakladek = $( '.BLOK1 > .tresc' )

    $lista_zakladek.children( '.wybrana' ).removeClass( 'wybrana' );
    $lista_zakladek.children( '[data-numer="'+ numer +'"]' ).addClass( 'wybrana' );
    
    $( '.BLOK2 > .tresc.wybrana' ).removeClass( 'wybrana' ).fadeOut(200, function() 
    {
      $wybrany_blok.fadeIn(200, function()
      {

        autosize.update( $( 'textarea' ) );
      
      }).addClass( 'wybrana' );
    });
  }



  function pokaz_produkt( dane, plynnosc )
  {
    var $produkt = $( '#PRODUKT' )
      , $tresc = $produkt.find( '.tresc div:first-child' )
      , $tabela = $tresc.children( '.tabela' )
      , certyfikaty = ''
      , zagrozenia = ''
      , zawody = ''
    

    for( var x in dane.certyfikaty )
      certyfikaty = certyfikaty +'<div>'+ dane.certyfikaty[x] +'</div>';
    
    for( var x in dane.zagrozenia )
      zagrozenia = zagrozenia +'<div class="piktogram" title="'+ dane.zagrozenia[x] +'" style="background-image: url(/static/img/zagrozenia/'+ ( parseInt( x ) + 1 ) +'.png)"></div>';
    
    for( var x in dane.zawody )
      zawody = zawody +'<div class="piktogram" title="'+ dane.zawody[x] +'" style="background-image: url(/static/img/zawody/'+ ( parseInt( x ) + 1 ) +'.png)"></div>';

      
    $tresc.children( '.producent' ).html( dane.producent );
    $tresc.children( '.nazwa' ).html( dane.nazwa );
    $tresc.find( '.zdjecie > img' ).attr( 'src', dane.zdjecie ).attr( 'alt', dane.nazwa );

    $tabela.find( '.opis > div' ).eq(1).html( dane.opis );
    $tabela.find( '.kolor > div' ).eq(1).html( dane.kolor );
    $tabela.find( '.rozmiar > div' ).eq(1).html( dane.rozmiar );

    $tabela.find( '.certyfikaty > div' ).eq(1).html( certyfikaty );
    $tabela.find( '.zagrozenia > div' ).eq(1).html( zagrozenia );
    $tabela.find( '.zawody > div' ).eq(1).html( zawody );

    $tabela.children().removeClass( 'wypelniony' );

    $tabela.find( 'div > div:nth-child(2)' ).each(function()
    {
      if( $(this).html() != '' )
        $(this).parent().addClass( 'wypelniony' );
    });

    if( plynnosc )
      $produkt.addClass( 'pelny' ).fadeIn(300).children( '.tresc' ).scrollTop( '0px' );
    else
    {
      $produkt.addClass( 'pelny' ).show();
      zmiana.ukryj_ladowanie();
    }
  }



  function ukryj_produkt( dane )
  {
    var $produkt = $( '#PRODUKT' );
    
    $produkt.removeClass( 'pelny' ).fadeOut(200);
  }



  function pokaz_menu()
  {
    var $menu = $( '#MENU' );

    $menu.children( '.nakladka' ).fadeIn(100);
    $menu.animate({ right : '0px' }, 200, function()
    {
      $( '#MENU > .nakladka' ).click(function ()
      {
        zmiana.ukryj_menu();
      });
    });
  }



  function ukryj_menu()
  {
    var $menu = $( '#MENU' );

    $menu.children( '.nakladka' ).fadeOut(100);
    $menu.animate({ right : '-250px' }, 200);
  }



  function ukryj_ladowanie()
  {
    var $body = $( '#BLOK_GLOWNY' );

    $body.fadeIn(300);

    autosize( $( 'textarea' ) );
    autosize.update( $( 'textarea' ));
    dostosuj.wysokosc_strony();
    dostosuj.strone_do_scrollbara();
  }



  function pokaz_ustawienia_produktu(numer_produktu)
  {
    var $produkt = $( '.lista_produktow > ul > li.produkt.pokaz_ustawienia[data-numer='+ numer_produktu +']' )

    $produkt.children( '.obrazek' ).fadeOut(200, function()
    {
      $produkt.children( '.ustawienia' ).fadeIn(200);
    });
  }



  function ukryj_ustawienia_produktu(numer_produktu)
  {
    var $produkt = $( '.lista_produktow > ul > li.produkt.pokaz_ustawienia[data-numer='+ numer_produktu +']' )

    $produkt.children( '.ustawienia' ).fadeOut(200, function()
    {
      $produkt.children( '.obrazek' ).fadeIn(200);
    });
  }



  var udostepnione = 
  {
    zmniejsz_naglowek : zmniejsz_naglowek
    , zwieksz_naglowek : zwieksz_naglowek
    , przelacznik_zakladek_filtry : przelacznik_zakladek_filtry
    , przelacznik_zakladek_bloki : przelacznik_zakladek_bloki
    , pokaz_produkt : pokaz_produkt
    , ukryj_produkt : ukryj_produkt
    , pokaz_menu : pokaz_menu
    , ukryj_menu : ukryj_menu
    , ukryj_ladowanie : ukryj_ladowanie
    , pokaz_ustawienia_produktu : pokaz_ustawienia_produktu
    , ukryj_ustawienia_produktu : ukryj_ustawienia_produktu
  }

  return udostepnione;
})();

