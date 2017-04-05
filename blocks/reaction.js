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
            .appendField("Name:")
            .appendField(new Blockly.FieldTextInput("reaction_name"), "NAME");
        this.appendValueInput("TRIGGER")
            .appendField("Trigger:");
        this.appendValueInput("SUCCESS")
            .appendField("Success:")
        this.appendStatementInput("ACTIONS")
            .appendField("Actions:")
            .setCheck('Reaction_Action');
        this.setColour(240);
    }
};

Blockly.Blocks['reaction_action_json'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Action:")
            .appendField(new Blockly.FieldTextInput("do_it"), "ACTION");
        this.appendValueInput("ARGUMENTS")
            .appendField("Arguments:");
        this.setPreviousStatement(true, 'Reaction_Action');
        this.setNextStatement(true, 'Reaction_Action');
        this.setColour(240);
        
    }

}
