
import {list_configs} from './config'

export let Constructor_Validator = function(form_name)
{
	this.types = Constructor_Validator.prototype.types;
	this.config = list_configs[form_name];
	let that = this;
	
////////////////////////////////////////////////////
	
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
	
	this.change_field = function(name, value)
	{
		if(typeof fields_of_form[name] === 'boolean')
			if(typeof value === 'boolean')
				fields_of_form[name] = value;
			else
				throw {
					name: 'Validation Error',
					message: 'Invalid value in the field '+ value +'.'
				};
		else
			throw {
				name: 'Validation Error',
				message: 'No manual for the field '+ name +'.'
			};
	};
	
	this.check_list_field = function()
	{
		for( let key in fields_of_form )
		  if(fields_of_form.hasOwnProperty( key ))
        if(fields_of_form[key] === false )
          return false;
		
		return true;
	};
	
	let fields_of_form = prepare_list_fields($('form[data-form='+ form_name +']'));
	
////////////////////////////////////////////////////
	
	this.hasErrors = function()
	{
		return fields_of_form;
	};
	
	this.field = function(name, value)
	{
		let last_result = false, results = [];

		if(name && value)
		{
			let msg, type, checker;
			
			this.messages = [];
		
			type = this.config[name];
			checker = this.types[type];
			
			if(!checker)
				throw {
					name: 'Validation Error',
					message: 'No manual for the key '+ name +'.'
				};
			
			results = checker.validate(value);
		}
		else if(value != '')
		{
			let Results = new Types_Veriable();
			Results.bool = false;
			Results.message = "Incorrect value "+ name;
			Results.add();
			results = Results.get_all();
		}
		else
			results = false;
		//////////////////////////////////
		
		if(results)
		{
			for( let i = 0; i < results.length; ++i )
				if(results[i].bool === false)
					last_result = results[i];
			
			if(!last_result)
				last_result = results[results.length - 1];
			
			this.change_field(name, last_result.bool);
		}
		else
			this.change_field(name, false);

		return last_result;
	};
};

/////////////////////////////////////////////////////////////////////

export let Types_Veriable = function()
{
  let array_result = [];
  this.bool = true;
  this.message = '';
  this.correction = '';

  this.add = function()
  {
    let object = {
      bool: this.bool,
      message: this.message,
      correction: this.correction
    };

    array_result.push( object );

    return true;
  };

  this.get_all = function()
  {
    return array_result;
  };
};