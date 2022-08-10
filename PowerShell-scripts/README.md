## Loading modules, functions, aliases

* Open your PS profile, eg:
```
notepad $profile.CurrentUserAllHosts
```

> If you get an error `"The system cannot find the path specified"` that means there is no profile set up yet. In this case you have to create one first, for example with this script:
```
mkdir $HOME/Documents/PowerShell &&
cd $HOME/Documents/PowerShell &&
new-item Profile.ps1 &&
notepad $PROFILE.CurrentUserAllHosts
```
- Or you can choose an other type of profile, [more info about profiles here](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles).

* Once you have the file open, add the following lines to it:
```
# Path to the folder where the PS modules are located:
$PsModulesFolder = "D:\path\to\my\modules"

# Command to import those modules on each shell start:
Import-Module $PsModulesFolder\ModulesIndex.psm1
```
