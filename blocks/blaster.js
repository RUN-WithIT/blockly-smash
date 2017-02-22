Blockly.Blocks['blaster'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Blaster")
        .appendField(new Blockly.FieldTextInput("name"), "NAME");
    this.appendValueInput("FILE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("csv file:");
    this.appendValueInput("RAMP_RATE")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rate ramp (/sec)");
    this.appendValueInput("STEP_DURATION")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Step Duration (sec)");
    this.appendValueInput("CLIENTS")
    .setAlign(Blockly.ALIGN_RIGHT)
         .setCheck("Number")
         .appendField("Number of clients");

    this.appendDummyInput();

    this.appendDummyInput()
        .appendField("Dequeue Callback: ");
    this.appendStatementInput("DEQUEUE_CALLBACK")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("Progress Callback: ");
    this.appendStatementInput("PROGRESS_CALLBACK")
        .setCheck(null);
   this.appendDummyInput()
        .appendField("Blast Callback: ");
    this.appendStatementInput("BLAST_CALLBACK")
        .setCheck(null);

    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};