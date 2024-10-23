// Функция для проверки наличия injected provider (например, 1inch Wallet или MetaMask)
function checkEthereumProvider() {
    const providerInfoDiv = document.getElementById('provider-info');

    if (window.ethereum?.OneInchIOSWallet) {
        providerInfoDiv.textContent = 'Injected provider detected!';
    } else {
        providerInfoDiv.textContent = 'provider not  v2';
    }
}

// Функция для проверки User-Agent
function checkUserAgent() {
    const userAgent = navigator.userAgent;
    const userAgentInfoDiv = document.getElementById('user-agent-info');
    const deviceInfoDiv = document.getElementById('device-info');
    const walletInfoDiv = document.getElementById('wallet-info');

    // Выводим User-Agent
    userAgentInfoDiv.textContent = `User-Agent: ${userAgent}`;

    // Проверяем наличие "1inchWallet" в User-Agent
    if (userAgent.includes('1inchWallet')) {
        walletInfoDiv.textContent = '1inch Wallet detected!';
    } else {
        walletInfoDiv.textContent = '1inch Wallet not detected.';
    }

    // Проверяем устройство (Apple или Android)
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        deviceInfoDiv.textContent = 'Device is Apple (iOS)';
    } else if (/Android/i.test(userAgent)) {
        deviceInfoDiv.textContent = 'Device is Android';
    } else {
        deviceInfoDiv.textContent = 'Device type could not be determined.';
    }
}

// async function getWalletAddress() {
//     // Проверяем, существует ли объект window.ethereum
//     if (typeof window.ethereum?.OneInchIOSWallet !== 'undefined') {
//         try {
//             // Запрашиваем доступ к аккаунтам
//             const accounts = await window.ethereum?.OneInchIOSWallet.request({ method: 'eth_requestAccounts' });
//             const walletAddress = accounts[0]; // Получаем первый аккаунт
//             document.getElementById("walletAddress").textContent = walletAddress; // Выводим адрес на экран
//         } catch (error) {
//             console.error("Ошибка при запросе доступа к кошельку:", error);
//             document.getElementById("walletAddress").textContent = 'Ошибка при подключении к кошельку';
//         }
//     } else {
//         // Если MetaMask или другой Web3-кошелек не установлен
//         alert("Убедитесь, что у вас установлен кошелек, такой как MetaMask или 1inch Wallet");
//         document.getElementById("walletAddress").textContent = 'Кошелек не найден';
//     }
// }


async function getWalletAddress() {
    // Проверяем, доступен ли объект window.ethereum
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Создаем провайдера на основе Metamask или другого кошелька
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Запрашиваем доступ к кошельку
            await provider.send("eth_requestAccounts", []);

            // Создаем signer (управление аккаунтом)
            const signer = provider.getSigner();

            // Получаем адрес кошелька
            const walletAddress = await signer.getAddress();

            // Выводим адрес на страницу
            document.getElementById("walletAddress").textContent = walletAddress;

        } catch (error) {
            console.error("Ошибка при подключении к кошельку:", error);
            document.getElementById("walletAddress").textContent = 'Ошибка подключения';
        }
    } else {
        // Если кошелек не найден, выводим сообщение
        alert("Web3 кошелек не найден. Установите MetaMask или 1inch Wallet.");
        document.getElementById("walletAddress").textContent = 'Кошелек не найден';
    }
}

// Добавляем обработчик события на кнопку
document.getElementById("connectButton").addEventListener("click", () => {
    getWalletAddress();
});


// Добавляем обработчик события на кнопку
document.getElementById("connectButton").addEventListener("click", () => {
    console.log('Кнопка нажата');
    getWalletAddress();
});
document.getElementById("connectButton").addEventListener("click", getWalletAddress);


// Первоначальная проверка провайдера и User-Agent
checkEthereumProvider();
checkUserAgent();
getWalletAddress();
