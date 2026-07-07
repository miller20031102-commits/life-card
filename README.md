# 人生副本｜角色卡販賣機 Pro

這版已經不是單純展示版，而是「可付費測市場」版本。

## 已完成

- 12 題角色測驗
- 24 種角色卡
- 免費角色卡結果頁
- 下載角色卡 PNG
- 複製 Threads 分享文
- 收藏卡片到本機
- 付費完整報告區
- 付款彈窗與訂單編號
- Google Apps Script 一次性解鎖碼後台
- Google Sheet 管理 30 組解鎖碼

## 上傳 GitHub Pages

只需要上傳這 5 個檔案：

```txt
index.html
style.css
script.js
og-image.png
README.md
```

不要把 `admin/private_unlock_codes.csv` 或 `admin/codes_sheet_import.csv` 上傳到 GitHub。

## 啟用一次性解鎖碼

### 1. 建立 Google Sheet

建立一個 Google 試算表，工作表名稱改成：

```txt
UnlockCodes
```

第一列欄位：

```txt
code,status,soldTo,soldAt,usedAt,roleId,resultId,note
```

把 `admin/codes_sheet_import.csv` 匯入這張表。

### 2. 建立 Apps Script

在 Google Sheet 上方選：

```txt
擴充功能 → Apps Script
```

把 `apps-script/Code.gs` 的內容全部貼進去，儲存。

### 3. 部署 Web App

Apps Script 右上角：

```txt
部署 → 新增部署作業 → 網頁應用程式
```

設定：

```txt
執行身分：我
誰可以存取：任何人
```

部署後複製 Web App URL。

### 4. 貼回 script.js

打開 `script.js`，最上面找到：

```js
APPS_SCRIPT_URL: ''
```

改成：

```js
APPS_SCRIPT_URL: '你的 Google Apps Script Web App URL'
```

同時把付款說明改成你的收款方式：

```js
PAYMENT_NOTE: '你的付款方式與回報方式'
```

## 使用流程

1. 使用者免費測驗
2. 產生角色卡
3. 按「解鎖完整報告 NT$49」
4. 付款給你
5. 你從 private_unlock_codes.csv 或 Google Sheet 找一組未售出的碼給他
6. 使用者輸入解鎖碼
7. Apps Script 把該碼標記成 USED
8. 第二次再輸入同一組碼會失敗

## 管理解鎖碼

Google Sheet 狀態：

- `UNUSED`：還沒賣
- `SOLD`：已付款但還沒使用
- `USED`：已被網站兌換，不能再用

建議你收到付款後，把該列：

```txt
status 改成 SOLD
soldTo 填買家名稱
soldAt 填付款時間
```

使用者解鎖後，系統會自動把 `status` 改成 `USED`，並填上 `usedAt / roleId / resultId`。

## 注意

這版已經能做到「解鎖碼用一次就失效」。

但付款本身仍然是人工確認。如果要全自動收款，需要之後串綠界、藍新、TapPay、Gumroad 或其他支付服務。


## 已設定完成

本版已經把 Google Apps Script Web App URL 填入 `script.js`：

```js
APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxQ8TxLBVIQgeTQkBbHeryba07gJWhDpgqpSzROdKgqktHGy3LKou2-QyMu5cUcn1V5/exec'
```

上傳 GitHub Pages 前，請確認只上傳公開檔案：

- `index.html`
- `style.css`
- `script.js`
- `og-image.png`
- `README.md`

不要上傳私密解鎖碼 CSV。


## 手機版優化

這版已加上手機底部快速操作列、iPhone 安全區、輸入框 16px 防縮放、手機版彈窗底部抽屜、測驗選項與結果卡排版優化。主要目標是 GitHub Pages 上手機使用順、按鈕好點、付款解鎖流程不擠。


## 付費報告升級版

這版已把 NT$49 完整報告升級成 10 個區塊：付費總覽、角色核心、戀愛攻略、社交定位、工作與賺錢模式、金錢弱點、隱藏 Boss 攻略、7 日任務、30 天養成、專屬台詞包。每個角色都有更個人化的付費文案，讓使用者解鎖後比較有「值得買」的感覺。

## 卡冊與永久查看權

這版支援「我的卡冊」：

- 使用者完成測驗後，結果會自動保存到本機卡冊
- 使用者也可以按「收藏到我的卡冊」手動保存
- 在「我的卡冊」可以選擇任一張卡：查看、解鎖這張、或查看已解鎖完整報告
- 每張卡有自己的 resultId，付費解鎖會綁定到該 resultId
- 解鎖成功後，同一台手機 / 同一個瀏覽器會永久保留完整報告查看權

注意：目前是靜態網站版本，永久保存依賴瀏覽器 localStorage。使用者如果清除瀏覽器資料、換手機或換瀏覽器，就不會自動同步。未來要做到跨裝置永久權限，需要加入會員系統、Email 備份或正式資料庫。
