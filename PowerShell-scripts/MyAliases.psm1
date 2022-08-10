function Open-PowershellProfile { code $profile.CurrentUserCurrentHost }
Set-Alias -Name open-profile -Value Open-PowershellProfile

function Remove-DockerAll { docker rm $(docker ps -a -q) && docker rmi $(docker images -a -q) }
Set-Alias -Name docker-rma -Value Remove-DockerAll

Set-Alias -Name touch -Value New-Item

function Remove-ForceRecurse {
  [CmdletBinding()]
  [Alias("rm-rf")]
  param (
    $path
  )
  Remove-Item -Force -Recurse -Path $path
}