/**
 * Created by mrskull on 25.01.17.
 */

import {Content_Editable_Views} from './views'


export let Content_Editable_Controllers = function(config)
{
  let
    content_editable_views = new Content_Editable_Views(config),
    selectors = content_editable_views.selectors,
    variables = content_editable_views.variables,


    check_and_set_selection = function()
    {
      let
        selObj = window.getSelection(),
        selRange,


        check_if_editable = function(parent_container)
        {
          let
            this_editable = $(parent_container).hasClass('content_editable'),
            parents_editable = $(parent_container).parents('.content_editable').length;

          return this_editable || parents_editable === 1;
        };

      if(!selObj.anchorNode)
        return false;

      selRange = selObj.getRangeAt(0);

      variables.parent_container = selRange.commonAncestorContainer;
      variables.start_container = selRange.startContainer;
      variables.end_container = selRange.endContainer;
      variables.start_position = selRange.startOffset;
      variables.end_position = selRange.endOffset;

      return check_if_editable(variables.parent_container);
    },


    menage_buttons = function()
    {
      let
        type = $(this).data('type'),
        name = $(this).data('name');

      if(type === 'select' && check_and_set_selection())
      {
        switch(name)
        {
          case 'bold':        content_editable_views.text_bold();
            break;
          case 'italics':     content_editable_views.text_italics();
            break;
          case 'underline':   content_editable_views.text_underline();
            break;
        }
      }
      else if(type === 'insert')
      {
        console.log('where is cursor?');
      }
    };


  /**
   *    Defining public functions
   */

  this.define = function()
  {
    let
      $buttons = $(selectors.buttons);

    $buttons.click(menage_buttons);
  };
};