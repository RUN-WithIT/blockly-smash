'use strict';

goog.provide('Blockly.json');

goog.require('Blockly.Generator');


Blockly.json = new Blockly.Generator('json');

Blockly.json.ORDER_ATOMIC = 0;             // 0 "" ...
Blockly.json.ORDER_CLONE = 1;              // clone
Blockly.json.ORDER_NEW = 1;                // new
Blockly.json.ORDER_MEMBER = 2.1;           // []
Blockly.json.ORDER_FUNCTION_CALL = 2.2;    // ()
Blockly.json.ORDER_POWER = 3;              // **
Blockly.json.ORDER_INCREMENT = 4;          // ++
Blockly.json.ORDER_DECREMENT = 4;          // --
Blockly.json.ORDER_BITWISE_NOT = 4;        // ~
Blockly.json.ORDER_CAST = 4;               // (int) (float) (string) (array) ...
Blockly.json.ORDER_SUPPRESS_ERROR = 4;     // @
Blockly.json.ORDER_INSTANCEOF = 5;         // instanceof
Blockly.json.ORDER_LOGICAL_NOT = 6;        // !
Blockly.json.ORDER_UNARY_PLUS = 7.1;       // +
Blockly.json.ORDER_UNARY_NEGATION = 7.2;   // -
Blockly.json.ORDER_MULTIPLICATION = 8.1;   // *
Blockly.json.ORDER_DIVISION = 8.2;         // /
Blockly.json.ORDER_MODULUS = 8.3;          // %
Blockly.json.ORDER_ADDITION = 9.1;         // +
Blockly.json.ORDER_SUBTRACTION = 9.2;      // -
Blockly.json.ORDER_STRING_CONCAT = 9.3;    // .
Blockly.json.ORDER_BITWISE_SHIFT = 10;     // << >>
Blockly.json.ORDER_RELATIONAL = 11;        // < <= > >=
Blockly.json.ORDER_EQUALITY = 12;          // == != === !== <> <=>
Blockly.json.ORDER_REFERENCE = 13;         // &
Blockly.json.ORDER_BITWISE_AND = 13;       // &
Blockly.json.ORDER_BITWISE_XOR = 14;       // ^
Blockly.json.ORDER_BITWISE_OR = 15;        // |
Blockly.json.ORDER_LOGICAL_AND = 16;       // &&
Blockly.json.ORDER_LOGICAL_OR = 17;        // ||
Blockly.json.ORDER_IF_NULL = 18;           // ??
Blockly.json.ORDER_CONDITIONAL = 19;       // ?:
Blockly.json.ORDER_ASSIGNMENT = 20;        // = += -= *= /= %= <<= >>= ...
Blockly.json.ORDER_LOGICAL_AND_WEAK = 21;  // and
Blockly.json.ORDER_LOGICAL_XOR = 22;       // xor
Blockly.json.ORDER_LOGICAL_OR_WEAK = 23;   // or
Blockly.json.ORDER_COMMA = 24;             // ,
Blockly.json.ORDER_NONE = 99;              // (...)



/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.json.ORDER_OVERRIDES = [
  // (foo()).bar() -> foo().bar()
  // (foo())[0] -> foo()[0]
  [Blockly.json.ORDER_MEMBER, Blockly.json.ORDER_FUNCTION_CALL],
  // (foo[0])[1] -> foo[0][1]
  // (foo.bar).baz -> foo.bar.baz
  [Blockly.json.ORDER_MEMBER, Blockly.json.ORDER_MEMBER],
  // !(!foo) -> !!foo
  [Blockly.json.ORDER_LOGICAL_NOT, Blockly.json.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.json.ORDER_MULTIPLICATION, Blockly.json.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.json.ORDER_ADDITION, Blockly.json.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.json.ORDER_LOGICAL_AND, Blockly.json.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.json.ORDER_LOGICAL_OR, Blockly.json.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.json.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.json.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.json.functionNames_ = Object.create(null);

  if (!Blockly.json.variableDB_) {
    Blockly.json.variableDB_ =
        new Blockly.Names(Blockly.json.RESERVED_WORDS_);
  } else {
    Blockly.json.variableDB_.reset();
  }

};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.json.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.json.definitions_) {
    definitions.push(Blockly.json.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.json.definitions_;
  delete Blockly.json.functionNames_;
  Blockly.json.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.json.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped json string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} json string.
 * @private
 */
Blockly.json.quote_ = function(string) {
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating json from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The json code created for this block.
 * @return {string} json code with comments and subsequent blocks added.
 * @private
 */
Blockly.json.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.json.COMMENT_WRAP - 3);
    if (comment) {
      commentCode += Blockly.json.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.json.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.json.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.json.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
