import { Chapter } from "./chapter"

export class Book {
    name:string
    chapters:Chapter[] = []
    chapterNameList?:string[]
    description?:string
    chapterIndex:number
    constructor(
        name:string,
        chapters:Chapter[] = [],
        chapterNameList?:string[],
        description?:string,
        chapterIndex:number = 0
    ){
        this.name = name
        this.chapters = chapters
        this.chapterNameList = chapterNameList
        this.description = description
        this.chapterIndex = chapterIndex
    }
    static getChapterWithName(book:Book,name:string):Chapter|undefined{
        return book.chapters.find(chapter=>chapter.name===name)
    }
    static getChapterWithIndex(book:Book,index:number):Chapter|undefined{
        return book.chapters[index]
    }
    static getCurrentChapter(book:Book):Chapter|undefined{
        return Book.getChapterWithIndex(book,book.chapterIndex)
    }
    static getChapterNameList(book:Book):string[]{
        if(!!book.chapterNameList && book.chapterNameList.length>0)return book.chapterNameList;
        const nameList:string[] = []
        book.chapters.forEach(chapter=>{
            nameList.push(chapter.name)
        })
        book.chapterNameList = nameList
        return nameList
    }
}
