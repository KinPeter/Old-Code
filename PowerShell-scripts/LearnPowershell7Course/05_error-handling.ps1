$name = Read-Host "Enter a name for the file"
$path = Read-Host "Enter a path"
try {
  # -ErrorAction Stop will force the catch block executed even if the exception is not a terminating exception
  New-Item -Path $path -Name $name -ItemType File -ErrorAction Stop
}
catch {
  Write-Host "An error occured"
}
finally {
  Write-Host "An action was attempted to create a file at $(Get-Date)"
}
Write-Host "Done."