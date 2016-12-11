/*    JavaScript    */

import {data_controller} from '../../arbuz/js/dane_strony/struktura';
import {content_controller} from '../../tresc/js/podstawa';
export {data_controller} from '../../arbuz/js/dane_strony/struktura';


export let form_controller = new function Form_Controller()
{

  let _prepare_post_data = function(form_name, object)
  {
    if(!object)
      return {};

    object.__form__ = form_name;

    return object;
  };


  this.send = function(form_name, url, data_post)
  {
    data_post = _prepare_post_data(form_name, data_post);
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





