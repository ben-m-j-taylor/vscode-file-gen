import * as vscode from 'vscode';

import Config from '../types/config/config';

const getConfig = (): Config => {
    console.log('');
    console.log('======== CONFIG - START ========');

    const rawConfig = vscode.workspace.getConfiguration('vscode-file-gen');

    const config: Config = {
        workspaceRoot: vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '',
        directoryNameCasing: rawConfig['directory-name-casing'],
        fileTemplateGroupings: rawConfig['file-template-groupings'],
        fileTemplates: rawConfig['file-templates'],
    };

    console.log('config:', config);

    console.log('======== CONFIG - END ========');
    console.log('');

    return config;
};

export { getConfig };
