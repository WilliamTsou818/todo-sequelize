# 待辦清單專案 Todo-List-Sequelize

<br>

此專案可以讓使用者新增、瀏覽、修改和刪除待辦事項，主要是為了練習用 node.js 搭配 express 框架開發網頁，以及透過 sequelize 操作 MySQL。

* 測試帳號：user1@example.com 
* 測試密碼：12345678

<br>

## 專案功能 Features

1.  使用者可以註冊帳號
2.  使用者可以輸入帳號密碼登入
3.  使用者可以透過 Facebook 登入
4.  使用者必須登入後才能使用專案相關功能
5.  使用者可以在首頁瀏覽所有待辦事項
6.  使用者可以新增待辦事項
7.  使用者可以勾選已完成的待辦事項
8.  使用者可以修改待辦事項
9.  使用者可以刪除待辦事項

<br>

## 畫面預覽 Preview
![alphacamp 學期三 A12 登入畫面](https://user-images.githubusercontent.com/78346513/129465683-e05e5cc7-d152-49b2-9f8c-fae54f8a8cb8.png)

![alphacamp 學期三 A12 首頁](https://user-images.githubusercontent.com/78346513/129465690-d0a8477d-eb8a-403d-9152-722d804115fb.png)

<br>

## 建置環境 Environment

<br>

* node.js : ^10.15.0
* express: ^4.17.1
* express-handlebars: ^5.3.2
* express-session: ^1.17.2
* sequelize: ^6.6.4
* MySQL: ^8.0.25
* passport: ^0.4.1
* passport-local: ^1.0.0
* passport-facebook: ^3.0.0


<br>

## 安裝流程 Install

<br>

1. 藉由 git clone 將專案下載至本地
```
git clone https://github.com/WilliamTsou818/todo-sequelize.git
```
2. 進入專案資料夾
```
cd todo-sequelize
```
3. 安裝套件
```
npm install
```
4. 引入環境變數

<br>

* 將 .env.example 改為 .env
* Facebook Login: 需要在 [Facebook for Developers](https://developers.facebook.com/) 建立應用程式，並將應用程式編號與應用程式密鑰分別代入 FACEBOOK_ID 及 FACEBOOK_SECRET 

<br>

5. 建立資料庫

<br>

打開 MySQL workbench 並連線至本地資料庫，輸入下列指令建立資料庫 

```
drop database if exists todo_sequelize;
create database todo_sequelize;
use todo_sequelize;
```
* 預設資料庫名稱為 todo_sequelize，也可使用其他名稱，並將 config.js 中的 database 改為欲使用的資料庫名稱。

<br>

6. 建立資料庫欄位
```
npx sequelize db:migrate
```

7. 建立種子資料
```
npx sequelize db:seed:all
```

8. 啟動網頁伺服器
```
npm run dev
```
9. 出現下列訊息，表示啟動成功，可點選連結開啟網頁

Server is running on http://localhost:3000