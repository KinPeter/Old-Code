#Thanks to @tamj0rd2 from StackOverflow for this function
function Write-BranchName () {
  try {
    $branch = git rev-parse --abbrev-ref HEAD

    if ($branch -eq "HEAD") {
      # we're probably in detached HEAD state, so print the SHA
      $branch = git rev-parse --short HEAD
      Write-Host " ($branch)" -NoNewline -ForegroundColor "red"
    }
    else {
      # we're on an actual branch, so print it
      Write-Host " ($branch)" -NoNewline -ForegroundColor "red"
    }
  }
  catch {
    # we'll end up here if we're in a newly initiated git repo
    Write-Host " (no branches yet)" -NoNewline -ForegroundColor "yellow"
  }
}

function Write-GitStatus () {
  $status = git status -s
  $a = $status | egrep -c "^(A |AM) "
  $m = $status | grep -c "^ M"
  $d = $status | grep -c "^ D"
  $u = $status | grep -c "^??"

  if ($a -gt 0 -or $m -gt 0 -or $d -gt 0 -or $u -gt 0) {
    Write-Host " (!" -NoNewline -ForegroundColor Red
    if ($a -gt 0) { Write-Host "$a" -NoNewline -ForegroundColor DarkGreen }
    if ($m -gt 0) { Write-Host "$m" -NoNewline -ForegroundColor DarkYellow }
    if ($d -gt 0) { Write-Host "$d" -NoNewline -ForegroundColor DarkRed }
    if ($u -gt 0) { Write-Host "$u" -NoNewline -ForegroundColor DarkMagenta }
    Write-Host "↑)" -NoNewline -ForegroundColor Red
  }
  Write-Host " " # add new line anyway
}

function prompt {
  $base = "PS "
  $user = "$env:UserName@$env:ComputerName "
  $path = "$($executionContext.SessionState.Path.CurrentLocation)/"
  $path = $path.Replace($env:UserProfile, "~")
  $path = $path.Replace("C:\", "")
  $path = $path.Replace("\", "/")

  $userPrompt = "$('$' * ($nestedPromptLevel + 1)) "

  Write-Host "`n$base" -NoNewline
  Write-Host "$user" -NoNewline -ForegroundColor "green"

  if (Test-Path .git) {
    Write-Host $path -NoNewline -ForegroundColor "blue"
    Write-BranchName
    Write-GitStatus
  }
  else {
    # we're not in a repo so don't bother displaying branch name/sha
    Write-Host $path -ForegroundColor "blue"
  }

  return $userPrompt
}