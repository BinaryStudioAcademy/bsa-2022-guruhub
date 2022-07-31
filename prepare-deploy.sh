#!/bin/bash

mkdir -p ./build/backend/; mv ./backend/build/* ./build/backend/
mkdir ./build/shared/; mv ./shared/build ./build/shared/
mv ./frontend/build/* ./build/backend/public
cp package.json package-lock.json ./build

cd build && zip -r build.zip . && cd -
