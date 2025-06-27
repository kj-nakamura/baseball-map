#!/usr/bin/env python3
import http.server
import socketserver
import sys
import socket

def find_free_port():
    """空いているポートを見つける"""
    for port in range(8000, 8100):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    return None

if __name__ == "__main__":
    port = find_free_port()
    if port is None:
        print("利用可能なポートが見つかりません")
        sys.exit(1)
    
    print(f"サーバーを起動中... ポート {port}")
    print(f"ブラウザで http://localhost:{port} にアクセスしてください")
    print("停止するには Ctrl+C を押してください")
    
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", port), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nサーバーを停止しました")