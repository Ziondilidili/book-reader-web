import { Chapter } from "./chapter"

export class Book {
    name:string
    chapters:Chapter[] = []
    chapterNames?:string[]
    description?:string
    constructor(
        name:string,
        chapters:Chapter[] = [],
        chapterNames?:string[],
        description?:string
    ){
        this.name = name
        this.chapters = chapters
        this.chapterNames = chapterNames
        this.description = description
    }

    update(){
        
    }

    findChapter(name:string):Chapter|undefined{
        return this.chapters.find(chapter=>chapter.name===name)
    }
}
