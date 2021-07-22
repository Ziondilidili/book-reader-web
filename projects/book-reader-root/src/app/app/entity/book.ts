import { Chapter } from "./chapter"

export class Book {
    name:string
    chapters:Chapter[] = []
    chapterNameList:string[] = []
    description?:string
    chapterIndex:number = 0
    constructor(
        name:string,
        chapters:Chapter[] = [],
        description?:string,
    ){
        this.name = name
        this.chapters = chapters
        this.description = description
        this.chapters.forEach(chapter=>{
            this.chapterNameList.push(chapter.name)
        })
    }
}
