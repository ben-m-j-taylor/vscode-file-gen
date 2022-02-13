import * as vscode from 'vscode';

import Casing from '../enums/casing';
import type FileTemplate from '../types/fileTemplateType';

import { getConfig, validateConfig } from './config';
import { readFile, createDirectory, createFile } from './fileSystem';
import parseName from './nameParser';
import parseTemplate from './templateParser';

const generate = async (location: string, newDirectory: boolean) => {
  if (!location) {
    vscode.window.showErrorMessage(`vscode-file-gen: The extension should only be run from the file explror context menu!`);
    return;
  }

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

  const templateGroupPickOptions = config.fileTemplateGroups?.map(tg => ({ label: tg.name, detail: tg.description || '' })) || [];

  const templatePickOptions = config.fileTemplates?.map(t => ({ label: t.name, detail: t.description || '' })) || [];

  const quickPickValues = [
    { label: 'File Template Groups', kind: -1 },
    ...templateGroupPickOptions,
    { label: 'File Templates', kind: -1 },
    ...templatePickOptions
  ];

  const templateOrTemplateGroup = await vscode.window.showQuickPick(quickPickValues);

  if (!templateOrTemplateGroup) {
    return;
  }

  const { camelCaseName, pascalCaseName, snakeCaseName, kebabCaseName } = parseName(specifiedName, (config.directoryNameCasing as Casing));

  const templateGroupDefinition = config.fileTemplateGroups?.find(tg => tg.name === templateOrTemplateGroup.label);
  const templateDefinition = config.fileTemplates?.find(t => t.name === templateOrTemplateGroup.label);

  const templatesToGenerate: FileTemplate[] = [];

  if (typeof templateGroupDefinition !== 'undefined' && templateGroupDefinition?.fileTemplates) {
    for (const templateName of templateGroupDefinition.fileTemplates) {
      const template = config.fileTemplates?.find(t => t.name === templateName);

      if (!template) {
        continue;
      }

      templatesToGenerate.push(template);
    }
  } else if (typeof templateDefinition !== 'undefined') {
      templatesToGenerate.push(templateDefinition);
  }

  if (templatesToGenerate.length === 0) {
    vscode.window.showErrorMessage(`vscode-file-gen: Unable to generate files based on template/template group with name "${templateOrTemplateGroup.label}",
      either the template/template group with that name does not exist or it has no fileTemplates assigned to it.`);
    return;
  }

  const workspaceRootPath = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath;

  if (!workspaceRootPath) {
    vscode.window.showErrorMessage(`vscode-file-gen: This extension can only be used when a workspace is open.`);
    return;
  }

  let parentDirectory = `${location}/`;

  if (newDirectory) {
    parentDirectory = `${location}/${specifiedName}/`;

    await createDirectory(vscode.Uri.file(parentDirectory));
  }

  for (const template of templatesToGenerate) {
    const templateFilePath = `${workspaceRootPath}/${template.templateFilePath}`;

    const { data, error } = await readFile(vscode.Uri.file(templateFilePath));

    if (error || !data) {
      vscode.window.showErrorMessage(`vscode-file-gen: Unable to read template file for ${template.name} at "${templateFilePath}"`);
      continue;
    }

    // If the templates fileName includes a directory then create the directory
    if (template.fileName.includes('/')) {
      const subDirectoryName = template.fileName.split('/')[0];

      const subDirectoryPath = `${parentDirectory}/${subDirectoryName}/`;

      const subDirCreationError = await createDirectory(vscode.Uri.file(subDirectoryPath));

      if (subDirCreationError) {
        vscode.window.showErrorMessage(`vscode-file-gen: Unable to create subdirectory for ${template.name} at "${subDirectoryPath}"`);
        continue;
      }
    }

    // Get the file name with any template strings parsed out
    const fileName = parseTemplate(template.fileName, camelCaseName, pascalCaseName, snakeCaseName, kebabCaseName);

    const parsedTemplate = parseTemplate(data, camelCaseName, pascalCaseName, snakeCaseName, kebabCaseName);

    const fileCreationError = await createFile(vscode.Uri.file(`${parentDirectory}/${fileName}`), parsedTemplate);

    if (fileCreationError) {
      vscode.window.showErrorMessage(`vscode-file-gen: Unable to create file for ${template.name} at "${fileCreationError}"`);
    }
  }
};

export default generate;
