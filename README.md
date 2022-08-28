# Create new project with vite

yarn create vite typescript-pocd
--> select react-ts template

# Setup git

echo "# typescript-pocd" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:ngocanhth/typescript-pocd.git
git push -u origin main

# Install other package
yarn add path @types/node react-router-dom history react-redux @reduxjs/toolkit axios react-slick slick-carousel
yarn add -D sass @types/react-slick

yarn add react-hook-form yup  @hookform/resolvers jwt-decode
