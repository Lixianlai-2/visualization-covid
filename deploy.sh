# 打包会自动删除之前的dist  &&的作用是，只有前面的操作成功了，再进行下面的操作
npm run build &&
cd dist 
git add . &&
git commit -m "update" &&
git push &&
cd ..  
# 操作后自动在bash中显示下面的网址，方便查看
echo https://lixianlai-2.github.io/preview-covid/