/**
 * Created by mrskull on 25.01.17.
 */

import {Content_Editable_Models} from './models'


export let Content_Editable_Views = function(config)
{
  let
    content_editable_models = new Content_Editable_Models(config),

    selectors = content_editable_models.selectors,
    variables = content_editable_models.variables;

  this.selectors = selectors;
  this.variables = variables;


  let

    if_the_same_node = function()
    {
      return variables.start_container === variables.end_container;
    },


    if_the_same_parent = function()
    {
      return $(variables.start_container).parent() === $(variables.end_container).parent();
    },


    insert_to_html = function($node, html){
      $node.before(html);
      $node.remove();
    },


    which_parent_is_the_same = function(point, node_name)
    {
      let $parents, $parent, obj;

      $parents = $(variables[point +'_container']).parentsUntil(selectors.editable_content, node_name);

      $parent = $parents.eq(0);
      obj = {
        isset: false,
        selector: $parent
      };

      if($parent.length)
        obj.isset = true;

      return obj;
    };//,
    //
    //
    // create_new_node = function(obj, old_node, start_functionaly_node, end_functionaly_node)
    // {
    //   let start_node, end_node;
    //
    //   if(obj.oposite === true)
    //   {
    //     start_node = end_functionaly_node;
    //     end_node = start_functionaly_node;
    //   }
    //   else
    //   {
    //     start_node = start_functionaly_node;
    //     end_node = end_functionaly_node;
    //   }
    //
    //   old_node = old_node.splice(variables.end_position, 0, end_node);
    //   return old_node.splice(variables.start_position, 0, start_node);
    // },
    //
    //
    // no_insert_to_html = function(obj)
    // {
    //   if(!obj || !obj.selector)
    //   {
    //     console.error('Exception error: invalid selector');
    //     return false
    //   }
    //
    //   let
    //     old_node = $(variables.start_container).text(),
    //     selected_text = old_node.substring(variables.start_position, variables.end_position),
    //     new_node,
    //     start_node = '<'+ obj.selector +'>',
    //     end_node = '</'+ obj.selector +'>';
    //
    //   new_node = create_new_node(obj, old_node, start_node, end_node);
    //
    //   if(typeof old_node !== 'string')
    //   {
    //     console.error('Exception error: invalid text.');
    //     return false;
    //   }
    //
    //   let
    //     $parent = $(variables.start_container).parent(),
    //     childrens_strings = {
    //       before: '',
    //       after: '',
    //     },
    //     current = 'before';
    //
    //   $parent.contents()
    //     .each(function(){
    //       if(this === variables.start_container)
    //         current = 'after';
    //       else
    //         if($(this)[0].outerHTML)
    //           childrens_strings[current] += $(this)[0].outerHTML;
    //         else
    //           childrens_strings[current] += $(this).text();
    //     });
    //
    //
    //   let html, $element;
    //
    //   if(obj && obj.oposite === true)
    //   {
    //     if(childrens_strings.before || childrens_strings.after)
    //       html = start_node + childrens_strings.before + new_node + childrens_strings.after +'</strong>';
    //     else if($parent.text() === selected_text)
    //       html = old_node;
    //     else
    //       html = start_node + new_node +'</strong>';
    //
    //     $element = $parent;
    //   }
    //   else
    //   {
    //     html = new_node;
    //     $element = $(variables.start_container);
    //   }
    //
    //   insert_to_html($element, html);
    //
    // };


///////////////////////////////////////

  this.text_bold = function()
  {
    console.log('bold');
    if(if_the_same_node())
    {
      let parent_obj = which_parent_is_the_same('start', 'strong');

      if(parent_obj.isset)
        console.log('opositive');
        // insert_to_html({selector: 'strong', oposite: true});
      else
        console.log('default');
        // insert_to_html({selector: 'strong'});
    }
    else
    {
      console.log('diffrent node');
    }
  };


  this.text_italics = function()
  {
    console.log('text_italics');
  };


  this.text_underline = function()
  {
    console.log('text_underline');
  };
};