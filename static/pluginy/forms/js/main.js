/**
 * Created by mrskull on 24.11.16.
 */

import * as content_controller from '../../ground/js/view';


/**
 *    Defining private functions
 */

  let _prepare_post_data = function(form_name, object)
  {
    if(!object)
      object = {};

    object.__form__ = form_name;

    return object;
  };


/**
 *    Defining public functions
 */

  export let send = function(form_name, url, data_post)
  {
    // data_post = _prepare_post_data(form_name, data_post);
    // content_controller.change_content(url, data_post);
  };






