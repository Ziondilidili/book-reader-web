import { Chapter } from "./chapter"

export class Book {
    name:string
    chapters:Chapter[] = []
    chapterNames?:string[]
    description?:string
    chapterIndex:number
    constructor(
        name:string,
        chapters:Chapter[] = [],
        chapterNames?:string[],
        description?:string,
        chapterIndex:number = 0
    ){
        this.name = name
        this.chapters = chapters
        this.chapterNames = chapterNames
        this.description = description
        this.chapterIndex = chapterIndex
    }
    findChapterWithName(name:string):Chapter|undefined{
        return this.chapters.find(chapter=>chapter.name===name)
    }
    findChapterWithIndex(index:number):Chapter|undefined{
        return this.chapters[index]
    }
    findCurrentChapter():Chapter|undefined{
        return this.findChapterWithIndex(this.chapterIndex)
    }
}
