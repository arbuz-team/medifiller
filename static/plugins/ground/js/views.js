/**
 * Created by mrskull on 09.01.17.
 */

import {data_controller} from '../../arbuz/js/structure'


export let
  change_url = function(url)
  {
    history.pushState('', url, url);
  },


  load_header_page = function(object)
  {
    data_controller.change_much({
      title: object.title,
      description: object.description
    });

    $('title').html(data_controller.get('title'));
    $('meta[ name="description" ]').attr('content', data_controller.get('description'));
  };