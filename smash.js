Blockly.Blocks['blaster'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Blaster")
        .appendField(new Blockly.FieldTextInput("name"), "NAME");
    this.appendValueInput("FILE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("csv file:");
    this.appendValueInput("RAMP_RATE")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rate ramp (/sec)");
    this.appendValueInput("STEP_DURATION")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Step Duration (sec)");
    this.appendValueInput("CLIENTS")
    .setAlign(Blockly.ALIGN_RIGHT)
         .setCheck("Number")
         .appendField("Number of clients");

    this.appendDummyInput();

    this.appendDummyInput()
        .appendField("Dequeue Callback: ");
    this.appendStatementInput("DEQUEUE_CALLBACK")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("Progress Callback: ");
    this.appendStatementInput("PROGRESS_CALLBACK")
        .setCheck(null);
   this.appendDummyInput()
        .appendField("Blast Callback: ");
    this.appendStatementInput("BLAST_CALLBACK")
        .setCheck(null);

    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.Blocks['flow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Name:")
        .appendField(new Blockly.FieldTextInput("do_flow"), "NAME");
    this.appendStatementInput("Data")
        .appendField("Data:")
        .setCheck('Data');
    this.appendStatementInput("Reaction")
        .appendField("Reactions:")
        .setCheck('Reaction');
    this.appendDummyInput()
        .appendField("Success Callback: ");
    this.appendStatementInput("SUCCESS_CALLBACK")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("Fail Callback: ");
    this.appendStatementInput("FAIL_CALLBACK")
        .setCheck(null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['flow_data'] = {
  init: function() {
    this.appendValueInput("FILE")
        .setCheck(null)
        .appendField('smash_data_add_file');
    this.setPreviousStatement(true, 'Data');
    this.setNextStatement(true, 'Data');
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



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
Blockly.Blocks['reaction_add'] = {
  init: function() {
    this.appendValueInput('FILE')
        .setCheck(null)
        .appendField('webui_add_reaction_file')
        .appendField('File:');
    this.appendValueInput('GOAL')
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(null)
            .appendField('GOAL:');
    this.setPreviousStatement(true, 'Reaction');
    this.setNextStatement(true, 'Reaction');
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['reaction_remove'] = {
  init: function() {
     this.appendValueInput('FILE')
            .setCheck(null)
            .appendField('webui_remove_reaction')
            .appendField('File:');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['reaction_do'] = {
  init: function() {
     this.appendValueInput('FILE')
            .setCheck(null)
            .appendField('webui_do_reaction_file')
            .appendField('File:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.bash['blaster'] = function(block) {
  var name = block.getFieldValue('NAME');
  var file = Blockly.bash.valueToCode(block, 'FILE', Blockly.bash.ORDER_ATOMIC);
  var rampRate = Blockly.bash.valueToCode(block, 'RAMP_RATE', Blockly.bash.ORDER_ATOMIC);
  rampRate = rampRate || [];

  var stepDuration = Blockly.bash.valueToCode(block, 'STEP_DURATION', Blockly.bash.ORDER_ATOMIC);
  var clients = Blockly.bash.valueToCode(block, 'CLIENTS', Blockly.bash.ORDER_ATOMIC);

  var dequeueCallback = Blockly.bash.statementToCode(block, 'DEQUEUE_CALLBACK');
  var progressCallback = Blockly.bash.statementToCode(block, 'PROGRESS_CALLBACK');
  var blastCallback = Blockly.bash.statementToCode(block, 'BLAST_CALLBACK');

  var step0 = [
    'PORT=32000',
    'CSVFILE=' + file,
    'RAMP=' + rampRate.join(" "),
    'STEPDURATION=' + stepDuration,
    'CLIENTS=' + clients,
    'SERVER=localhost',
    'BASENAME=`basename $0`',
    'sm_data_add_kv sessionname:$BASENAME',
    'sm_log INFO "${BASENAME} started"',
    'err_exit()',
    ' {',
    '    sm_log ERROR "${BASENAME} has error on line $1"',
    ' }',
    'trap \'err_exit $LINENO\' ERR',
    'cleanup()',
    ' {',
    '    set -e',
    '    sm_log INFO "${BASENAME} done"',
    ' }',
    'trap "cleanup" EXIT'
  ];

  var dequeue = [
    '#',
    '# client',
    '#',
    'function blast-dq-cb()',
    ' {',
    '    REF=$1',
    '    UDATA=$2',
    '    echo "blaster-dq-cb"',
    '    echo $# $*',
    '    echo `sm_dataref_tostring $1`',
    '    echo ""',
    dequeueCallback,
    '  sleep 1',
    '}'
  ];

  var step1 = [
    'function start-client()',
    ' {',
    '     SEQ=$1',
    '     sm_blaster_dq_open test $SERVER $PORT',
    '     COUNT=0',
    '     trap "break" INT',
    '     while [ 1 ] ; do',
    '     if [ $COUNT -eq 0 ] ; then',
    '        PAYLOAD="{stb_id:INJECTED}"',
    '         RES=`sm_blaster_dq test 5 blast-dq-cb myudata-${SEQ} "${PAYLOAD}"`',
    ' #       sm_blaster_dq test 5 blast-dq-cb myudata-${SEQ} "${PAYLOAD}"',
    '     else',
    '         RES=`sm_blaster_dq test 5 blast-dq-cb myudata-${SEQ}`',
    ' #       sm_blaster_dq test 5 blast-dq-cb myudata-${SEQ}',
    '     fi',
    '     COUNT=$((COUNT+1))',
    '     done',
    '     sm_blaster_dq_close test',
    '     exit 0',
    ' }',
    '# start the client in forks that don\'t return',
    'for i in `seq 1 $CLIENTS` ; do',
    '     ( start-client $i & )',
    'done',
    ' # start the server',
    ' #',
    ' # server',
    ' #',
    'function kill-children-and-exit()',
    ' {',
    '     jobs -p |xargs kill',
    '     exit 0',
    ' }',
    'trap kill-children-and-exit SIGINT',
  ];


  var progress = [
  'function blast-progress-cb()',
  ' {',
      'STEP=$1',
      'SECSLEFTINSTEP=$2',
      'TOTALSTEPS=$3',
      'RATE=$4',
      'TRIGGERED=$5',
      'ERRORED=$6',
      'ACTUAL_RATE=$7',
      'PUDATA=$8',
      'echo "blast-progress-cb"',
      'echo $@',
      'echo ""',
      progressCallback,
  ' }'
  ];

  var blast = [
    'function blast-cb()',
    ' {',
        'REF=$1',
        'UDATA=$2',
        'PAYLOAD=`sm_dataref_tostring $1`',
        '[ "${PAYLOAD}" == "gimme" ] && return',
        'echo "blast-cb"',
        'echo $# $*',
        'echo $PAYLOAD',
        'echo ""',
        blastCallback,
    ' }'
  ];


  var step2 = [
    '# this returns when done',
    'sm_blaster_ramp_process $CSVFILE $PORT $STEPDURATION blast-cb udata blast-progress-cb pudata `echo $RAMP`'
  ];


  var code = step0.join('\n') +
             '\n\n' +
             dequeue.join('\n') +
             '\n\n' +
             step1.join('\n') +
             '\n\n' +
             progress.join('\n') +
             '\n\n' +
             blast.join('\n') +
             '\n\n' +
             step2.join('\n');

  return [code, Blockly.bash.ORDER_FUNCTION_CALL];
};
Blockly.bash['flow'] = function(block) {
  var name = block.getFieldValue('NAME');
  var data = Blockly.bash.statementToCode(block, 'Data').trim();
  var reaction = Blockly.bash.statementToCode(block, 'Reaction').trim();
  var success_callback = Blockly.bash.statementToCode(block, 'SUCCESS_CALLBACK');
  var fail_callback = Blockly.bash.statementToCode(block, 'FAIL_CALLBACK');

  var step0 =[
  'BASENAME=`basename $0`',
  'flow_name="' + name +'"',
  'sm_data_add_kv sessionname:$BASENAME',
  'CONF=../Config',
  'REACTIONS=../Reactions',
  '\n' +
  'err_exit()',
  '{',
  '  sm_log ERROR "${BASENAME} has error on line $1"',
  '}',
  '\n' +
  'trap \'err_exit $LINENO\' ERR',
  '\n' +
  'sm_random_kick',
  'sm_data_dequote_specials 1'
  ];

  var step1 = [
    'sm_webui_open ' + name,
    '\n' +
    'cleanup()',
    '{',
    '    set -e',
    '    sm_webui_status ' + name + ' flow_callback mydata',
    '    sm_webui_close ' + name,
    '    sm_log INFO "${BASENAME} done"',
    '}',
    '\n' +
    'trap "cleanup" EXIT'
  ];

  var step2 = [
    'echo "^C to stop"',
    'trap "break" INT',
    'trap "break ; err_exit $LINENO" ERR',
    'while [ 1 ] ; do',
    '  sm_webui_process ' + name + ' 5 flow_callback mydata',
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
  var code = 'sm_data_add_file ${CONF}/' + file + '\n';
  return code;
};






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