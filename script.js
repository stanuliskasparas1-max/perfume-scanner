let scannedCode = "";

function onScanSuccess(decodedText, decodedResult) {
    scannedCode = decodedText;
    document.getElementById("result").innerText = "Scanned: " + scannedCode;
}

function onScanFailure(error) {
    // Fail silently
}

function confirmSale() {
    if (!scannedCode) {
        alert("Please scan a code first!");
        return;
    }
    const ml = document.getElementById("ml").value;

    // Replace with your Apps Script Web App URL
    const url = "YOUR_GOOGLE_APPS_SCRIPT_URL" +
        "?barcode=" + encodeURIComponent(scannedCode) +
        "&ml=" + encodeURIComponent(ml) +
        "&qty=1&confirm=1";

    fetch(url)
        .then(res => res.text())
        .then(data => {
            alert("Sale saved!");
            scannedCode = "";
            document.getElementById("result").innerText = "";
        })
        .catch(err => alert("Error: " + err));
}

window.onload = function() {
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
};
