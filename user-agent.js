function checkUserAgent() {
    const userAgent = navigator.userAgent;

    // Output the User-Agent to the console
    console.log(`User-Agent: ${userAgent}`);

    // Checking for the presence of "1inchWallet" in the User-Agent
    if (userAgent.includes('1inchWallet')) {
        console.log('1inch Wallet detected!');
    } else {
        console.log('1inch Wallet not detected.');
    }

// Checking the device (Apple or Android)
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        console.log('Device is Apple (iOS)');
    } else if (/Android/i.test(userAgent)) {
        console.log('Device is Android');
    } else {
        console.log('Device type could not be determined.');
    }
}
