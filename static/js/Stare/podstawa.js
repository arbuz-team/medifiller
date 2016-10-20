/*    JavaScript    */

"use strict"; 




// rozmiary tapety */

(function()
{
  var adres_tapety = $( '#TRESC > .BLOK1 > .tlo' ).css( 'background-image' );

  if( adres_tapety != 'none' )
  {
    adres_tapety = adres_tapety.replace( 'url("', '' ).replace( '")', '' );

    pobierz.wymiary_grafiki(adres_tapety);
  }
}());



// Wybierz filtr */

(function()
{
  var numer_filtra = parseInt( $( '#FILTRY .lista > span' ).html() );

  if( numer_filtra )
  {
    zmiana.przelacznik_zakladek_filtry( '#FILTRY', numer_filtra );

    $( '#FILTRY .zakladka_'+ numer_filtra +' .focus' ).focus();
  }
}());



//window.onpopstate = ruch.sprawdz_cofnij(event);

window.onpopstate = function(event) {
  ruch.sprawdz_cofnij( document.location, JSON.stringify(event.page) );
};



$(window).resize(function()
{
  dostosuj.wysokosc_strony();
  dostosuj.strone_do_scrollbara();

  var szerokosc_strony = parseInt( $(window).width() ); 

  if( szerokosc_strony < 870 )
    zmiana.zmniejsz_naglowek();
});


