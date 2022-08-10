function Show-DateTime { 
  Write-Host "The current date and time:"
  Get-Date 
}
# Show-DateTime

function Get-ID {
  param (
    $name="notepad" # default value
  )
  Get-Process $name | Format-List ProcessName,Id
  
}