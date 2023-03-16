# OpenIce2Web

This program facilitates communication between a program written in Java (Open ICE) and a JavaScript server.
The data transmitted by the OpenIce program is displayed by a Webpage served by the server.

## Setup Instruction:


### OpenIce Setup
0. Install OpenICE: 
   Install Oracle Java 8 Development Kit (JDK) ( available for free here: https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html ). **It needs to be Java      8, not a later version.**
   Download the latest version of OpenICE from github: https://github.com/mdpnp/mdpnp.git.
   Make sure your JAVA_HOME is configured to use the Oracle Java 8 JVM (https://www.thewindowsclub.com/set-java_home-in-windows-10).

1. Replace OpenICE modules:
    - REPLACE **DataCollectorApp.java** in the installation folder: ~\mdpnp-master\interop-lab\demo-apps\src\main\java\org\mdpnp\apps\testapp\export\DataCollectorApp.java
    - REPLACE **SimMultiparameter.java** in the installation folder: ~\mdpnp-master\interop-lab\demo-devices\src\main\java\org\mdpnp\devices\simulation\multi\SimMultiparameter.java
    - ADD **WebAddress.java** to the installation folder: ~\mdpnp-master\data-types\x73-idl-rti-dds\src\main\java\org\mdpnp\rtiapi\data\

   
### NodeJS - Server setup

1. Install NodeJS (used version: 16.18.0, later versions are OK) from https://nodejs.org/en/

2. Verify that NodeJS is correctly installed running the following code in the Command Prompt:
    ```
    npm -v
    ```
    In case of error open: **Node.js command prompt** which will set the correct enviroment (if NodeJS has been installed correctly you'll find it in the windows search bar). 
    Then try again to run the previous line code in a new **Command Prompt** 



2. Install the Dependencies:
    Run the file **Installer.bat** and follow the instructions. 
    <!--
    Open the terminal, go to the **folder containing the JS file** and run the following commands:
    ```
    npm init -y
    npm install
    ```
    -->
   
    <!--
    If it does not work run this ==> but npm install should do the trick!!
    npm install ws 
    npm install http 
    npm install express
    npm install socket.io
    npm install ejs
    npm install path
    
    -->

3. Run the server: If the prevous point was successful a file named **start.bat** should have been created. Run it.
    <!--
        ```
    node app.js
    ```
    or the command
    ```
    npm run nodemon
    ```
    -->



## Demo:
0. To enable client/server communication between two terminals, the following files **must be modified**:
    - **WebAddress.java** (~\mdpnp-master\data-types\x73-idl-rti-dds\src\main\java\org\mdpnp\rtiapi\data\WebAddress.java)
    - Modify **HOST_add** value with the host IPv4 used by the NodeJS HOST (**MUST BE A STRING**)
1. Open a terminal, navigate to the OpenICE folder, and run ‘.\gradlew run’. Gradle will download any other dependencies, build the application, and launch it.
2. Connect your Medical Monitor or create a device adapter. Open the "Data Recorder" module and select the parameter you wish to transfer.



https://user-images.githubusercontent.com/92895058/218145204-1da800c9-b67d-4ee1-a6b3-f4253b738488.mp4


## Create app.exe file [Optional]
0. Downgrade to Python 3.10.8 or lower (This method does not work with Python 11).
1. Install latest release of NASM (tried with V. 2.15.04) from: https://www.nasm.us/pub/nasm/releasebuilds/?C=M;O=D
2. Open terminal and run the command:
    ```
    npm install -g nexe
    ```
3. Open **command prompt** move to the folder containing app.js file 
4. Still in **command prompt** run the following line:
    ```
    nexe app.js -r "public/config/*.js" -r "public/css/*.css" -r "public/img/*.png" -r "public/img/*.ico" -r "public/js/*.js" -r "routes/*.js" -r "views/*.html" --build
    ```
