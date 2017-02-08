Blockly.Blocks['reaction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Name:")
        .appendField(new Blockly.FieldTextInput("reaction"), "NAME");
    this.appendDummyInput()
        .appendField("Trigger")
        .appendField(new Blockly.FieldTextInput("trigger"), "TRIGGER");
    this.appendDummyInput()
        .appendField("Success")
        .appendField(new Blockly.FieldTextInput("success"), "SUCCESS");
    this.appendValueInput("NAME")
        .setCheck("Action")
        .appendField("Actions");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};