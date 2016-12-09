/*    JavaScript    */


/*---------------- Interfejs funkcji standardowych ----------------*/


/*Object.prototype.Dziedzicz_Po = function( rodzic )
{
  var dziecko = function() {};
  dziecko.prototype = rodzic;
  return new dziecko();
}*/

Function.prototype.add_method = function( name, callback )
{
  this.prototype[ name ] = callback;
  return this;
};


$.prototype.add_data = function( name, value )
{
  $( this ).attr( 'data-'+ name, value );
  $( this ).data( name, value );
  return this;
};


$.prototype.delete_data = function( name )
{
  $( this ).removeAttr( 'data-'+ name );
  $( this ).removeData( name );
  return this;
};


Array.prototype.delete_empty = function()
{
  let url_array = [];
  
  for( let j = 0, i = 0; this.length > i; i++ )
  {
    if( this[ i ] )
    {
      url_array[ j ] = this[ i ];
      j++;
    }
  }

  return url_array;
};


/*
Function.Dodaj_Metode( 'inherits', function( Parent )
{
  this.prototype = new Parent();
  return this;
})
*/
