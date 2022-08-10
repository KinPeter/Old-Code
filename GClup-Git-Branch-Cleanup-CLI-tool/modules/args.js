const args = require('yargs')
  .usage(`
Git Branch Cleanup 
    
This CLI tool helps you to get rid of unused git branches.
By default, master, develop and the currently checked out branch will not be deleted.
    
Possible parameters are listed below.`)
  .option('path', {
    alias: 'p',
    describe: 'Absolute path to the git project directory.',
    type: 'string',
    group: 'Mandatory:'
  })
  .option('soft', {
    alias: 's',
    describe: 'Delete only merged branches (which is possible with -d flag), don\'t try to delete the others.',
    type: 'boolean',
    group: 'Soft mode:'
  })
  .option('normal', {
    alias: 'n',
    describe: 'Delete all merged branches, and ask if you want to force delete those which are not merged yet.',
    type: 'boolean',
    group: 'Normal mode (default):'
  })
  .option('force', {
    alias: 'f',
    describe: 'Delete all branches without asking anything (apply -D flag for each branch).',
    type: 'boolean',
    group: 'Force mode:'
  })
  .option('protect', {
    describe: 'Protected branch(es) that should not be deleted. List them separated by spaces, like \n --protect staging feature/project-123 etc',
    type: 'array',
    group: 'Protected branches:'
  })
  .demandOption(['path'], 'Please provide the path argument to work with this tool.').argv;

module.exports = {
  getArgs,
  isNormal,
  isSoft,
  isForced,
  isNoModeSelected,
  getModeString,
  getPath,
  hasProtected,
  getProtectedBranches,
};

function getArgs() {
  return args;
}

function isSoft() {
  return 's' in args || 'soft' in args;
}

function isNormal() {
  return 'n' in args || 'normal' in args;
}

function isForced() {
  return 'f' in args || 'force' in args;
}

function isNoModeSelected() {
  return !isSoft() && !isNormal() && !isForced();
}

function getModeString() {
  if (isSoft()) return 'SOFT';
  if (isNormal()) return 'NORMAL';
  if (isForced()) return 'FORCED';
}

function getPath() {
  return args.path;
}

function hasProtected() {
  return 'protect' in args;
}

function getProtectedBranches() {
  return args.protect;
}