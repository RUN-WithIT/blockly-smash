Blockly.Blocks['reaction_add'] = {
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


Blockly.Blocks['reaction_remove'] = {
  init: function() {
     this.appendValueInput('FILE')
            .setCheck(null)
            .appendField('webui_remove_reaction')
            .appendField('File:');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['reaction_do'] = {
  init: function() {
     this.appendValueInput('FILE')
            .setCheck(null)
            .appendField('webui_do_reaction_file')
            .appendField('File:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['reaction_json'] = {
    init: function() {
        this.appendDummyInput()
            .apppendField("Name:")
            .appendField(new Blockly.FieldTextInput("reaction_name"), "NAME");
        this.appendIValueInput()
            .appendField("Trigger:")
            .appendField(new Blockly.FieldTextInput("trigger"), "TRIGGER");
        this.appendIValueInput()
            .appendField("Success:")
            .appendField(new Blockly.FieldTextInput("success"), "SUCCESS");
        this.appendStatementInput()
            .appendField("Actions:")
            .setCheck('Reaction');
    }
};

Blockly.Blocks['reaction_action_json'] = {
    init: function() {
        this.appendDummyInput()
            .apppendField("Action:")
            .appendField(new Blockly.FieldTextInput("do_it"), "ACTION");
        this.appendIValueInput()
            .appendField("Trigger:")
            .appendField(new Blockly.FieldTextInput("Argument"), "ARGUMENT");
        this.appendIValueInput()
    }

}
