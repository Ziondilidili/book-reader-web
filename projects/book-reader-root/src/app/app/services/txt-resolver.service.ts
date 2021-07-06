import { Injectable } from '@angular/core';
import { Chapter } from '../entity/chapter';

// const VolumnRegexp = /第[\d一二三四五六七八九十百千万亿]+卷 [^\s]*\s+/g
const ChapterRegexp = /第[\d一二三四五六七八九十百千万亿]+章 [^\s]*\s+/g

@Injectable({
  providedIn: 'root'
})
export class TxtResolverService {
  constructor() { }

  spliteChapter(originContent:string):Chapter[]{
    const chapters:Chapter[] = []
    const matchs:RegExpExecArray[] = []
    let regExpExecArray
    while( (regExpExecArray = ChapterRegexp.exec(originContent)) !=null ){
      matchs.push(regExpExecArray)
    }
    for(let i=0;i<matchs.length-1;i++){
      const match = matchs[i]
      const nextMatch = matchs[i+1]
      const title = match[0].trim()
      const content = originContent.slice(match.index+match[0].length,nextMatch.index)
      const chapter = new Chapter(title,content)
      chapters.push(chapter)
    }
    return chapters
  }
}
