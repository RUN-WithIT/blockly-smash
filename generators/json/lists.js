'use strict';

goog.provide('Blockly.json.lists');

goog.require('Blockly.json');



Blockly.json['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
    var code = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
      code[i] = Blockly.bash.valueToCode(block, 'ADD' + i,
                                       Blockly.bash.ORDER_COMMA) || '';
    }

    code = JSON.stringify(code);

    return [code, Blockly.bash.ORDER_FUNCTION_CALL];
};
