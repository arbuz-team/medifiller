/**
 * Created by mrskull on 20.12.16.
 */

import {data_controller} from './structure'

// ---- defining private functions

let send_post_preprocess_url = function( response_url )
{
  if( response_url )
    return response_url;
  else
    return data_controller.get( 'path' );
};


let send_post_prepare = function(post_data)
{
  if(!post_data)
    post_data = {};

  post_data[data_controller.get_crsf('name')] = data_controller.get_crsf('value');

  return post_data;
};

// ---- defining global functions

window.APP.send_post = function(url, data_post, callback)
{
  url = send_post_preprocess_url(url);
  data_post = send_post_prepare(data_post);

  $.post(url, data_post)
    .always(callback);
};