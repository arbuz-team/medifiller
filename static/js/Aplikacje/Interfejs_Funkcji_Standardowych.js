/*    JavaScript    */


/*---------------- Interfejs funkcji standardowych ----------------*/

"use strict"; 


Object.prototype.Dziedzicz_Po = function( rodzic )
{
  var dziecko = function() {};
  dziecko.prototype = rodzic;
  return new dziecko();
}


Function.prototype.Dodaj_Metode = function( nazwa, funkcja )
{
  this.prototype[ nazwa ] = funkcja;
  return this;
}


/*
Function.method( 'inherits', function( Parent )
{
  this.prototype = new Parent();
  return this;
})
*/
