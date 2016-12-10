
import {Constructor_Validator, Types_Veriable} from './validator'

export {Constructor_Validator, Types_Veriable} from './validator'

/////////////////////////////  Prepare checkers  ///////////////////////////////

Constructor_Validator.prototype.types = {};

let create_checker = function(name, callback)
{
	Constructor_Validator.prototype.types[name] = {
		validate: callback
	};
};

/////////////////////////////  Checkers  ///////////////////////////////

create_checker('email', function(value)
{
	let Results = new Types_Veriable(),
	  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	Results.bool = re.test(value);
	if(!Results.bool)
		Results.message = 'It\'s not email.';

	Results.add();

	return Results.get_all();
});


create_checker('password', function(value)
{
	let Results = new Types_Veriable();

	Results.bool = value.length >= 8;
	if(!Results.bool)
		Results.message = 'The password is too short.';

	Results.add();

	return Results.get_all();
});


create_checker('proper_name', function(value)
{
	let Results = new Types_Veriable();

	value = value.charAt(0).toUpperCase() + value.slice(1);

	Results.bool = value.length >= 3;
	if(!Results.bool)
		Results.message = 'The name is too short.';

	Results.correction = value;
	Results.add();

	return Results.get_all();
});


create_checker('length', function(value)
{
	let Results = new Types_Veriable();

	Results.bool = value.length >= 3;
	if(!Results.bool)
		Results.message = 'It\'s too short.';

	Results.add();

	return Results.get_all();
});


create_checker('number', function(value)
{
	let Results = new Types_Veriable();

	value = value.replace(/\s/g, '');

	Results.bool = value.length === 9;
	if(!Results.bool)
		Results.message = 'Number length is 9 digits.';
	Results.add();

	Results.bool = !isNaN(value);
	if(!Results.bool)
		Results.message = 'The number must consist of digits.';
	Results.add();

	return Results.get_all();
});

////////////////////////////////////////////