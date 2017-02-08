Blockly.bash['flow'] = function(block) {
  var name = block.getFieldValue('NAME');
  var data = Blockly.bash.statementToCode(block, 'Data');
  var reaction = Blockly.bash.statementToCode(block, 'Reaction');

  var step0 =[
  'BASENAME=`basename $0`',
  'smash_data_add_kv sessionname:$BASENAME',
  'CONF=../Config',
  'REACTIONS=../Reactions',
  'err_exit()',
  '{',
  '    smash_log ERROR "${BASENAME} has error on line $1"',
  '}',
  'trap \'err_exit $LINENO\' ERR',
  'smash_random_kick',
  'smash_data_dequote_specials 1'
  ];

  var step1 = [
    'webui_open ' + name,
    'cleanup()',
    '{',
    '    set -e',
    '    webui_status ' + name + ' fava_callback mydata',
    '    webui_close ' + name,
    '    smash_log INFO "${BASENAME} done"',
    '}',
    'trap "cleanup" EXIT'
  ];

  var step2 = [
    'echo "^C to stop"',
    'trap "break" INT',
    'trap "break ; err_exit $LINENO" ERR',
    'while [ 1 ] ; do',
    '   webui_process ' + name + ' 5 fava_callback mydata',
    'done'
  ];

  var code = step0.join('\n') +
             '\n\n' +
             '# Add data \n' +
             data +
             '\n\n' +
             step1.join('\n') +
             '\n\n' +
             '# Add reactions \n' +
             reaction +
             '\n\n' +
             step2.join('\n');

  return [code, Blockly.bash.ORDER_FUNCTION_CALL];
};


Blockly.bash['flow_data'] = function(block) {
  var file = Blockly.JavaScript.valueToCode(block, 'FILE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'smash_data_add_file ${CONF}/' + file + '\n';
  return code;
};

Blockly.bash['flow_reactions'] = function(block) {
  var file = Blockly.JavaScript.valueToCode(block, 'FILE', Blockly.JavaScript.ORDER_ATOMIC);
  var goal = Blockly.JavaScript.valueToCode(block, 'GOAL', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'webui_add_reaction_file fava ${REACTIONS}/' + file + ' ' + goal + '\n';
  return code;
};