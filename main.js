import { BrowserProvider } from 'ethers';

async function getWalletAddress() {
    // Проверяем, доступен ли объект window.ethereum
    if (typeof window.OneInchIOSWallet !== 'undefined') {
        try {
            // Создаем провайдера для браузера
            const provider = new BrowserProvider(window.ethereum);

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
