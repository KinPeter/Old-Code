const cp = require('child_process');

const stdio = ['pipe', 'pipe', 'ignore'];

module.exports = {
  getBranches,
  filterProtected,
  softDeleteBranch,
  forceDeleteBranch,
};

function getBranches(cwd) {
  return cp.execSync('git branch', { cwd })
    .toString()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '' && !line.startsWith('*') && line !== 'master' && line !== 'develop');
}

function filterProtected(branches, protected) {
  const filteredBranches = [];
  branches.forEach((branch) => {
    if (!protected.includes(branch)) {
      filteredBranches.push(branch);
    }
  });
  return filteredBranches;
}

function softDeleteBranch(branch, cwd) {
  let result;
  try {
    result = cp.execSync(
      'git branch -d ' + branch,
      { cwd, stdio },
    ).toString();    
  } catch (error) {
    result = 'error';
  }
  return result !== 'error';
}

function forceDeleteBranch(branch, cwd) {
  let result;
  try {
    result = cp.execSync(
      'git branch -D ' + branch,
      { cwd, stdio },
    ).toString();
  } catch (error) {
    result = 'error';
  }
  return result !== 'error';
}
