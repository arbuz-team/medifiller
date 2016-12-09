/**
 * Created by mrskull on 24.11.16.
 */

import {EVENTS} from '../kreator_wydarzen';
export {EVENTS} from '../kreator_wydarzen';

/*---------------- Struktura Dane_Strony ----------------*/

let Data_Controller = function()
{
  let private_data,
      public_data;

  this.reset = function()
  {
    private_data = {
      protocol : location.protocol,
      host_name : location.hostname,
      all_hosta_name : location.host,
      port : location.port,
      domena : location.protocol +'://'+ location.host,
      path : location.pathname,
      all_url : location.href,
      history : [],
      csrf_token : $( 'input[ name=csrfmiddlewaretoken ]').val() || '',
    };

    public_data = {
      url_to_change : '',
      page_name : 'Spasungate',
      title : 'Loading... - Spasungate',
      description : 'This page is shop, which is ownership Spasungate.',
      statement_content : 'Empty statement.',
      container : '#TRESC',
      post_data : {},
    };
  };

  this.reset();


  this.get = function( name )
  {
    if( typeof  private_data[ name ] !== 'undefined' )
      return private_data[ name ];

    else if( typeof public_data[ name ] !== 'undefined' )
        return public_data[ name ];
      else
      {
        console.warn( 'Wrong call! Veriable with this name doesn\'t exist.' );
        console.trace();
      }
  };


  this.change = function( name, wartosc )
  {
    if( typeof public_data[ name ] !== 'undefined' )
      public_data[ name ] = wartosc;
    else if( typeof private_data[ name ] !== 'undefined' )
    {
      console.warn( 'Wrong call! Veriable with this name doesn\'t exist.' );
      console.trace();
    }
    else
    {
      console.warn( 'Wrong call! Veriable with this name doesn\'t exist.' );
      console.trace();
    }
  };


  this.change_much = function( object )
  {
    for( let name in object )
      if( object.hasOwnProperty( name ) )
      {
        if( name === 'title' )
        {
          if( object[ name ] !== '' )
            this.change( name, object[ name ] +' - '+ public_data.page_name );
          else
            this.change( name, public_data.page_name );
        }
        else
          this.change( name, object[ name ] );
      }
  };


  this.prepare_url_to_change = function()
  {
    if( public_data.url_to_change !== '' )
      return public_data.url_to_change;
    else
      return '/';
  };

};

let data = new Data_Controller();

export { data as data_controller }
