/**
 * Created by mrskull on 24.11.16.
 */

import * as ground_controllers from '../../ground/js/controllers';


/**
 *    Defining private functions
 */

  let prepare_post_data = function(form_name, object)
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
    data_post = prepare_post_data(form_name, data_post);
    ground_controllers.change_content(url, data_post);
  };






