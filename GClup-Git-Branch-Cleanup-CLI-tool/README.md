## GClup - Git branch cleanup

This is a simple Node.js CLI tool which I created solely for my convenience. It's main job is to clean up local branches in a project folder where git is initialized.

> Please use it at your own risk - I can't say it is thoroughly tested.

### Usage:

For Windows, download the latest `gclup.exe` from the releases, or for any OS, just clone this repository and build an executable for yourself using [pkg](https://www.npmjs.com/package/pkg). Put the executable to any folder as you like, add that folder to your PATH. Now you can call GClup from anywhere using the parameters below: 

#### Path (mandatory):
`--path, -p` *[string] [required]* Absolute path to the git project directory.    

#### Soft mode:
`--soft, -s` *[boolean]* Delete only merged branches (which is possible with -d flag), don't try to delete the others.

#### Normal mode (default):
`--normal, -n` *[boolean]* Delete all merged branches, and ask if you want to force delete those which are not merged yet.

#### Force mode:
`--force, -f` *[boolean]* Delete all branches without asking anything (apply -D flag for each branch). 

#### Protected branches:
`--protect` *[array]* Protected branch(es) that should not be deleted. List them separated by spaces, like `--protect staging feature/project-123 etc`

#### Options:
`--help` *[boolean]* Show help 

`--version` *[boolean]* Show version number

> **NOTE**: By default, `master`, `develop` and the currently checked out branch will not be
deleted.

### Examples:

#### Most basic usecase: 
`> gclup -p C:\path\to\my\project`

The tool starts in normal mode in the given path, that means deleting all already merged branches but asking a question at those which are not merged yet, wether you want to force delete them or not.


#### Protecting branches, but delete all others:
`> gclup -p C:\path\to\my\project -f --protect feature/ABC-123-still-working bug/ABC-124-dont-delete-this`

The tool will start in force mode, it will keep `ABC-123` and `ABC-124` branches because they are protected, but delete all other branches no matter if they are already merged or not.