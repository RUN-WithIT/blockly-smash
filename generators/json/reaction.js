Blockly.json['reaction_json'] = function(block) {
    var name =  block.getFieldValue('NAME');
    var trigger = Blockly.json.valueToCode(block, 'TRIGGER', Blockly.json.ORDER_ATOMIC);
    var success = Blockly.json.valueToCode(block, 'SUCCESS', Blockly.json.ORDER_ATOMIC);

    var actions =  Blockly.json.statementToCode(block, 'ACTIONS');
    
    if (actions === "") {
        actions = []
    } else {
          actions = '[' + actions + ']';
    }
    
    var reactions = [ '{',
                      '    "reactions": [',
                      '     {',
                      '        "name": "' + name + '",',
                      '        "trigger": ' + trigger + ',',
                      '        "success": ' + success + ',',
                      '        "actions": ' + actions,
                      '     }',
                      '    ]',
                      '};'
                    ];
    return reactions.join('\n');
};


Blockly.json['reaction_action_json'] = function(block) {
    var action =   block.getFieldValue('ACTION');
    var args =  Blockly.json.valueToCode(block, 'ARGUMENTS', Blockly.json.ORDER_ATOMIC);

    var array = [ '"' + action + '"' ];
    
    array = array.concat(args);
    
    var json = '[\n' + array.join(',\n  ') + '\n]';

    var previousBlock = block.previousConnection.targetBlock();
    if (block.previousConnection.isConnected() && previousBlock.type !=block.type) {
        json = '[\n' + json;
        if (block.nextConnection.isConnected()) {
            json += ',';
        } else {
            json += '\n]';
        }
    }
    
   
    return json;
};
