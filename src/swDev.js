export default function swDev() {
    let swUrl = `${window.location.origin}/sw.js`; // Use window.location.origin instead
    navigator.serviceWorker.register(swUrl)
        .then((response) => {
            console.warn("Service Worker registered successfully", response);
        })
        .catch((error) => {
            console.error("Service Worker registration failed", error);
        });
}
