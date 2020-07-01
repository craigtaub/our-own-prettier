const path = require("path");
const { commands, window, ExtensionContext } = require("vscode");
const ast = require("abstract-syntax-tree");

// Utils
const space = " ";
const indent = space + space;
const linebreak = "\n";
const coma = ",";

// AST statements
const Statements = {
  ExpressionStatement: function (node) {
    const result = generateExpression(node.expression);
    return result;
  },
  CallExpression: function (node) {
    const result = [node.callee.name];
    let argNames = [];
    result.push("(");
    const length = node.arguments.length;
    if (length > 0) {
      result.push(linebreak);
      argNames = node.arguments.map(
        (item, i) =>
          indent + item.name + (i == length - 1 ? linebreak : coma + linebreak)
      );
    }
    return [...result, ...argNames, ")"];
  },
};
// Statement utilities
const generateExpression = (node) => {
  const result = Statements[node.type](node);
  return result;
};

function parseAndReprint(word) {
  const astree = ast.parse(word);
  return astree.body
    .map((astBody) => Statements[astBody.type](astBody))
    .flat()
    .join("");
}
// Extension
function activate(context) {
  const disposable = commands.registerCommand(
    "extension.SexifyIt",
    function () {
      // Get the active text editor
      const editor = window.activeTextEditor;

      if (editor) {
        const documentText = editor.document.getText();
        const selectionRange = editor.selection;

        // Parse, process and re-print AST
        const code = parseAndReprint(documentText);

        // Replace selection with new formatted code
        editor.edit((editBuilder) => {
          editBuilder.replace(selectionRange, code);
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

exports.activate = activate;
