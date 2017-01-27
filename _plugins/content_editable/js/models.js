/**
 * Created by mrskull on 25.01.17.
 */


export let Content_Editable_Models = function(config)
{
  this.settings = {
    name: '',
  };

  this.selectors = {
    container:            '.content_editable',
    editable_content:     '.content_editable-content',

    tools:                '.content_editable-tools',
    buttons:              '.content_editable-tools-button',
  };


  this.variables = {
    parent_container: undefined,
    start_container: undefined,
    end_container: undefined,
    start_position: undefined,
    end_position: undefined,
  };

};