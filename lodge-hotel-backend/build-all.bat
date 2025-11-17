@echo off
setlocal enabledelayedexpansion

:: Define your project folders here
set "FOLDERS=eureka-server gateway-service security-service lodge-hotel-restapi"

:: Optional: Set custom Maven home if needed
:: set "MAVEN_HOME=C:\apache-maven-3.x.x"
:: set "PATH=%MAVEN_HOME%\bin;%PATH%"

echo =====================================
echo Maven Build Script
echo =====================================
echo.

set SUCCESS_COUNT=0
set FAIL_COUNT=0
set FAILED_PROJECTS=

:: Loop through each folder
for %%F in (%FOLDERS%) do (
    echo.
    echo -------------------------------------
    echo Building: %%F
    echo -------------------------------------
    
    if exist "%%F" (
        cd "%%F"
        
        if exist "pom.xml" (
            echo Running: mvn clean package
            call mvn clean package -DskipTests
            
            if !ERRORLEVEL! EQU 0 (
                echo [SUCCESS] %%F built successfully
                set /a SUCCESS_COUNT+=1
            ) else (
                echo [FAILED] %%F build failed
                set /a FAIL_COUNT+=1
                set "FAILED_PROJECTS=!FAILED_PROJECTS! %%F"
            )
        ) else (
            echo [SKIPPED] No pom.xml found in %%F
        )
        
        cd ..
    ) else (
        echo [ERROR] Folder %%F does not exist
        set /a FAIL_COUNT+=1
        set "FAILED_PROJECTS=!FAILED_PROJECTS! %%F"
    )
)

:: Summary
echo.
echo =====================================
echo Build Summary
echo =====================================
echo Successful builds: %SUCCESS_COUNT%
echo Failed builds: %FAIL_COUNT%

if %FAIL_COUNT% GTR 0 (
    echo.
    echo Failed projects:%FAILED_PROJECTS%
    echo.
    echo Build completed with errors
) else (
    echo.
    echo All builds completed successfully!
)

echo.
pause