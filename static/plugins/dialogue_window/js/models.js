/**
 * Created by mrskull on 29.12.16.
 */

export let
  selectors = {
    container: '#DIALOGUE_WINDOW',
    dialogue_window: '#DIALOGUE_WINDOW > .window',
    header: '#DIALOGUE_WINDOW > .window > .window-header',
    content: '#DIALOGUE_WINDOW > .window > .window-content',
    submit: 'button.submit_secure'
  },

  open_events = {
    alert: 'open_alert',
    prompt: 'open_prompt',
    confirm: 'open_confirm'
  },

  window_data = {
    type: '',
    name: '',
    title: '',
    content: '',
    post_data: {}
  },

  html = {
    part: {
      begining: '<div class="window-content-part otoczka_pola">',
      ending: '</div>'
    },


    alert_content: {
      admission: '',
      ending: '<button>Ok</button>'
    },


    prompt_content: {
      admission: '',
      form: '<input type="password" name="password" placeholder="password" />',
      ending: '<button class="dialog-button" data-name="cancel">Cancel</button><button class="dialog-button" data-name="ok">Ok</button>'
    },


    confirm_content: {
      admission: '',
      ending: '<button>Ok</button><button>Cancel</button>'
    }
  };