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


