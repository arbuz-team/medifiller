/**
 * Created by mrskull on 17.01.17.
 */

import {data_controller} from '../../../arbuz/js/structure'


export let Auto_Form_Models = function(config)
{
  let that = this;

  this.settings = {
    form: undefined,
    fields: undefined,

    action: undefined,
    origin: undefined,
    target: undefined,
  };

  let load_settings = function()
  {
    if(typeof config !== 'undefined')
    {
      // -- Form
      if(typeof config.form !== 'undefined')
      {
        that.settings.form = config.form;

        let $form = that.settings.form;
        that.settings.action = $form.attr('action');
        that.settings.origin = $form.data('origin');
        that.settings.target = $form.data('target');
      }


      // -- Fields
      if(typeof config.fields !== 'undefined')
        that.settings.fields = config.fields;
    }
  };

  load_settings();

/////////////////////////

};