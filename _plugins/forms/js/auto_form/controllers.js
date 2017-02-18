/**
 * Created by mrskull on 17.01.17.
 */

import {Auto_Form_Views} from './views'


let
  add_event_on_fields = function(auto_form_views)
  {
    let
      settings = auto_form_views.models.settings,
      $field;

    settings.fields.each(function()
    {
      $field = $(this);

      if($field.is(':checkbox'))
        $field.change(auto_form_views.send_checkbox);

      else if($field.is(':text'))
        $field
          .change(auto_form_views.send_default)
          //.keyup(auto_form_views.send_on_key_up)
          .keydown(auto_form_views.send_on_enter);

      else if($field.is('select'))
        $field.change(auto_form_views.send_default);
    });
  },


  do_nothing = function(event)
  {
    event.preventDefault();
    return false;
  };


export let define = function($container)
{
  let
    $forms = $('form.auto_form, .auto_form form', $container);

  $forms.each(function()
  {
    let
      $form = $(this),
      config = {
        form:     $form,
        fields:   $('.auto_field', $form),
      },
      auto_form_views = new Auto_Form_Views(config);

    $form.submit(do_nothing);
    add_event_on_fields(auto_form_views);
  });
};