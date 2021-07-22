import { Chapter } from "./chapter"

export class Book {
    name:string
    chapters:Chapter[] = []
    chapterNameList:string[] = []
    description?:string
    chapterIndex:number
    constructor(
        name:string,
        chapters:Chapter[] = [],
        description?:string,
        chapterIndex:number = 0
    ){
        this.name = name
        this.chapters = chapters
        this.description = description
        this.chapterIndex = chapterIndex
        this.chapters.forEach(chapter=>{
            this.chapterNameList.push(chapter.name)
        })
    }
}
