import * as path from "path";
import { commands, window, ExtensionContext } from "vscode";

export function activate(context: ExtensionContext) {
  // File highlight + reverse part
  const disposable = commands.registerCommand(
    "extension.reverseWord",
    function () {
      // Get the active text editor
      const editor = window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        // Get the word within the selection
        const word = document.getText(selection);
        const reversed = word.replace(/ /g, "\n"); // replace space with line break
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, reversed);
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
