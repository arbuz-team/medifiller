
export let list_configs = {};

list_configs.register = {
	new_username:     'length_3',
	new_password:     'password',
	new_email:        'email_not_in_db',
};

list_configs.login = {
	email:        'email',
	password:     'password',
};

list_configs.user_address = {
  full_name:        'full_name',
  address_line_1:   'no_empty',
  city:             'proper_name',
  region:           'proper_name',
  postcode:         'no_empty',
  country:          'proper_name',
};

list_configs.forgot_password = {
  email:      'email',
};

list_configs.email_contact = {
  client:     'proper_name',
  email:      'email',
  message:    'no_empty',
};