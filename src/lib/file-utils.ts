import * as vscode from 'vscode';
import * as fs from 'fs';

/**
 * createDirectory will tru and create the given directory and will return a boolean success inciator
 * @param dirPath
 * @returns A boolean that indicates wheter the directory was created successfully
 */
const createDirectory = (dirPath: string): boolean => {
    if (fs.existsSync(dirPath)) {
        vscode.window.showErrorMessage(`Parent directory already exists: ${dirPath}`);
        return false;
    }

    try {
        fs.mkdirSync(dirPath);
    } catch (error) {
        vscode.window.showErrorMessage(`Error creating parent directory: ${dirPath}`, error);
        return false;
    }

    return true;
};

/**
 * createFile will tru and create the given file and will return a boolean success inciator
 * @param filePath
 * @param fileContents
 * @returns A boolean that indicates wheter the file was created successfully
 */
const createFile = (filePath: string, fileContents: string): boolean => {
    if (fs.existsSync(filePath)) {
        vscode.window.showErrorMessage(`File already exists: ${filePath}`);
        return false;
    }

    try {
        fs.writeFileSync(filePath, fileContents);
    } catch (error) {
        vscode.window.showErrorMessage(`Error creating file: ${filePath}`, error);
        return false;
    }

    return true;
};

export { createDirectory, createFile };
