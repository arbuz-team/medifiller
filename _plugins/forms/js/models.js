/**
 * Created by mrskull on 21.01.17.
 */


export let Form_Models = function(content_loader_controllers)
{

  /**
   *    Defining settings
   */

  this.loader_controllers = content_loader_controllers;

  this.variables = {
    name: undefined,
  };


  /**
   *    Defining private functions
   */

  let prepare_post_data = function(form_name, object)
  {
    if(!object)
      object = {};

    object.__form__ = form_name;

    return object;
  };


  /**
   *    Defining public functions
   */

  this.send = function(form_name, url, data_post)
  {
    data_post = prepare_post_data(form_name, data_post);

    console.log(data_post);

    if(typeof this.loader_controllers !== 'undefined')
      this.loader_controllers.load(url, data_post);
    else
      console.error('Valid config object.');
  };

};