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
    container: '#DIALOG',
  };

selectors.window =            selectors.container +' > .dialog';
selectors.header =            selectors.window +' > .dialog-header';
selectors.content =           selectors.window +' > .dialog-content';
selectors.internal_buttons =  selectors.content +' button.dialog_button';
selectors.external_buttons =  'button.dialog_button';

export let

  window_data = {
    type: '',
    name: '',
    content: '',
    external_data: {}
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
