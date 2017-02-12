Blockly.Blocks['flow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Name:")
        .appendField(new Blockly.FieldTextInput("do_flow"), "NAME");
    this.appendStatementInput("Data")
        .appendField("Data:")
        .setCheck('Data');
    this.appendStatementInput("Reaction")
        .appendField("Reactions:")
        .setCheck('Reaction');
    this.appendDummyInput()
        .appendField("Success Callback: ");
    this.appendStatementInput("SUCCESS_CALLBACK")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("Fail Callback: ");
    this.appendStatementInput("FAIL_CALLBACK")
        .setCheck(null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['flow_data'] = {
  init: function() {
    this.appendValueInput("FILE")
        .setCheck(null)
        .appendField('smash_data_add_file');
    this.setPreviousStatement(true, 'Data');
    this.setNextStatement(true, 'Data');
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['flow_reactions'] = {
  init: function() {
    this.appendValueInput('FILE')
        .setCheck(null)
        .appendField('webui_add_reaction_file')
        .appendField('File:');
    this.appendValueInput('GOAL')
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(null)
            .appendField('GOAL:');
    this.setPreviousStatement(true, 'Reaction');
    this.setNextStatement(true, 'Reaction');
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['flow_callback'] = {
  init: function() {
    this.setPreviousStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};