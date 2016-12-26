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

$.prototype.add_data = function(name, value)
{
  $(this).attr('data-'+ name, value);
  $(this).data(name, value);
  return this;
};

$.prototype.change_data = function(name, value)
{
  $(this).add_data(name, value);
  return this;
};


$.prototype.delete_data = function(name)
{
  $(this).removeAttr('data-'+ name);
  $(this).removeData(name);
  return this;
};


Array.prototype.delete_empty = function()
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
