
Blockly.bash['predefined_procedures'] = function(block) {
  var funcName = block.getFieldValue('NAME');
  var args = [];
  for (var i = 0; i < block.itemCount_; i++) {
      args.push(Blockly.bash.valueToCode(block, 'ARG' + i,
          Blockly.bash.ORDER_COMMA) || '');
    }
  var code = funcName + ' ' +  args.join(' ') ;
  return ['`' + code + '`', Blockly.bash.ORDER_FUNCTION_CALL];
};

Blockly.bash['predefined_procedures_noreturn'] = function(block) {
  var funcName = block.getFieldValue('NAME');
  var args = [];
  for (var i = 0; i < block.itemCount_; i++) {
      args.push(Blockly.bash.valueToCode(block, 'ARG' + i,
          Blockly.bash.ORDER_COMMA) || '');
    }
  var code = funcName + ' ' +  args.join(' ') + '\n';
  return code;
};