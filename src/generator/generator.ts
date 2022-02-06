import * as vscode from 'vscode';

import { getConfig, validateConfig } from './config';

const generate = (location: string, newDirectory: boolean) => {
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
};

export default generate;
