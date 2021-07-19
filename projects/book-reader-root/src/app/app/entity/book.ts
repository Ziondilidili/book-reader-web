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
    getChapterWithName(name:string):Chapter|undefined{
        return this.chapters.find(chapter=>chapter.name===name)
    }
    getChapterWithIndex(index:number):Chapter|undefined{
        return this.chapters[index]
    }
    getCurrentChapter():Chapter|undefined{
        return this.getChapterWithIndex(this.chapterIndex)
    }
    getChapterNameList():string[]{
        if(!!this.chapterNameList && this.chapterNameList.length>0)return this.chapterNameList;
        const nameList:string[] = []
        this.chapters.forEach(chapter=>{
            nameList.push(chapter.name)
        })
        this.chapterNameList = nameList
        return nameList
    }
    
}
