import { TextDecoder, TextEncoder } from 'util';
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

const createDirectory = async (dirUri: Uri): Promise<unknown | void> => {
  try {
    await vscode.workspace.fs.createDirectory(dirUri);
  } catch (error) {
    return error;
  }
};

const createFile = async (fileUri: Uri, data: string): Promise<unknown | void> => {
  try {
    const encodedData = new TextEncoder().encode(data);

    await vscode.workspace.fs.writeFile(fileUri, encodedData);
  } catch (error) {
    return error;
  }
};

export { readFile, createDirectory, createFile };
