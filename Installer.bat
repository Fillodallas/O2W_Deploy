@echo off

title OpenIce2Web - Dependencies installer
cls

echo %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
echo[
echo    OpenIce2Web - Dependencies installer
echo[
echo %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

echo[
:PAUSE

:setDInit
set DInit=y & set /p DInit=Do you want to proceed with the Dependencies Initialization? (Y/n): 
if /i %DInit% == y (goto DIyes)
if /i %DInit% == n (goto closecall) else (goto setDInit)


:DIyes
call npm init -y

echo %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
echo[
echo    Initialization finished.
echo[
echo %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
echo[
echo[
echo[


:setDInstall
set DInst=y & set /p DInst=Do you want to start the Dependencies Installation? (Y/n): 

if /i %DInst% == y (goto DInityes)
if /i %DInst% == n (goto closecall) else (goto setDInstall)


:DInityes
call npm install

echo[

echo %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
echo[
echo    Dependencies installation finished.
echo    Press any key to create the Server Launcher
echo[
echo %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

echo[

:PAUSE
pause >nul

:: CREATE START.BAT FILE

type NUL>start.bat
echo @echo off>>start.bat
echo title OpenIce2Web>>start.bat
echo cls>>start.bat
echo call npm run nodemon>>start.bat

echo Done!
echo Press any key to close the installation prompt 

:PAUSE
pause >nul
exit

:closecall
echo Press any key to close the installation prompt
pause >nul
exit

