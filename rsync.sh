#!/bin/bash

# 配置信息
USER="ubuntu"                          # 服务器用户名
SERVER="16.162.187.111"             # 服务器IP地址
DEPLOY_PATH="/var/next-app"         # 服务器部署路径
PORT="22"                            # SSH端口，默认22

# 构建项目
echo "Building project..."
npm run build || {
  echo "Build failed!"
  exit 1
}

# 确认构建成功
if [ ! -d ".next" ]; then
  echo "Build directory .next not found!"
  exit 1
fi

echo "Build completed successfully!"

# 创建需要的目录
ssh -p ${PORT} ${USER}@${SERVER} "mkdir -p ${DEPLOY_PATH}"

# 同步文件到服务器
echo "Syncing files to server..."
echo "Checking .next directory..."
ls -la .next || {
  echo ".next directory not found!"
  exit 1
}

rsync -avz --delete \
  --progress \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='.next/cache' \
  -e "ssh -p ${PORT}" \
  .next \
  package.json \
  package-lock.json \
  public \
  ${USER}@${SERVER}:${DEPLOY_PATH}/

# 在服务器上安装依赖
echo "Installing dependencies on server..."
ssh -p ${PORT} ${USER}@${SERVER} "cd ${DEPLOY_PATH} && npm install --production"

# 重启 PM2
echo "Restarting PM2..."
ssh -p ${PORT} ${USER}@${SERVER} "cd ${DEPLOY_PATH} && pm2 restart next-app || pm2 start npm --name 'next-app' -- start"

echo "Deployment completed!" 