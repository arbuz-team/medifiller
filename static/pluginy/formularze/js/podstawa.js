/*    JavaScript    */

import {data_controller} from '../../arbuz/js/dane_strony/struktura';
import {content_controller} from '../../tresc/js/podstawa';
export {data_controller} from '../../arbuz/js/dane_strony/struktura';


export let form_controller = new function Form_Controller()
{

  let _prepare_post_data = function( object )
  {
    if( !object )
      return {};

    object.__form__ = 'true';
    object.csrfmiddlewaretoken = data_controller.get( 'csrf_token' );

    return object;
  };


  let _preprocess_url = function( url )
  {
    if( !url )
      url = data_controller.get( 'path' );

    return url;
  };


  this.send = function( url, data_post )
  {
    url = _preprocess_url( url );
    data_post = _prepare_post_data( data_post );

    content_controller.change_content(url, data_post);
  };


/////////////////   SPRAWDZANIE PÓL   ///////////////////

  // let $form
  //   , field_name
  //   , field_value;
  //
  //
  // let _preprocess_post_data = function( object )
  // {
  //   if( !object )
  //     object = {};
  //
  //   object.__istnieje__ = 'true';
  //   object.csrfmiddlewaretoken = data_controller.get( 'csrf_token' );
  //
  //   return object;
  // };

};





