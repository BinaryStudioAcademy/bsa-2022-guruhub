// No packages seem to be cross-platform

const childProcess = require('child_process');

const ENV_VARIABLE_REGEX =
  /^[a-zA-Z_][a-zA-Z0-9_]*=(?:(?:"[^"]*")|(?:[^" ]*))$/;

const env = process.env;
const argv = process.argv.slice(2).map((arg) => arg.trim());
let commandStartIndex = 0;

for (const i in argv) {
  const arg = argv[i].trim();

  if (ENV_VARIABLE_REGEX.test(arg)) {
    const [name, value] = arg.split('=');
    env[name] = value;
  } else {
    commandStartIndex = i;
    break;
  }
}

const proc = childProcess.exec(
  argv
    .slice(commandStartIndex)
    .map((arg) => arg.trim())
    .join(' '),
  { env, stdio: process.stdio },
);

proc.stdout.pipe(process.stdout);
proc.stderr.pipe(process.stderr);
