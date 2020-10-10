import * as vscode from 'vscode';

import Config from '../types/config/config';

const getConfig = (fsPath: string): Config => {
    const rawConfig = vscode.workspace.getConfiguration('vscode-file-gen');

    const config: Config = {
        workspaceRoot: vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '',
        rootDir: fsPath,
        directoryNameCasing: rawConfig['directory-name-casing'],
        fileTemplateGroupings: rawConfig['file-template-groupings'],
        fileTemplates: rawConfig['file-templates'],
    };

    return config;
};

export { getConfig };
