import * as vscode from 'vscode';
import * as fs from 'fs';

import { getConfig } from './services/config-service';
import { getInputDataFromUI } from './services/input-ui-service';
import { importFileContents } from './services/file-template-import-service';
import StringParser from './services/string-parser';
import { createDirectory, createFile } from './lib/file-utils';

export function activate(context: vscode.ExtensionContext): void {
    console.log('"vscode-file-gen" is active!');

    const disposable = vscode.commands.registerCommand('vscode-file-gen.helloWorld', async () => {
        const config = getConfig();

        // TODO: Validate config

        const { selectedGrouping, parentDirName } = await getInputDataFromUI(config);

        // TODO: Validate user inputs

        const stringParser = new StringParser(parentDirName, config);

        const parentDirPath = `${config.workspaceRoot}/src/${parentDirName}`;

        const parentDirCreated = createDirectory(parentDirPath);

        if (!parentDirCreated) {
            return;
        }

        for (let i = 0; i < config.fileTemplateGroupings.length; i++) {
            const fileTemplateGrouping = config.fileTemplateGroupings[i];

            if (fileTemplateGrouping.name !== selectedGrouping) {
                continue;
            }

            for (let j = 0; j < fileTemplateGrouping.files.length; j++) {
                const fileTemplateName = fileTemplateGrouping.files[j];

                for (let k = 0; k < config.fileTemplates.length; k++) {
                    const fileTemplate = config.fileTemplates[k];

                    if (fileTemplate.name !== fileTemplateName) {
                        continue;
                    }

                    // TODO: Create a sub-directory if needed

                    const newFilePath = `${parentDirPath}/${stringParser.parse(fileTemplate.generatedFileName)}.txt`;

                    const fileTemplateContents = importFileContents(
                        `${config.workspaceRoot}/${fileTemplate.fileTemplatePath}`,
                    );

                    const fileCreated = createFile(newFilePath, stringParser.parse(fileTemplateContents));

                    if (!fileCreated) {
                        return;
                    }
                }
            }
        }

        vscode.window.showInformationMessage('Files sucessfully generated.');
    });

    context.subscriptions.push(disposable);
}

export function deactivate(): void {
    return;
}
