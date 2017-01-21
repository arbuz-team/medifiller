/**
 * Created by mrskull on 29.12.16.
 */


export let

  settings = {
    url: '/dialog/'
  },


  variables = {
    type: '',
    name: '',
    content: '',
  },


  selectors = {
    container: '#DIALOG',
  };

selectors.window =            selectors.container +' > .dialog';
selectors.header =            selectors.window +' > .dialog-header';
selectors.content =           selectors.window +' > .dialog-content';
selectors.external_buttons =  'button.dialog_button';
