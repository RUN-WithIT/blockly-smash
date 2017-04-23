'use strict';

goog.provide('Blockly.json.lists');

goog.require('Blockly.json');


Blockly.json['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
    var code = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
      code[i] = Blockly.json.valueToCode(block, 'ADD' + i,
                                       Blockly.json.ORDER_COMMA) || '';
    }

    var code = '[' + code.join(', ') + ']';

    return [code, Blockly.json.ORDER_ATOMIC];
};
