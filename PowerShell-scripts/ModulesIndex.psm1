$modules = @(
  "MyOthers.psm1",
  "MyGit.psm1",
  "MyAliases.psm1",
  "MyPrompt.psm1"
)

foreach($module in $modules) {
  Join-Path $PsModulesFolder $module | Import-Module
}
