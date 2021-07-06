export class BookInfo {
    name:string
    currentIndex:number
    totalIndex:number
    description?:string
    ctime:Date
    constructor(name:string,currentIndex:number=0,totalIndex:number=0,description?:string,ctime:Date=new Date()){
        this.name = name
        this.currentIndex = currentIndex
        this.totalIndex = totalIndex
        this.ctime = ctime
    }
}
