module.exports = grammar({
  name: "abc",
  // extras 数组定义了可以在语法规则之间任何地方出现的 token
  // 这里我们定义了空白符（\s）和注释（$.comment）
  // 这意味着我们不需要在每个规则里都显式地处理空格
  extras: ($) => [
    /\s/, // 匹配任何空白字符：空格、制表符、换行符等
    $.comment,
  ],

  // rules 是语法的核心，定义了语言的所有语法结构
  rules: {
    // source_file 是根规则，代表整个源文件
    // 它由零个或多个（repeat）语句（_statement）组成
    source_file: ($) => repeat($._statement),

    // _statement 是一个“隐藏”规则（以下划线开头）
    // 它代表一个语句，可以是下面几种选择（choice）中的任意一种
    _statement: ($) =>
      choice(
        $.variable_declaration,
        $.assignment_expression,
        $.call_expression,
      ),

    // 规则1：变量声明，例如 "整数型 变量A"
    variable_declaration: ($) =>
      seq(
        $.type, // 首先是一个类型
        $.identifier, // 后面跟着一个标识符
      ),

    // 定义 "type" 这个 token，它可以是 '整数型' 或 '文本型'
    // 这里的 choice 是针对字符串字面量的选择
    type: ($) => choice("整数型", "文本型"),

    // 规则2：赋值表达式，例如 "变量A = 123"
    assignment_expression: ($) =>
      seq(
        $.identifier, // 标识符
        "=", // 等号
        $._expression, // 后面是一个表达式
      ),

    // 规则3：函数调用，例如 "调试输出 (变量A)"
    call_expression: ($) =>
      seq(
        $.identifier, // 函数名（也是一个标识符）
        "(", // 左括号
        $._expression, // 参数（也是一个表达式）
        ")", // 右括号
      ),

    // 定义一个简单的表达式，可以是一个数字或一个已存在的变量（标识符）
    _expression: ($) => choice($.number, $.identifier),

    // --- Token 定义 ---
    // 下面的规则定义了构成我们语言的基本单元（Token）

    // 注释规则
    // token() 表示这是一个独立的词法单元，Tree-sitter 会优先匹配它
    // 它以 "'" 开头，后面跟着任意数量的非换行符字符
    comment: ($) => token(seq("'", /[^\n]*/)),

    // 标识符规则（变量名、函数名）
    // 使用正则表达式定义：可以包含字母、数字、下划线和中文字符
    // 但不能以数字开头
    identifier: ($) => /[a-zA-Z_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]*/,

    // 数字规则
    // 使用正则表达式定义：一个或多个数字
    number: ($) => /\d+/,
  },
});
