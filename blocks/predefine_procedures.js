Blockly.Blocks['predefined_procedures'] = {
  /**
   * Block for calling a predefine functionw with any name and any number of arguments.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(230);
    this.itemCount_ = 1;

    this.setInputsInline(true);
    this.appendDummyInput()
                  .appendField(new Blockly.FieldTextInput("Function_name"), "NAME");
    this.updateShape_();
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(['predefined_procedures_with_params']));
  },
  /**
   * Create XML to represent arguments
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('args', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the arguments.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('args'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('predefined_procedures_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('predefined_procedures_with_params');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ARG' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ARG' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ARG' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {

    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    }
    // Add new argument.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ARG' + i)) {
        var input = this.appendValueInput('ARG' + i);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
  }
};

Blockly.Blocks['predefined_procedures_noreturn'] = {
  /**
   * Block for calling a predefine functionw with any name and any number of arguments.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(230);
    this.itemCount_ = 1;

    this.setInputsInline(true);
    this.appendDummyInput()
                  .appendField(new Blockly.FieldTextInput("Function_name"), "NAME");
    this.updateShape_();
    this.setOutput(false);
    this.setMutator(new Blockly.Mutator(['predefined_procedures_with_params']));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },

  mutationToDom: Blockly.Blocks['predefined_procedures'].mutationToDom,
  domToMutation: Blockly.Blocks['predefined_procedures'].domToMutation,
  decompose: Blockly.Blocks['predefined_procedures'].decompose,
  compose: Blockly.Blocks['predefined_procedures'].compose,
  saveConnections: Blockly.Blocks['predefined_procedures'].saveConnections,
  updateShape_: Blockly.Blocks['predefined_procedures'].updateShape_
};



Blockly.Blocks['predefined_procedures_with_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(230);
    this.appendDummyInput()
        .appendField("Inputs");
    this.appendStatementInput('STACK');
    this.contextMenu = false;
  }
};

Blockly.Blocks['predefined_procedures_with_params'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(230);
    this.appendDummyInput()
        .appendField("Input");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};