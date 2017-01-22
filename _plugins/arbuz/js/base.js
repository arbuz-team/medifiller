/*    JavaScript    */


/*---------------- Interfejs funkcji standardowych ----------------*/

/**
 *    Defining global veriables
 */

window.APP = {};
window.APP.DATA = {};


/**
 *    Defining global functions
 */

APP.add_own_event = function add_own_event(name, callback)
{
  window.removeEventListener(name, callback, false);
  window.addEventListener(name, callback, false);
};

APP.throw_event = function throw_event(event)
{
  window.dispatchEvent(event);
};


$.prototype.add_data = function add_data(name, value)
{
  $(this).attr('data-'+ name, value);
  $(this).data(name, value);
  return this;
};

$.prototype.change_data = function change_data(name, value)
{
  $(this).add_data(name, value);
  return this;
};


$.prototype.delete_data = function delete_data(name)
{
  $(this).removeAttr('data-'+ name);
  $(this).removeData(name);
  return this;
};


$.prototype.serialize_object = function()
{
  let
    fields = $( this ).serializeArray(),
    form_object = {};

  $.each( fields , function( i, field )
  {
    form_object[ field.name ] = field.value;
  });

  return form_object;
};


Array.prototype.delete_empty = function delete_empty()
{
  let url_array = [];
  
  for(let j = 0, i = 0; this.length > i; i++)
  {
    if(this[ i ])
    {
      url_array[ j ] = this[ i ];
      j++;
    }
  }
  return url_array;
};
