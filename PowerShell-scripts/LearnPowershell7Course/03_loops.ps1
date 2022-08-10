# for (<init>; <condition>; <repeat>) {
#   <commands block>
# }

for ($i = 1; $i -le 5; $i++) {
  Write-Host $i
}

for ($i = 1; $i -le 5; $i++) {
  $name = "File_$i.txt"
  $path = Join-Path -Path "$Env:USERPROFILE\Desktop" -ChildPath "$name"
  New-Item $path -ItemType File
  Write-Host "$name is created at: $path"
}

while ($true) {
  Write-Host "Hi!"
  Start-Sleep 1 # sleep 1 second
}

$var = 1
while ($var -ne 0) {
  $var = Read-Host "Enter a number, 0 to exit."
}

$var = 0
do {
  $var = Read-Host "Enter a number, 0 to exit."
}
while ($var -ne 0) 

$var = 0
do {
  $var = Read-Host "Enter 0, any other number to exit."
}
until ($var -ne 0) 