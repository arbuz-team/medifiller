/*    JavaScript    */


/*---------------- Sprawdz ----------------*/

"use strict"; 


var Sprawdz = (function()
{


  var Czy_Rowne = function( wartosc_1, wartosc_2 )
  {
    if( wartosc_1 === wartosc_2 )
      return true;
    else
      return false;
  }


  var Czy_Nie_Rowne = function( wartosc_1, wartosc_2 )
  {
    if( wartosc_1 === wartosc_2 )
      return false;
    else
      return true;
  }


  var Czy_Istnieje_Element = function( id )
  {
    if( $( id ).length )
      return true;
    else
      return false;
  }


  var Czy_Nie_Istnieje_Element = function( id )
  {
    if( Czy_Istnieje_Element( id ) )
      return false;
    else
      return true;
  }


  var Czy_Tablica = function( tablica )
  {
    if( tablica && Array.isArray( tablica ) )
      return true;
    else
      return false;
  }


  var Czy_Nie_Tablica = function( tablica )
  {
    if( tablica && Array.isArray( tablica ) )
      return false;
    else
      return true;
  }


  var Atrybut_Data = function( element, nazwa, wartosc )
  {
    if( Czy_Istnieje_Element( element ) )
    {
      if( $( element ).data( nazwa ) === wartosc )
        return true;

      else
        return false;
    }
    else
    {
      return false;
    }
  }

//------------------------------------------

  var udostepnione = 
  {
    Czy_Istnieje_Element : Czy_Istnieje_Element
    , Czy_Nie_Istnieje_Element : Czy_Nie_Istnieje_Element
    , Czy_Rowne : Czy_Rowne
    , Czy_Nie_Rowne : Czy_Nie_Rowne
    , Czy_Tablica : Czy_Tablica
    , Czy_Nie_Tablica : Czy_Nie_Tablica
    , Atrybut_Data : Atrybut_Data
  }

  return udostepnione;
})();


