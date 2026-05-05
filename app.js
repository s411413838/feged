// 模型配置
const MODEL_URL = './112/model.json';
const METADATA_URL = './112/metadata.json';

// 狀態管理
let model = null;
let isModelLoaded = false;
let currentImage = null;
let isWebcamActive = false;
let webcamStream = null;

// DOM 元素
const cameraBtn = document.getElementById('cameraBtn');
const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsSection = document.getElementById('resultsSection');
const resultsList = document.getElementById('resultsList');
const mainLabel = document.getElementById('mainLabel');
const mainConfidence = document.getElementById('mainConfidence');
const newClassificationBtn = document.getElementById('newClassificationBtn');
const webcam = document.getElementById('webcam');

// 類別標籤對應
const categoryEmojis = {
    'trash': '🗑️',
    'shoes': '👠',
    'plastic': '♻️',
    'paper': '📄',
    'metal': '⚙️',
    'glass': '🥃',
    'clothes': '👕',
    'cardboard': '📦',
    'biological': '🌿',
    'battery': '🔋'
};

// 初始化應用
async function init() {
    try {
        console.log('正在載入模型...');
        const model_URL = MODEL_URL;
        const metadata_URL = METADATA_URL;

        model = await tmImage.load(model_URL, metadata_URL);
        isModelLoaded = true;
        console.log('模型已成功載入');
        console.log('類別:', model.getClassLabels());
    } catch (error) {
        console.error('載入模型失敗:', error);
        alert('模型載入失敗，請檢查網絡連接');
    }
}

// 上傳圖片按鈕
uploadBtn.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            showPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// 相機按鈕
cameraBtn.addEventListener('click', async () => {
    if (!isWebcamActive) {
        try {
            webcamStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            webcam.srcObject = webcamStream;
            webcam.style.display = 'block';
            cameraBtn.textContent = '📸 拍照';
            isWebcamActive = true;
        } catch (error) {
            console.error('無法訪問相機:', error);
            alert('無法訪問相機，請檢查權限');
        }
    } else {
        // 拍照
        const canvas = document.createElement('canvas');
        canvas.width = webcam.videoWidth;
        canvas.height = webcam.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(webcam, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg');
        stopWebcam();
        showPreview(imageData);
    }
});

// 停止網絡攝像頭
function stopWebcam() {
    if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
        webcam.style.display = 'none';
        cameraBtn.textContent = '📷 使用相機';
        isWebcamActive = false;
    }
}

// 顯示預覽
function showPreview(imageData) {
    stopWebcam();
    currentImage = imageData;
    previewImage.src = imageData;
    previewContainer.style.display = 'block';
    resultsSection.style.display = 'none';
}

// 確認按鈕
confirmBtn.addEventListener('click', async () => {
    if (!isModelLoaded || !currentImage) {
        alert('模型未載入或沒有圖片');
        return;
    }

    previewContainer.style.display = 'none';
    loadingIndicator.style.display = 'flex';

    try {
        // 創建圖片元素用於模型分析
        const img = new Image();
        img.onload = async () => {
            const predictions = await model.predict(img);
            displayResults(predictions);
        };
        img.src = currentImage;
    } catch (error) {
        console.error('分類失敗:', error);
        alert('分類過程出錯');
    }
});

// 取消按鈕
cancelBtn.addEventListener('click', () => {
    previewContainer.style.display = 'none';
    currentImage = null;
});

// 重新識別按鈕
newClassificationBtn.addEventListener('click', () => {
    resultsSection.style.display = 'none';
    previewContainer.style.display = 'block';
});

// 顯示結果
function displayResults(predictions) {
    loadingIndicator.style.display = 'none';
    
    // 按置信度排序
    const sortedPredictions = predictions.sort((a, b) => b.probability - a.probability);
    
    // 主要結果
    const topPrediction = sortedPredictions[0];
    const label = topPrediction.className;
    const confidence = (topPrediction.probability * 100).toFixed(2);
    
    const emoji = categoryEmojis[label.toLowerCase()] || '📦';
    mainLabel.textContent = `${emoji} ${label}`;
    mainConfidence.textContent = `確信度: ${confidence}%`;

    // 詳細結果列表
    resultsList.innerHTML = '';
    sortedPredictions.forEach((prediction, index) => {
        const itemConfidence = (prediction.probability * 100).toFixed(2);
        const itemEmoji = categoryEmojis[prediction.className.toLowerCase()] || '📦';
        
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-item';
        if (index === 0) resultDiv.classList.add('primary');
        resultDiv.innerHTML = `
            <span class="result-item-label">${itemEmoji} ${prediction.className}</span>
            <span class="result-item-confidence">${itemConfidence}%</span>
        `;
        resultsList.appendChild(resultDiv);
    });

    resultsSection.style.display = 'block';
}

// 初始化應用
init();

// 清理資源
window.addEventListener('beforeunload', () => {
    stopWebcam();
});
