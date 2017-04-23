Blockly.json['text'] = function(block) {
  // Text value.
  var code = Blockly.json.quote_(block.getFieldValue('TEXT'));

  return [code, Blockly.json.ORDER_ATOMIC];
};
