/**
 * Created by mrskull on 29.12.16.
 */


export let

  settings = {
    url: '/dialog/'
  },


  variables = {
    post_data: {}
  },


  selectors = {
    container: '#DIALOGUE_WINDOW',
  };

selectors.window =            selectors.container +'> .window';
selectors.header =            selectors.window +'> .window-header';
selectors.content =           selectors.window +'> .window-content';
selectors.internal_buttons =  selectors.content +' button.dialog-button';
selectors.external_buttons =  'button.dialog-button';

export let

  window_data = {
    type: '',
    name: '',
    title: '',
    content: '',
    post_data: {}
  },


  prepare_post_data = function()
  {
    variables.post_data = {};

    variables.post_data.__dialog__ = window_data.type;
    variables.post_data.name = window_data.name;
  },


  download_content = function(callback)
  {
    prepare_post_data();
    window.APP.http_request(settings.url, variables.post_data, callback)
  };
