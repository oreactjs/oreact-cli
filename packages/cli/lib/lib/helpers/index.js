const fs = require('fs');
const path = require("path");
const appDirectory = fs.realpathSync(process.cwd());
module.exports = {
  cwdResolve: (_path) => path.resolve(appDirectory, _path)
};
