Blockly.bash['reaction_add'] = function(block) {
  var file = Blockly.bash.valueToCode(block, 'FILE', Blockly.bash.ORDER_ATOMIC);
  var goal = Blockly.bash.valueToCode(block, 'GOAL', Blockly.bash.ORDER_ATOMIC);

  var code = 'webui_add_reaction_file $flow_name ${REACTIONS}/' + file + ' ' + goal + '\n';
  return code;
};

Blockly.bash['reaction_do'] = function(block) {
  var file = Blockly.bash.valueToCode(block, 'FILE', Blockly.bash.ORDER_ATOMIC);

  var code = 'webui_do_reaction_file $flow_name ' + file + '\n';
  return code;
};

Blockly.bash['reaction_remove'] = function(block) {
  var file = Blockly.bash.valueToCode(block, 'FILE', Blockly.bash.ORDER_ATOMIC);

  var code = 'webui_remove_reaction $flow_name ' + file + '\n';
  return code;
};