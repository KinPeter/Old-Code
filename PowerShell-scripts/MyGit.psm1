function Get-BranchByIssue {
  [CmdletBinding()]
  [Alias("git-co")]
  param(
    [Parameter(Mandatory=$true)][string]$issueNumber
  )

  $branch = git branch -a | grep -m 1 $issueNumber

  if ($branch.length -lt 1) {
    Write-Host "[-] No such branch found." -ForegroundColor "red"
    return 
  }
  if ($branch -Match "remotes/origin") {
    $path = $branch.Substring(17)
  } else {
    $path = $branch.Substring(2)
  }
  Write-Host "[+] Changing to branch $path ... `n" -ForegroundColor "green"
  git checkout $path
}

function Get-BranchForReview {
  [CmdletBinding()]
  [Alias("git-review")]
  param(
    [Parameter(Mandatory = $true)][string]$issueNumber
  )

  Write-Host "`n[+] Fetching from origin... `n" -ForegroundColor "green"
  git fetch

  $branch = git branch -a | grep -m 1 $issueNumber

  if ($branch.length -lt 1) {
    Write-Host "[-] No such branch found." -ForegroundColor "red"
    return 1
  }

  if ($branch -Match "remotes/origin") {
    $path = $branch.Substring(10)
    Write-Host "`n[+] Changing to remote branch $path ...`n" -ForegroundColor "green"
    git checkout $path
  }
  else {
    Write-Host "[-] Branch is checked out locally." -ForegroundColor "red"
    return 1
  }
  return 0
}

function Start-PullFromOrigin {
  [CmdletBinding()]
  [Alias("git-pulo")]
  param ()
  $branch = git rev-parse --abbrev-ref HEAD
  Write-Host "[+] Pulling $branch from origin..." -ForegroundColor "green"
  git pull origin $branch
}