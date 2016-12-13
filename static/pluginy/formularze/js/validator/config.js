
export let list_configs = {};

list_configs.register = {
	username: 'length_3',
	password: 'password',
	email: 'email_db',
};

list_configs.login = {
	email: 'email',
	password: 'password',
};

list_configs.user_address = {
  full_name : 'full_name',
  address_line_1 : 'no_empty',
  city : 'proper_name',
  region : 'proper_name',
  postcode : 'no_empty',
  country : 'proper_name',
};