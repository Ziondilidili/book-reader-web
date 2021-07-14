# 前端数据库设计

0. 书架 bookShelf
    - 书架ID（仅作排序用）
    - 名称 name
1. 书籍 book
    - 书本ID （仅作排序用）
    - 名称 name
    - 总字数 totalWordCount
    - 当前已阅读字数 currentWordCount
    - 总章节 totalChapterCount
    - 当前阅读章节 currentChapterCount
    - 当前阅读所在章节的已阅读字数 currentWordCountOfChapter
    - 导入时间点 importedDate
    - 打开（阅读）时间 readingTIme
2. 章节 Chapter
    - 章节ID （仅作排序用，章节名称排序不可靠，通过数字大小区分章节前后即可）
    - 书本名称 bookName
    - 卷名称 volumnName
    - 章名称 chapterName
    - 正文 content
    - 总字数 totalWordCount
    - 已阅读字数 currentWordCount
