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

只需要上傳這 3 個檔案：

```txt
index.html
style.css
script.js
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
