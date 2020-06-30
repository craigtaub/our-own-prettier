import * as path from "path";
import { commands, window, ExtensionContext } from "vscode";

// Utils
const space = " ";
const indent = space + space;
const linebreak = "\n";
const coma = ",";

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
const generateExpression = (node) => {
  const result = Statements[node.type](node);
  return result;
};

export function activate(context: ExtensionContext) {
  // File highlight
  const disposable = commands.registerCommand(
    "extension.craigifyIt",
    async function () {
      // Get the active text editor
      const editor = window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        // Get the word within the selection
        const word = document.getText(selection);

        const ast = await import("abstract-syntax-tree");
        const astree = ast.parse(word);
        const code = astree.body
          .map((astBody) => Statements[astBody.type](astBody))
          .flat();

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, code.join(""));
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
