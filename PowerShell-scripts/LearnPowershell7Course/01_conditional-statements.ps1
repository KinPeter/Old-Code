[int]$a = Read-Host "Enter a number"
if ($a -gt 5) {
  Write-Host "The value $a is greater than 5."
}
elseif ($a -eq 5) {
  Write-Host "The value $a is equal to 5."
}
else {
  Write-Host "The value $a is less than 5."
}

$process_name = Read-Host "Enter the name of your application"
$process_object = Get-Process $process_name
if ($process_object.Responding) {
  Write-Host "$process_name is working correctly"
} else {
  $process_object.Kill()
  Write-Host "$process_name is unresponsive, closing..."
}