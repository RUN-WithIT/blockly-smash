Blockly.bash['flow'] = function(block) {
  var name = block.getFieldValue('NAME');
  var data = Blockly.bash.statementToCode(block, 'Data').trim();
  var reaction = Blockly.bash.statementToCode(block, 'Reaction').trim();
  var success_callback = Blockly.bash.statementToCode(block, 'SUCCESS_CALLBACK');
  var fail_callback = Blockly.bash.statementToCode(block, 'FAIL_CALLBACK');

  var step0 =[
  'BASENAME=`basename $0`',
  'flow_name="' + name +'"',
  'smash_data_add_kv sessionname:$BASENAME',
  'CONF=../Config',
  'REACTIONS=../Reactions',
  '\n' +
  'err_exit()',
  '{',
  '  smash_log ERROR "${BASENAME} has error on line $1"',
  '}',
  '\n' +
  'trap \'err_exit $LINENO\' ERR',
  '\n' +
  'smash_random_kick',
  'smash_data_dequote_specials 1'
  ];

  var step1 = [
    'webui_open ' + name,
    '\n' +
    'cleanup()',
    '{',
    '    set -e',
    '    webui_status ' + name + ' flow_callback mydata',
    '    webui_close ' + name,
    '    smash_log INFO "${BASENAME} done"',
    '}',
    '\n' +
    'trap "cleanup" EXIT'
  ];

  var step2 = [
    'echo "^C to stop"',
    'trap "break" INT',
    'trap "break ; err_exit $LINENO" ERR',
    'while [ 1 ] ; do',
    '  webui_process ' + name + ' 5 flow_callback mydata',
    'done'
  ];


  var setup = [];
   var vars = [
      'UDATA',
      'WU_NAME',
      'EVENT',
      'REACTION',
      'REACTION_NAME',
      'STEP',
      'COUNT',
    ];
  for (var i=0; i < vars.length; i++){
    Blockly.getMainWorkspace().createVariable(vars[i]);
    setup.push('  ' + vars[i] + '=$' + (i+1));
  }





  var failLog = [
    '  echo $@ >> steps.txt',
    '  if [ "${EVENT}" == "WEBUI_CB_STEP_FAIL" ] || [ "${EVENT}" == "WEBUI_CB_FAIL" ] ; then',
    '    echo $@ >> FAIL.txt',
    '  fi'
  ];

  var success = [
    '  if [ "${EVENT}" == "WEBUI_CB_SUCCESS" ] ; then',
    success_callback,
    '  fi'
  ];

  var fail = [
    '  if [ "${EVENT}" == "WEBUI_CB_FAIL" ] ; then',
    fail_callback,
    '  fi'
  ];

  var callback = 'function flow_callback { \n' +
               setup.join('\n') +
               '\n\n' +
               failLog.join('\n') +
               '\n\n' +
               success.join('\n') +
               '\n\n' +
               fail.join('\n') +
               '\n' +
             '}\n\n';


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
             '# Callback \n' +
             callback +
             '\n\n' +
             step2.join('\n') +
             '\n\n';

  return [code, Blockly.bash.ORDER_FUNCTION_CALL];
};


Blockly.bash['flow_data'] = function(block) {
  var file = Blockly.bash.valueToCode(block, 'FILE', Blockly.bash.ORDER_ATOMIC);
  var code = 'smash_data_add_file ${CONF}/' + file + '\n';
  return code;
};

Blockly.bash['flow_reactions'] = function(block) {
  var file = Blockly.bash.valueToCode(block, 'FILE', Blockly.bash.ORDER_ATOMIC);
  var goal = Blockly.bash.valueToCode(block, 'GOAL', Blockly.bash.ORDER_ATOMIC);

  var code = 'webui_add_reaction_file $flow_name ${REACTIONS}/' + file + ' ' + goal + '\n';
  return code;
};


Blockly.bash['flow_callback'] = function(block) {

  return code;
};