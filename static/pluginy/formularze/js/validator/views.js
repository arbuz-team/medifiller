
import {Constructor_Validator} from './checkers'

let Validators = {};

window.Validators = Validators;

export let define = function()
{

	$('form[data-test=yes]').each(function(){
		let name = $(this).attr('data-form');
		if(name)
    {
      if(typeof Validators[name] === 'undefined')
        Validators[name] = new Constructor_Validator(name);
    }
    else
      console.error( 'Validation Error: Incorrect or empty form name "' + name + '".' );
	});


  $('form[data-test=yes] .test').keyup(validate)
    .change(validate);


  $('.show_password').change(function(){
    if($(this).is(':checked'))
      show_password(this);
    else
      hide_password(this);
  });

};



//////////////////////////////   VIEWS VALIDATOR   ///////////////////////////////////

let running_validator = false,
  form_name,
  Validator,
  field,
  field_name,
  field_value;

let validate = function()
{
  if(running_validator === false)
  {
    running_validator = true;

    field = this;
    form_name = $(field).parents('form').data('form');
    Validator = Validators[form_name];
    field_name = $(field).attr('name');
    field_value = $(field).val();

    Validator.field(field_name, field_value, show_status);
  }
};


let show_status = function(result)
{
  if(result)
  {
    let $field = $(field),
      $status = $field.parent().find('.status');

    let bool = result.bool,
      message = result.message,
      correction = result.correction;

    Validator.change_status_field(field_name, bool);

    if($field.val() != correction && typeof correction !== 'undefined' && correction !== '')
      $field.val(correction);

    if(bool)
    {
      $field.removeClass('form_error');
      $status.html('').fadeOut(200);
    }
    else if(typeof message === 'undefined')
    {
      $field.addClass('form_error');
      $status.html('').fadeOut(200);
    }
    else
    {
      $field.addClass('form_error');
      $status.html(message).fadeIn(200);
    }
  }

  let test_form = Validator.check_list_field();
  change_status_blockade(test_form);

  running_validator = false;
};


let change_status_blockade = function(test_form)
{
  if(typeof test_form === 'boolean')
  {
    let $form = $('form[data-form='+ form_name +']'),
      $button = $form.find('*[type=submit]');

    if(test_form)
      $button.prop('disabled', false);
    else
      $button.prop('disabled', true);
  }
};


//////////////////////////////   VIEWS - SHOW/HIDE PASSWORD   ///////////////////////////////////

let show_password = function(checker)
{
  let $checker = $(checker),
    $field = $checker.parent().find('input[name=password]');
  $field.attr('type', 'text');
};


let hide_password = function(checker)
{
  let $checker = $(checker),
    $field = $checker.parent().find('input[name=password]');
  $field.attr('type', 'password');
};