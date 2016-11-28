/*    JavaScript    */


/*---------------- Interfejs funkcji standardowych ----------------*/


/*Object.prototype.Dziedzicz_Po = function( rodzic )
{
  var dziecko = function() {};
  dziecko.prototype = rodzic;
  return new dziecko();
}*/

Function.prototype.Dodaj_Metode = function( nazwa, funkcja )
{
  this.prototype[ nazwa ] = funkcja;
  return this;
};


$.prototype.Dodaj_Dane = function( nazwa, wartosc )
{
  $( this ).attr( 'data-'+ nazwa, wartosc );
  $( this ).data( nazwa, wartosc );
  return this;
};


$.prototype.Usun_Dane = function( nazwa )
{
  $( this ).removeAttr( 'data-'+ nazwa );
  $( this ).removeData( nazwa );
  return this;
};


Array.prototype.Usun_Puste = function()
{
  var tablica_adresu = [];
  
  for( var j = 0, i = 0; this.length > i; i++ )
  {
    if( this[ i ] )
    {
      tablica_adresu[ j ] = this[ i ];
      j++;
    }
  }

  return tablica_adresu;
};


/*
Function.Dodaj_Metode( 'inherits', function( Parent )
{
  this.prototype = new Parent();
  return this;
})
*/
