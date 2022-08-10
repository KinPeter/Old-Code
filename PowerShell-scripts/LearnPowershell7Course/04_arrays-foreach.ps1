$arr1 = 1,10,84,44

$arr2 = 1..10

$processes = @(Get-Process)

$processes.Count
$arr2[3]

$arr1 += 32 # pushes the value to the array

$a = 1,2
$b = 3,4
$c = $a + $b # concats two arrays
$c

$arr1 = $null # delete the array

New-Item text.txt
$files = Get-ChildItem -File
foreach ($file in $files) {
  if ($file.Extension -eq ".txt") {
    Remove-Item $file # -WhatIf param won't delete the file just writes a line if it would do it
  }
}