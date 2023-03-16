/**
 * Get local IP address, while ignoring vEthernet IP addresses (like from Docker, etc.)
 */

//#region Automatic detection of IPv4 address


var
    // Local IP address that we're trying to calculate
    ip_address
    // Provides a few basic operating-system related utility functions (built-in)
    ,os = require('os')
    // Network interfaces
    ,ifaces = os.networkInterfaces();


// Iterate over interfaces ...
for (var dev in ifaces) {

    // ... and find the one that matches the criteria
    var iface = ifaces[dev].filter(function(details) {
        return details.family === 'IPv4' && details.internal === false;
    });

    if(iface.length > 0)
        ip_address = iface[0].address;
}

//#endregion Automatic detection of IPv4 address


const webHOST = ip_address;
const webPORT = 3030;

const javaHOST = webHOST;
const javaPORT = 8080;

exports.webHOST = webHOST;
exports.webPORT = webPORT;

exports.javaHOST = javaHOST;
exports.javaPORT = javaPORT;
