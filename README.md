# 人生副本｜綠界自動付款串接版 v14

已完成：

- 移除 Google 表單付款流程
- 移除銀行帳號與付款後五碼
- 移除人工解鎖碼輸入
- 串接 Cloudflare Worker `/create-payment`
- 自動送出綠界付款表單
- 付款返回後輪詢 `/order-status`
- 付款成功後自動解鎖完整報告
- 從 D1 同步已購買角色，避免同角色重複付款

Worker：
https://lifequest-api.miller20031102.workers.dev

## 上傳 GitHub Pages

請上傳：

- index.html
- style.css
- script.js
- og-image.png
- README.md
- 404.html
- robots.txt
- sitemap.xml

## 目前限制

這一版使用瀏覽器產生的匿名 customerId，所以同一瀏覽器可以自動恢復 D1 解鎖權限；
換手機、清除瀏覽器資料的跨裝置登入同步尚未完成。

在正式公開前，請先用自己的一筆 NT$49 訂單測試：
建立付款 → 完成付款 → 返回網站 → 自動解鎖 → D1 orders 狀態變成 PAID。
