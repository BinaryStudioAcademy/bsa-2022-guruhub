const fs = require('fs/promises');
const path = require('path');

const folders = process.argv.slice(2);

const main = async () => {
  await Promise.all(
    folders.map(async (folder) => {
      const absolutePath = path.resolve(process.cwd(), folder);
      return fs.rm(absolutePath, { recursive: true, force: true });
    }),
  );
};

main();
