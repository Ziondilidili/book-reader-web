export class Chapter {
    volumnName?:string
    chapterName:string
    content:string
    length:number
    constructor(chapterName:string,content:string,volumnName?:string){
        this.volumnName = volumnName
        this.chapterName = chapterName
        this.content = content
        this.length = this.content?.length || 0
    }
}
