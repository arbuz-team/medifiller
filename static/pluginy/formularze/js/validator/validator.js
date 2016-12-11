
import {list_configs} from './config'
import {data_controller} from '../../../arbuz/js/dane_strony/struktura';

//////////////////////////////////////////////////////

export let checker = {

  create_checker : function(name, callback)
  {
    Constructor_Validator.prototype.types[name] = {
      validate: callback
    };
  },


  check_condition : function(condition)
  {
    return !condition;
  },


  create_result : function(correction)
  {
    let result = {
      bool: true
    };

    if(typeof correction !== 'undefined')
      result.correction = correction;

    return result;
  },


  create_error : function(message, correction)
  {
    let result = {
      bool: false
    };

    if(typeof message !== 'undefined')
      result.message = message;

    if(typeof correction !== 'undefined')
      result.correction = correction;

    return result;
  },


  exist_in_db : function(name, value, callback, message)
  {
    if(name && value)
    {
      let post_data = {
        __exist__: name,
        value: value,
        csrfmiddlewaretoken: data_controller.get('csrf_token')
      };

      $.post('', post_data)
      .done(function(data){
        if(data.__exist__ !== 'undefined')
          if(data.__exist__ === 'true')
            callback( checker.create_error(message) );
          else if(data.__exist__ === 'false')
            callback( checker.create_result() );
      })
      .fail(function(err) {
        console.error( err );
      });
    }
  },
};



//////////////////////////////////////////////////////

export let Constructor_Validator = function(form_name)
{
  // define base veriable

  let fields_of_form;
  this.types = Constructor_Validator.prototype.types;
	this.config = list_configs[form_name];


	// definitions function
	
	this.change_status_field = function(name, value)
	{
		if(typeof fields_of_form[name] === 'boolean')
			if(typeof value === 'boolean')
				fields_of_form[name] = value;
			else
				console.error('Validation Error: Invalid value in the field '+ value +'.');
		else
      console.error('Validation Error: No manual for the field '+ name +'.');
	};
	
	this.check_list_field = function()
	{
		for( let key in fields_of_form )
		  if(fields_of_form.hasOwnProperty( key ))
        if(fields_of_form[key] === false )
          return false;
		
		return true;
	};

  let prepare_list_fields = function(form)
  {
    let fields = $(form).serializeArray(),
      obj = {},
      i,
      length = fields.length;
    for( i = 0; i < length; ++i )
      if($(form).find('*[name='+ fields[i].name +']').hasClass('test'))
        obj[fields[i].name] = false;

    return obj;
  };

  fields_of_form = prepare_list_fields($('form[data-form='+ form_name +']'));
	
////////////////////////////////////////////////////
	
	this.field = function(name, value, callback)
	{
		let results = [];

		if(name && value)
		{
			let type, checker;
		
			type = this.config[name];
			checker = this.types[type];
			
			if(!checker)
				throw {
					name: 'Validation Error',
					message: 'No manual for the key '+ name +'.'
				};
			
			checker.validate(value, callback);
		}
		else if(value !== '')
		{
		  results = checker.create_error('Incorrect value '+ name);
      callback(results);
		}
		else
      callback( checker.create_error() );
	};


  this.hasErrors = function()
  {
    return fields_of_form;
  };

};