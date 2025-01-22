import { styleText } from 'node:util';

function logError(message: string) {
  console.log(styleText('red', message));
}

function logInfo(message: any) {
  console.log(styleText('blue', message));
}

function logWarning(message: string) {
  console.log(styleText('yellow', message));
}

function logSuccess(message: string) {
  console.log(styleText('green', message));
}

export { logError, logInfo, logWarning, logSuccess };
