const prompt = require('prompt-sync')();

const git = require('./modules/git');
const args = require('./modules/args');
const log = require('./modules/log');

let branches;

try {
  branches = git.getBranches(args.getPath());
} catch (error) {
  log.red('\n[-] Error: The path is incorrect or there is no git initialized.\n');
  process.exit(0);
}


if (args.hasProtected()) {
  branches = git.filterProtected(branches, args.getProtectedBranches());
}

if (!branches.length) {
  log.red('\n[-] No branch found that could be deleted. Exiting...\n');
  process.exit(0);
}

log.linebreak();

log.def(`[+] Local branches found${args.hasProtected() ? ', that are not protected' : ''}:`);
branches.forEach((branch) => {
  log.green(' - ' + branch);
});

log.linebreak();

if (args.hasProtected()) {
  log.def(`[+] Protected branches:`);
  args.getProtectedBranches().forEach((branch) => {
    log.cyan(' - ' + branch);
  });
  log.linebreak();
}

let mode;
if (args.isNoModeSelected()) {
  mode = 'NORMAL';
} else {
  mode = args.getModeString();
}

const continueInMode = prompt(`[+] Can we continue in ${mode} mode? (Y/n) `, 'y');
if (continueInMode.toLowerCase() !== 'y') {
  log.red('\n[-] Exiting.... Bye!');
  process.exit(0);
}

log.linebreak();

if (args.isSoft()) {
  branches.forEach((branch) => {
    const success = git.softDeleteBranch(branch, args.getPath());
    if (success) {
      log.green(`[+] Deleted branch "${branch}"`);
    } else {
      log.cyan(`[+] Kept branch "${branch}"`);
    }
  })
}

if (args.isForced()) {
  branches.forEach((branch) => {
    const success = git.forceDeleteBranch(branch, args.getPath());
    if (success) {
      log.green(`[+] Deleted branch "${branch}"`);
    } else {
      log.red(`[-] Could not delete branch "${branch}"`);
    }
  })
}

if (args.isNormal() || args.isNoModeSelected()) {
  branches.forEach((branch) => {
    const success = git.softDeleteBranch(branch, args.getPath());
    if (success) {
      log.green(`[+] Deleted branch "${branch}"`);
    } else {
      log.red(`[-] Could not delete branch "${branch}"`);
      const answer = prompt('[+] Do you want to force delete it? (Y/n) ', 'y');
      if (answer.toLowerCase() !== 'y') {
        log.cyan(`[+] Kept branch "${branch}"`);
      } else {
        const forceSuccess = git.forceDeleteBranch(branch, args.getPath());
        if (forceSuccess) {
          log.green(`[+] Force-deleted branch "${branch}"`);
        } else {
          log.red(`[-] Could not delete branch "${branch}. Please try to do it manually."`);
        }
      }
    }
  });
}

log.linebreak();
