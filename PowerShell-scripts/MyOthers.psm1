function Set-SshToPersonal() {
  [CmdletBinding()]
  [Alias("ssh-personal", "ssh-p")]
  param()

  try {
    if (-NOT [System.IO.File]::Exists("$Env:USERPROFILE\.ssh\id_rsa_personal")) {
      throw "error"
    }
    Move-Item $Env:USERPROFILE\.ssh\id_rsa $Env:USERPROFILE\.ssh\id_rsa_work -ErrorAction Stop
    Move-Item $Env:USERPROFILE\.ssh\id_rsa.pub $Env:USERPROFILE\.ssh\id_rsa.pub_work -ErrorAction Stop
    Move-Item $Env:USERPROFILE\.ssh\id_rsa_personal $Env:USERPROFILE\.ssh\id_rsa -ErrorAction Stop
    Move-Item $Env:USERPROFILE\.ssh\id_rsa.pub_personal $Env:USERPROFILE\.ssh\id_rsa.pub -ErrorAction Stop
    Write-Host "[+] Default SSH key set to personal" -ForegroundColor "green"
  }
  catch {
    Write-Host "[-] Couldn't change default SSH key" -ForegroundColor "red"
  }
}

function Set-SshToWork() {
  [CmdletBinding()]
  [Alias("ssh-work", "ssh-w")]
  param()

  try {
    if (-NOT [System.IO.File]::Exists("$Env:USERPROFILE\.ssh\id_rsa_work")) {
      throw "error"
    }
    Move-Item $Env:USERPROFILE\.ssh\id_rsa $Env:USERPROFILE\.ssh\id_rsa_personal -ErrorAction Stop
    Move-Item $Env:USERPROFILE\.ssh\id_rsa.pub $Env:USERPROFILE\.ssh\id_rsa.pub_personal -ErrorAction Stop
    Move-Item $Env:USERPROFILE\.ssh\id_rsa_work $Env:USERPROFILE\.ssh\id_rsa -ErrorAction Stop
    Move-Item $Env:USERPROFILE\.ssh\id_rsa.pub_work $Env:USERPROFILE\.ssh\id_rsa.pub -ErrorAction Stop
    Write-Host "[+] Default SSH key set to work" -ForegroundColor "green"
  }
  catch {
    Write-Host "[-] Couldn't change default SSH key" -ForegroundColor "red"
  }
}

# source for linux like ls output
# https://superuser.com/questions/1325217/how-to-produce-a-linux-like-ls-output-in-powershell/1325363

$font_color = @{
  default       = "`e[39m";
  black         = "`e[30m";
  red           = "`e[31m";
  green         = "`e[32m";
  yellow        = "`e[33m";
  blue          = "`e[34m";
  magenta       = "`e[35m";
  cyan          = "`e[36m";
  light_grey    = "`e[37m";
  dark_grey     = "`e[90m";
  light_red     = "`e[91m";
  light_green   = "`e[92m";
  light_yellow  = "`e[93m";
  light_blue    = "`e[94m";
  light_magenta = "`e[95m";
  light_cyan    = "`e[96m";
  white         = "`e[97m";
}

function Update-ColorOfName {
  param (
    $obj
  )
  if (($obj.Name -match "^\..*" -or $obj.Mode -like "*h*") -and $obj.Mode -like "*d*") {
    return ($font_color.yellow + $obj.Name + $font_color.default)
  }
  elseif ($obj.Name -match "^\..*" -or $obj.Mode -like "*h*") {
    return ($font_color.dark_grey + $obj.Name + $font_color.default)
  }
  elseif ($obj.Mode -like "*l*") {
    return ($font_color.light_blue + $obj.Name + $font_color.default)
  }
  elseif ($obj.Mode -like "*d*") {
    return ($font_color.light_yellow + $obj.Name + $font_color.default)
  }
  elseif ($obj.Name -match ".*\.(exe|bat|sh|ps1|msi)$") {
    return ($font_color.green + $obj.Name + $font_color.default)
  }
  elseif ($obj.Name -match ".*\.(jsx?|tsx?|vue|svelte|py|go|java)$") {
    return ($font_color.light_cyan + $obj.Name + $font_color.default)
  }
  elseif ($obj.Name -match ".*\.(json|ya?ml|config|xml)$") {
    return ($font_color.light_magenta + $obj.Name + $font_color.default)
  }
  elseif ($obj.Name -match ".*\.(html|s?css)$") {
    return ($font_color.cyan + $obj.Name + $font_color.default)
  }
  else {
    return $obj.Name
  }
}

function Get-Children {
  [CmdletBinding()]
  [Alias("ls")]
  param (
    $path
  )
  $ls = Get-ChildItem $path -Force
  foreach ($item in $ls) {
    $transformed = Update-ColorOfName($item)
    $item | Add-Member -MemberType NoteProperty -Name TransformedName -Value $transformed
  }
  return $ls | Format-Wide -AutoSize -Property TransformedName
}