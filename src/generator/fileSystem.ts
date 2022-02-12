import { TextDecoder } from 'util';
import * as vscode from 'vscode';
import type { Uri } from 'vscode';

const readFile = async (fileUri: Uri): Promise<{ data?: string, error?: unknown }> => {
  try {
    const data = await vscode.workspace.fs.readFile(fileUri);

    return { data: new TextDecoder().decode(data) };
  } catch (error) {
    return { error };
  }
};

export { readFile };
