Blockly.bash['reaction_add'] = function(block) {
  var file = Blockly.bash.valueToCode(block, 'FILE', Blockly.bash.ORDER_ATOMIC);
  var goal = Blockly.bash.valueToCode(block, 'GOAL', Blockly.bash.ORDER_ATOMIC);

  var code = 'sm_webui_add_reaction_file $flow_name ${REACTIONS}/' + file + ' ' + goal + '\n';
  return code;
};

Blockly.bash['reaction_do'] = function(block) {
  var file = Blockly.bash.valueToCode(block, 'FILE', Blockly.bash.ORDER_ATOMIC);

  var code = 'sm_webui_do_reaction_file $flow_name  ${REACTIONS}/' + file + ' flow_callback mydata\n';
  return code;
};

Blockly.bash['reaction_remove'] = function(block) {
  var file = Blockly.bash.valueToCode(block, 'FILE', Blockly.bash.ORDER_ATOMIC);

  var code = 'sm_webui_remove_reaction $flow_name ' + file + '\n';
  return code;
};

Blockly.bash['reaction_json'] = function(block) {
    var name =  block.getFieldValue('NAME');
    var trigger = Blockly.bash.valueToCode(block, 'TRIGGER', Blockly.bash.ORDER_ATOMIC);
    var success = Blockly.bash.valueToCode(block, 'SUCCESS', Blockly.bash.ORDER_ATOMIC);

    var actions =  Blockly.bash.statementToCode(block, 'ACTIONS');

    if (actions === "") {
        actions = []
    } else {
        actions = JSON.parse(actions);
    }
    
    var reactions = {
        reactions: [
            {
                name: name,
                trigger: trigger,
                success: success,
                actions: actions
            }
        ]
    };

    
    return JSON.stringify(reactions, null, 4);
};


Blockly.bash['reaction_action_json'] = function(block) {
    var action =   block.getFieldValue('ACTION');
    var args =  Blockly.bash.valueToCode(block, 'ARGUMENTS', Blockly.bash.ORDER_ATOMIC);

    var array = [action];
    
    array = array.concat(args);
    
    var json = JSON.stringify(array);

    var previousBlock = block.previousConnection.targetBlock();
    if (block.previousConnection.isConnected() && previousBlock.type !=block.type) {
        json = '[' + json;
    }
    
    if (block.nextConnection.isConnected()) {
        json += ',';
    } else {
        json += ']';
    }
    return json;
};
