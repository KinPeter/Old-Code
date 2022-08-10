const chalk = require('chalk');

module.exports = {
  red,
  green,
  blue,
  cyan,
  def,
  linebreak,
};

function red(message) {
  console.log(chalk.redBright(message));
}
function green(message) {
  console.log(chalk.green(message));
}
function blue(message) {
  console.log(chalk.blueBright(message));
}
function cyan(message) {
  console.log(chalk.cyan(message));
}
function def(message) {
  console.log(message);
}
function linebreak() {
  console.log('\n');
}