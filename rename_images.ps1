# Renames all files in the target folder to 1.png, 2.png, 3.png ...
# Files are sorted by their current name before renaming.

$folder = "C:\Users\harih\Downloads\Photos-3-001\output"

$files = Get-ChildItem -Path $folder -File | Sort-Object Name

$i = 1
foreach ($f in $files) {
    $newName = "$i.png"
    Rename-Item -Path $f.FullName -NewName $newName
    Write-Host "  $($f.Name)  ->  $newName"
    $i++
}

Write-Host ""
Write-Host "Done! Renamed $($files.Count) files."
