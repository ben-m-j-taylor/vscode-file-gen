import * as vscode from 'vscode';

import { getConfig } from './services/config-service';
import { getInputDataFromUI } from './services/input-ui-service';
import { importFileContents } from './services/file-template-import-service';
import StringParser from './services/string-parser';
import { createDirectory, createFile } from './lib/file-utils';

export function activate(context: vscode.ExtensionContext): void {
    console.log('"vscode-file-gen" is active!');

    const disposable = vscode.commands.registerCommand(
        'vscode-file-gen.generate-files',
        async ({ fsPath }: { fsPath: string }) => {
            const config = getConfig(fsPath);

            // TODO: Validate config

            const { selectedGrouping, parentDirName } = await getInputDataFromUI(config);

            // TODO: Validate user inputs

            const stringParser = new StringParser(parentDirName, config);

            const parentDirPath = `${config.rootDir}/${parentDirName}`;

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

                        if (fileTemplate.generatedFileName.includes('/')) {
                            const parts = fileTemplate.generatedFileName.split('/');

                            if (parts.length === 2) {
                                const subDirPath = `${parentDirPath}/${parts[0]}`;

                                const subDirCreated = createDirectory(subDirPath);

                                if (!subDirCreated) {
                                    return;
                                }
                            }
                        }

                        const newFilePath = `${parentDirPath}/${stringParser.parse(fileTemplate.generatedFileName)}`;

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
        },
    );

    context.subscriptions.push(disposable);
}

export function deactivate(): void {
    return;
}
