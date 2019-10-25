# 说明

本说明旨在说明如何使用数据检索系统（Argus），包括需要安装的组件，以及启动的步骤

## 安装并启动 Dgraph

### 安装

```bash
curl https://get.dgraph.io -sSf | bash
```

### 启动

```bash
nohup dgraph zero  > dgraph_zero.log 2>&1 &

mkdir dgraph_log

nohup dgraph alpha --lru_mb 2048 --zero localhost:5080 --port_offset 10 --log_dir dgraph_log > dgraph_alpha.log 2>&1 &

```

### 启动参数参考

| Dgraph Node Type | gRPC-internal | gRPC-external | HTTP-external  |
|-----------------|---------------|---------------|-----------------|
|zero             |   –Not Used–  |     5080      | 6080            |
|alpha            | 7080          | 9080          | 8080            |

## 数据检索系统的使用（Argus）

### 更新 Schema

首次启动Argus时需要更新Schema，之后重启时不需要

```bash
    # 指明 Dgraph 网络地址
    argus schema-update  --dgraph 127.0.0.1:9090
```

### 启动索引服务

```bash
    # 指明 区块链和 Dgraph 网络地址
    argus ledger-rdf --api 127.0.0.1:8081 --dgraph 127.0.0.1:9090
```
Argus将会持续运行，当有新账本和新区块产生时，会自动创建索引

### 启动API服务

```bash
    # 指明 API服务所在服务器地址和所要监听的端口，以及 Dgraph 网络地址
    # 在JDChain网关配置文件gateway.conf中参数data.retrieval.url=http://127.0.0.1:10001，即由此处配置而来;
    argus api-server --host 127.0.0.1 --port 10001 --dgraph 127.0.0.1:9090
```

### 启动Value索引服务

```bash
# 如下127.0.0.1:8081为网关的地址;
nohup /export/chain_explorer/argus data  --ledger-host http://127.0.0.1:8081 --dgraph 127.0.0.1:9090  > value_indexer.log 2>&1 &
```

### 移除索引数据

会将数据库中所有索引移除，慎用！

```bash
    # 指明 Dgraph 网络地址
    argus drop  --dgraph 127.0.0.1:9090
```
