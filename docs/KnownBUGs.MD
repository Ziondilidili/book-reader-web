# 已知BUG
- 导入**新**书籍时，第一本正常,第二本会提示 `IDBVersionChangeEvent`异常，若创建的书籍表已存在，则会正常上传（省去了创建ObjectStore的过程）