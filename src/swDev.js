export default function swDev() {
    let swUrl = `${window.location.origin}/sw.js`;
    navigator.serviceWorker.register(swUrl)
        .then((response) => {
            console.log("Service Worker registered successfully", response);
        })
        .catch((error) => {
            console.error("Service Worker registration failed", error);
        });
}
