import * as vscode from 'vscode';

import { getConfig, validateConfig } from './config';

const generate = async (location: string, newDirectory: boolean) => {
  const config = getConfig();

  let { valid, validationErrors } = validateConfig(config);

  if (!valid) {
    vscode.window.showErrorMessage(`vscode-file-gen: Unable to generate files, config has the following errors: ${validationErrors?.map(e => ` ${e}`)}`);
    return;
  }

  if (!newDirectory) {
    vscode.window.showInformationMessage('vscode-file-gen: Generating files in directory!');
  } else {
    vscode.window.showInformationMessage('vscode-file-gen: Generating new directory with files!');
  }

  const specifiedName = await vscode.window.showInputBox({
    title: `Enter the name you would like to use in ${config.directoryNameCasing}`,
    placeHolder: config.directoryNameCasing || ''
  });

  if (!specifiedName) {
    return;
  }
};

export default generate;
