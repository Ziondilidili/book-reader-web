export class Chapter {
    name:string
    content:string
    length:number
    constructor(name:string,content:string){
        this.name = name
        this.content = content
        this.length = this.content?.length || 0
    }
}
