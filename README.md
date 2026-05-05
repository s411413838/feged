# 🚀 垃圾分類識別應用

純前端 AI 圖像識別應用程式，使用 Teachable Machine 訓練的模型來識別垃圾分類。

## 📋 功能特色

- ✅ **純前端應用** - 無需後端服務器，完全在瀏覽器中運行
- 📷 **相機拍照** - 直接使用設備相機拍照識別
- 📁 **圖片上傳** - 上傳本地圖片進行分類
- 🎯 **實時識別** - 快速的 AI 辨識結果
- 📊 **詳細分析** - 顯示所有類別的置信度
- 📱 **響應式設計** - 支援桌面和移動設備

## 🎓 識別類別

應用程式可以識別以下 10 種物品：

1. 🗑️ **垃圾/其他** - 壞掉或無法分類的物品
2. 👠 **鞋子** - 各種類型的鞋類
3. ♻️ **塑料** - 塑膠製品和包裝
4. 📄 **紙張** - 紙質物品
5. ⚙️ **金屬** - 金屬製品
6. 🥃 **玻璃** - 玻璃和陶瓷製品
7. 👕 **衣服** - 穿著物品和紡織品
8. 📦 **紙板** - 紙板和硬紙板
9. 🌿 **生物** - 有機和生物分解物質
10. 🔋 **電池** - 電池和電子廢料

## 🚀 快速開始

### 本地運行

1. 克隆或打開此項目
2. 使用任何 HTTP 服務器 (例如 Live Server) 啟動應用：

   ```bash
   # 使用 Python
   python -m http.server 8000
   # 或
   python3 -m http.server 8000
   ```

   ```bash
   # 使用 Node.js
   npx http-server
   ```

3. 打開瀏覽器訪問 `http://localhost:8000`

### 在線使用

- 直接在支援的平台上部署此文件夾
- 例如：GitHub Pages、Vercel、Netlify 等

## 📁 項目結構

```
feged/
├── index.html          # 主 HTML 文件 - 應用界面
├── style.css           # 樣式表 - 美化界面
├── app.js              # 應用邏輯 - 核心功能
├── 112/
│   ├── model.json      # AI 模型結構
│   └── metadata.json   # 模型元數據
└── README.md           # 本文件
```

## 💻 技術棧

- **前端框架**: 純 HTML5 + CSS3 + JavaScript (ES6+)
- **AI 模型**: TensorFlow.js + Teachable Machine
- **模型框架**:
  - TensorFlow.js v2.7.0
  - Teachable Machine Image v0.8
- **瀏覽器 API**:
  - File API (文件上傳)
  - MediaDevices API (相機訪問)
  - Canvas API (圖片處理)

## 🎮 使用方法

### 1. 上傳圖片
- 點擊「📁 上傳圖片」按鈕
- 選擇設備中的圖片
- 點擊「✓ 確認」進行分類

### 2. 相機拍照
- 點擊「📷 使用相機」按鈕
- 授予相機權限
- 第二次點擊「📸 拍照」按鈕拍照
- 點擊「✓ 確認」進行分類

### 3. 查看結果
- 查看主要識別結果及置信度
- 在下方查看所有類別的詳細分析
- 點擊「🔄 重新識別」重新開始

## 🔧 常見問題

### Q: 相機無法訪問？
A: 檢查以下事項：
- 瀏覽器是否授予相機權限
- 設備是否有可用的相機
- 使用 HTTPS 或 localhost 運行（某些瀏覽器要求）

### Q: 識別不準確？
A: 
- 確保光照充足
- 物品清晰可見
- 調整拍照角度
- 嘗試不同的圖像質量

### Q: 可以在線部署嗎？
A: 可以！部署到以下平台：
- GitHub Pages
- Vercel
- Netlify
- AWS Amplify
- 任何支持靜態檔案的 web 服務器

## 📝 許可證

此項目使用 Teachable Machine 模型進行識別。

## 👨‍💻 開發者注意事項

### 修改識別類別

如果要使用不同的模型，請將 `model.json` 和 `metadata.json` 替換為您訓練的 Teachable Machine 模型。

在 `app.js` 中更新 `categoryEmojis` 對象以匹配新的類別：

```javascript
const categoryEmojis = {
    'your-label': '🔤',
    // ... 添加更多標籤
};
```

### 自訓練模型

1. 訪問 [Teachable Machine](https://teachablemachine.withgoogle.com/)
2. 收集和標記訓練數據
3. 訓練模型
4. 導出為 TensorFlow.js 格式
5. 替換 `112/` 文件夾中的文件

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## ✨ 特別感謝

- Google Teachable Machine
- TensorFlow.js 社區

---

**享受使用垃圾分類識別應用！♻️**