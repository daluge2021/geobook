#!/usr/bin/env python3
"""geo010.com 线上验证：部署 Worker 后核对关键端点与 D1 记录。

用法：python verify_worker.py
要求：token.txt 在仓库根（.gitignore 已忽略），curl、python 可用。
本机 hosts 常把 geo010.com 指到 127.0.0.1，故用 --resolve 走真实 Cloudflare IP。
"""
import json
import subprocess
import sys
import urllib.request

TOKEN_FILE = 'E:/D/GEOhtml/token.txt'
ACC = '856237d9168302251de4b315e4d385ac'
DB = 'a80440ae-3754-4ace-89b9-847aed8ed289'
IP = '104.21.40.133'  # geo010.com 真实解析 IP


def curl_status(path):
    r = subprocess.run(
        ['curl', '-sk', '--resolve', f'geo010.com:443:{IP}', '-o', '/dev/null',
         '-w', '%{http_code}', '--max-time', '20', 'https://geo010.com' + path],
        capture_output=True, text=True)
    return r.stdout.strip()


def d1_count():
    token = open('E:/D/GEOhtml/token.txt').read().strip()
    url = f'https://api.cloudflare.com/client/v4/accounts/{ACC}/d1/database/{DB}/query'
    req = urllib.request.Request(url,
        data=json.dumps({'sql': 'SELECT COUNT(*) AS n FROM crawler_logs'}).encode(),
        headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'})
    return json.load(urllib.request.urlopen(req))['result'][0]['results'][0]['n']


def main():
    stats = curl_status('/stats.html')
    home = curl_status('/')
    mcp = curl_status('/.well-known/mcp')
    print(f'stats.html={stats}  首页={home}  .well-known/mcp={mcp}  （均应为 200）')

    ok = True
    if stats != '200':
        print('  FAIL stats.html 非200：很可能是 D1 binding 丢失，请重新 PUT 且 metadata 必须带 bindings')
        ok = False
    if home != '200':
        print('  FAIL 首页非 200')
        ok = False
    if mcp != '200':
        print('  WARN .well-known/mcp 非 200')

    count = d1_count_before = d1_count()
    print(f'  D1 当前记录数={count}')
    print('结论：', 'PASS' if ok else 'CHECK → 修复后再继续')
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()