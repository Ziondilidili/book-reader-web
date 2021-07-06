export class Chapter {
    title:string
    content:string
    length:number
    constructor(title:string,content:string){
        this.title = title
        this.content = content
        this.length = this.content?.length || 0
    }
}
