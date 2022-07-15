## アプリケーション名
『ZuboRecipes』

## 概要・コンセプト
簡単かつ安価なレシピを探したり、自炊する上で困ったことなどを気軽に質問し合えるメディア系アプリ。

## 使用技術
* HTML5/CSS3
* JavaScript
* React (完全SPA)
* Ruby 3.1.0
* Ruby on Rails 7.0.2 (API提供)
* MySQL 5.7.37

## インフラ（サーバー・ネットワーク）関連
Amazon Web Services
* EC2
* RDS (MySQL)
* Route53 (DNS)
* Amazon Certificate Manager (SSL証明書)

* Nginx (webサーバー)
* Puma (Applicationサーバー)

## テストライブラリ
* RSpec

## 機能
* ユーザー登録機能
* ログイン機能
* アカウント有効化機能(メイラー使用: Action Mailer)
* ユーザー情報を保持する機能(次回以降も継続的にログイン)
* ユーザーパスワードリセット機能(メイラー使用: Action Mailer)
* レシピ投稿機能
* 画像投稿機能 (Active Storage)
* お気に入り投稿機能
* ユーザーフォロー機能
* レシピ検索機能
* 条件付き検索機能
* 特定条件でのレシピ表示機能（フォローしている、お気に入り登録している）
* カテゴリ検索機能
* コメント投稿機能
* ページネーション機能
* 質問投稿機能
* 質問に対するいいね機能
* 質問に対するコメント（回答）機能

## 目的・構成
「自炊・料理を通じて健康な食生活を身につける」ことが最大の目的です。
完全SPA構成で、高いUXをユーザーに提供します。

サービス内容としては、簡単で安価なレシピが多く掲載される構成にすることで、
時間やお金がない人でも自炊するきっかけとなれるように工夫しています。

また、自炊する上で、ちょっとした困りごとや疑問点が出てきたら質問掲示板で気軽に質問・交流ができます。

## 主なターゲット
* 「忙しく時間がない中で、作るのに時間をかけられない」、
* 「食材にかけられるお金が少ない」、
* 「自炊がなかなか継続できない」、
* 「一般的なレシピサイトでは凝った料理が多くて作れそうにない」、
* 「外食や宅配ばかりで、なかなか自炊するきっかけがない」、
* 「自炊してみたいけどわからないことが多そう」

こうした悩みを持った方々が気軽に使えるアプリです

## 主な使い方
* トップページから投稿されているレシピ一覧が見れます。（ログイン不要）
* レシピをクリックすると材料や作り方詳細が見れます。（ログイン不要）
* 質問一覧からみんなの質問が見られます。（ログイン不要）
* ヘッダーの検索バーからキーワードを入力するとレシピを検索できます。
* ログインするとレシピや質問を投稿できます。
その他、コメントの追加・レシピのお気に入り登録・気に入ったユーザーのフォローなどができます。

## デプロイ先URL
https://
### ゲストログイン用情報
* メールアドレス：guestuser@example.com
* パスワード：guestuser