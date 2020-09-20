#!/bin/sh
PDIR=/www/ImTheCat

cd $PDIR

if [ ! -d '/node_modules' ]
then
  mkdir -p log
fi

# 删除 package-lock.json 文件
rm -rf package-lock.json

echo '----- '`date +%Y-%m-%d%t%H:%M:%S)`' -----' >> ./log/z-update.log

git pull > ./log/z-tmp.log 2>&1

# 如果执行失败则退出
if [ $? -ne 0 ]
then
  exit 1
fi

cat ./log/z-tmp.log >> ./log/z-update.log

ISUP=`grep -c 'Already' ./log/z-tmp.log`

# 如果已经是最新代码则也不进行重复构建
if [ $ISUP -ne 0 ]
then
  exit 1
fi

# 安装所需包
installPackage() {
  echo '[install] '`date +%H:%M:%S` >> ./log/z-tmp.log
  cnpm i >> ./log/z-tmp.log 2>&1
  if [ $? -eq 0 ]
  then
    echo '[update end] '`date +%H:%M:%S`' 更新成功！' >> ./log/z-tmp.log
  else
    echo '[update error] '`date +%H:%M:%S`' 更新失败！' >> ./log/z-tmp.log
    exit 1
  fi
}

# package.json 有变更则更新 node_modules
updateModule() {
  # 如果 node_modules 文件夹存在
  if [ -d '/node_modules' ]
  then
    echo '[update] '`date +%H:%M:%S`' package.json 有变更，开始更新 node_modules' >> ./log/z-tmp.log
    rm -rf ./node_modules >> ./log/z-tmp.log 2>&1
    installPackage
  fi
}

# package.json is update
# PISU=`grep -ine 'package.json' ./log/z-tmp.log`
# echo $PISU
PISU=`grep -c 'package.json' ./log/z-tmp.log`

if [ $PISU -ne 0 ]
then
  updatePackage
fi

if [ ! -d '/node_modules' ]
then
  installPackage
fi

# 编译项目
echo '----- '`date +%Y-%m-%d%t%H:%M:%S)`' -----' >> ./log/z-build.log
npm run build >> ./log/z-build.log 2>&1

exit 1
