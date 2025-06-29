# baseball-map

プロ野球12球団本拠地マップ

## 概要

このプロジェクトは、日本プロ野球12球団の本拠地球場をGoogle Maps上に表示するインタラクティブなマップアプリケーションです。各球場の詳細情報や、リーグごとのフィルタリング機能を提供します。

## プロジェクト構造

プロジェクトは、開発用のソースコードとビルド後の成果物を明確に分離するために、以下の構造を採用しています。

-   `src/`: 開発用のソースコードが格納されています。HTML、CSS、JavaScriptファイルなどが含まれます。
-   `dist/`: ビルドされた成果物が格納されます。本番環境へのデプロイに使用されます。
-   `tests/`: テストファイルが格納されています。
-   `.github/workflows/`: GitHub ActionsのCI/CDワークフローが定義されています。

## 開発環境のセットアップ

1.  **リポジトリのクローン**

    ```bash
    git clone https://github.com/your-username/baseball-map.git
    cd baseball-map
    ```

2.  **依存関係のインストール**

    ```bash
    npm install
    ```

3.  **環境変数の設定**

    Google Maps APIキーが必要です。プロジェクトのルートディレクトリに`.env`ファイルを作成し、以下の形式でAPIキーを設定してください。

    ```
    VITE_GOOGLE_MAPS_API_KEY=あなたのGoogleMapsAPIキー
    ```

## 開発サーバーの起動

```bash
npm run dev
```

## ビルド

本番環境用のビルドを作成します。

```bash
npm run build
```

ビルドされたファイルは`dist/`ディレクトリに出力されます。

## テストの実行

```bash
npm run test
```

## Lintの実行

コードのスタイルと品質をチェックします。

```bash
npm run lint
```

自動修正を行うには、以下のコマンドを実行します。

```bash
npm run lint:fix
```

## 貢献

貢献を歓迎します！バグ報告や機能提案は、GitHubのIssueトラッカーをご利用ください。プルリクエストも大歓迎です。
