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
