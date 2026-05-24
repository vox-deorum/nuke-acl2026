@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "HTML=%~1"
if not defined HTML set "HTML=%~dp0teaser.html"

set "OUTPUT=%~2"
if not defined OUTPUT set "OUTPUT=%~dp0teaser.png"

for %%I in ("%HTML%") do set "HTML=%%~fI"
for %%I in ("%OUTPUT%") do set "OUTPUT=%%~fI"

if not exist "%HTML%" (
  echo Could not find "%HTML%".
  exit /b 1
)

call :read_css_px "--crop-width:" WIDTH
if errorlevel 1 (
  echo Could not find --crop-width in "%HTML%".
  exit /b 1
)

call :read_css_px "--crop-height:" HEIGHT
if errorlevel 1 (
  echo Could not find --crop-height in "%HTML%".
  exit /b 1
)

set "BROWSER="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "BROWSER=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"

if not defined BROWSER (
  echo Could not find Chrome or Edge.
  exit /b 1
)

set "PROFILE=%TEMP%\teaser-export-%RANDOM%%RANDOM%"
mkdir "%PROFILE%" >nul 2>nul

set "URI=file:///%HTML:\=/%"

if exist "%OUTPUT%" del /q "%OUTPUT%" >nul 2>nul

"%BROWSER%" ^
  --headless=new ^
  --disable-gpu ^
  --disable-breakpad ^
  --disable-crash-reporter ^
  --disable-extensions ^
  --no-first-run ^
  --user-data-dir="%PROFILE%" ^
  --force-device-scale-factor=1 ^
  --window-size=%WIDTH%,%HEIGHT% ^
  --screenshot="%OUTPUT%" ^
  "%URI%"

if exist "%PROFILE%" rmdir /s /q "%PROFILE%" >nul 2>nul

if not exist "%OUTPUT%" (
  echo Browser completed without writing "%OUTPUT%".
  exit /b 1
)

echo Wrote "%OUTPUT%" at %WIDTH%x%HEIGHT%.
exit /b 0

:read_css_px
set "VALUE="
for /f "tokens=2 delims=:" %%A in ('findstr /C:"%~1" "%HTML%"') do (
  set "VALUE=%%A"
  goto read_css_done
)

:read_css_done
if not defined VALUE exit /b 1
set "VALUE=!VALUE: =!"
set "VALUE=!VALUE:px;=!"
set "%~2=!VALUE!"
exit /b 0
