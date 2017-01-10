/**
 * Created by mrskull on 24.11.16.
 */

import * as ground_controller from '../../ground/js/controllers';


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
    data_post = _prepare_post_data(form_name, data_post);
    ground_controller.start(url, data_post);
  };






