@echo off
setlocal

if "%~1"=="" (
    echo Por favor, arraste e solte um arquivo de texto neste script.
    pause
    exit /b 1
)

set TS_NODE_PATH=C:\development\licensing-csv-generator\node_modules\.bin\ts-node
set SCRIPT_PATH=C:\development\licensing-csv-generator\src\main.ts

:: Chama o script Node.js com o arquivo de texto como argumento
"%TS_NODE_PATH%" "%SCRIPT_PATH%" "%~1"

pause
