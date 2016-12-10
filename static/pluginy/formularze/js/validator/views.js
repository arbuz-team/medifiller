
import {Constructor_Validator} from './checkers'

let Validators = {};

export let define = function(){

	$('form[data-test=yes]').each(function(){
		let name = $(this).data('form');
		if(name)
    {
      if(typeof Validators[name] === 'undefined')
        Validators[name] = new Constructor_Validator(name);
    }
    else
      console.error('Validation Error: Incorrect or empty form name "'+ name +'".')
	});


  $('form[data-test=yes] .test').keyup(function(){
    validate(this);
  });


  $('.show_password').change(function(){
    if($(this).is(':checked'))
      show_password(this);
    else
      hide_password(this);
  });

};



//////////////////////////////   VIEWS VALIDATOR   ///////////////////////////////////

let validate = function(field)
{
  let form_name = $(field).parents('form').data('form'),
    Validator = Validators[form_name],
    name = $(field).attr('name'),
    value = $(field).val(),
    results = Validator.field(name, value),
    test_form = Validator.check_list_field();

  show_status(field, results);
  change_status_blockade(form_name, test_form);
};


let show_status = function(field, result)
{
  if(result)
  {
    let $field = $(field),
      $status = $field.parent().find('.status');

    let bool = result.bool,
      message = result.message,
      correction = result.correction;

    if($field.val() != correction && correction != '' && correction )
      $field.val(correction);

    if( bool )
    {
      $field.removeClass('form_error');
      $status.html(message).fadeOut(200);
    }
    else
    {
      $field.addClass('form_error');
      $status.html(message).fadeIn(200);
    }
  }
};


let change_status_blockade = function(form_name, test_form)
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