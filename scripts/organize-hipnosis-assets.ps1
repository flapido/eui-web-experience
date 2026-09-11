$ErrorActionPreference = "Stop"

$Project = "C:\Dev\Projects\eui-web-experience"

$Incoming = Join-Path $Project "assets\incoming"
$References = Join-Path $Project "assets\references\hipnosis"
$Public = Join-Path $Project "public\assets\hipnosis"
$QaScreenshots = Join-Path $Project "docs\qa\screenshots"

Write-Host ""
Write-Host "EUI / HIPNOSIS ASSET ORGANIZER" -ForegroundColor Cyan
Write-Host "Project: $Project"
Write-Host ""

# --------------------------------------------------
# Crear estructura
# --------------------------------------------------

$Folders = @(
    $Incoming,
    $References,
    $Public,
    $QaScreenshots
)

foreach ($Folder in $Folders) {
    if (!(Test-Path $Folder)) {
        New-Item -ItemType Directory -Path $Folder -Force | Out-Null
        Write-Host "[CREATE] $Folder" -ForegroundColor Green
    }
    else {
        Write-Host "[EXISTS] $Folder" -ForegroundColor DarkGray
    }
}

# --------------------------------------------------
# Mapeo incoming -> references
# --------------------------------------------------

$Assets = @{
    "horses.png"        = "horses-reference.png"
    "listening-room.png" = "listening-room-reference.png"
    "vinyl-cover.png"   = "vinyl-cover-reference.png"
    "vinyl-record.png"  = "vinyl-record-reference.png"
    "icon.png"          = "icon-reference.png"
}

Write-Host ""
Write-Host "Organizando referencias..." -ForegroundColor Cyan

foreach ($SourceName in $Assets.Keys) {

    $Source = Join-Path $Incoming $SourceName
    $DestinationName = $Assets[$SourceName]
    $Destination = Join-Path $References $DestinationName

    if (Test-Path $Source) {

        if (Test-Path $Destination) {
            $Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
            $Backup = "$Destination.$Timestamp.bak"

            Copy-Item $Destination $Backup
            Write-Host "[BACKUP] $DestinationName" -ForegroundColor Yellow
        }

        Move-Item $Source $Destination -Force
        Write-Host "[MOVE] $SourceName -> $DestinationName" -ForegroundColor Green
    }
    else {
        Write-Host "[MISSING] $SourceName" -ForegroundColor Yellow
    }
}

# --------------------------------------------------
# Crear README para el agente
# --------------------------------------------------

$Readme = Join-Path $References "README.md"

@"
# HIPNOSIS — Visual References

These files are OWNER-PROVIDED VISUAL REFERENCES.

Do not use Instagram screenshots directly as production artwork unless explicitly authorized.

## Files

- horses-reference.png
  Graphic horse/silhouette composition. Primary reference for HIPNOSIS visual language.

- listening-room-reference.png
  Listening-room photograph. Candidate reference for Contact / closing scene.

- vinyl-cover-reference.png
  Physical sleeve / cover reference.

- vinyl-record-reference.png
  Translucent vinyl / physical-object reference.

- icon-reference.png
  Small visual mark / icon reference.

## Production assets

Clean or recreated web-ready assets must be stored in:

public/assets/hipnosis/

Suggested production names:

- horses-clean.svg
- horses-clean.png
- vinyl-cover-clean.png
- vinyl-record-clean.png
- listening-room-clean.png
- icon-mark.svg
- icon-mark.png

Do not overwrite reference files.
"@ | Set-Content -Path $Readme -Encoding UTF8

Write-Host ""
Write-Host "[OK] README created:" -ForegroundColor Green
Write-Host $Readme

# --------------------------------------------------
# Resultado
# --------------------------------------------------

Write-Host ""
Write-Host "FINAL STRUCTURE" -ForegroundColor Cyan
Write-Host ""

Get-ChildItem `
    (Join-Path $Project "assets") `
    -Recurse `
    -File |
    Select-Object FullName

Write-Host ""
Write-Host "Production asset directory:" -ForegroundColor Cyan
Write-Host $Public

Write-Host ""
Write-Host "DONE" -ForegroundColor Green