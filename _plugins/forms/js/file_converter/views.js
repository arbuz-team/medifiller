/**
 * Created by mrskull on 23.01.17.
 */

import * as image_convert_models from './models'


export let

  models = image_convert_models,
  settings = models.settings,


  get_base64 = function(file, done_callback, error_callback)
  {
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function(){
      done_callback(reader.result);
    };
    reader.onerror = function(error){
      error_callback(error);
    };
  },


  create_convert_done = function(field)
  {
    return function(result)
    {
      let hidden_input = settings.input_base64.start + field.name + settings.input_base64.end;

      $(hidden_input).val(result);
    };
  },


  create_convert_error = function(field)
  {
    return function(error)
    {
      console.log(field);
      console.log(error);
    };
  };