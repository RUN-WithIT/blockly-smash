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