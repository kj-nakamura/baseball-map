# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

プロ野球12球団の本拠地マップWebアプリケーション。日本地図上に12球団の本拠地球場をインタラクティブに表示。

## Development Commands

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
# または
npm start

# ブラウザで http://localhost:3000 にアクセス
```

## Architecture

- **index.html**: メインHTMLファイル（レスポンシブデザイン、日本語対応）
- **script.js**: JavaScript（Leaflet.js使用、球団データ、マップ機能）
- **外部ライブラリ**: 
  - Leaflet.js: インタラクティブマップライブラリ
  - OpenStreetMap: 地図タイル

## 主な機能

- 12球団の本拠地を地図上にマーカー表示
- セ・リーグ/パ・リーグの切り替え表示
- マーカークリックで球団詳細情報表示
- レスポンシブデザイン対応

## 球団データ構造

各球団オブジェクトには以下の情報を含む：
- name: 球団名
- stadium: 球場名  
- location: 所在地
- league: リーグ名
- lat/lng: 緯度経度座標
- color: マーカー色（セ・リーグ赤、パ・リーグ青）

## 実装要件

- 機能を追加したらテストも追加すること
- テストが通るか確認すること