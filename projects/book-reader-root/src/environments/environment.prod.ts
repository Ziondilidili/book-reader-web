export const environment = {
  production: true
};
const IDBBookReaderConfigPredefineValue:{
  [name:string]:any
} = {
  ["content.fontSize.px"]:14,
  ["content.fontWeight"]:"normal",
  ["content.fontFamily"]:"黑体",
  ["content.textIndent.em"]:2,
  ["content.fontColor"]:"black",
  ["content.bgColor"]:"white",
  ["content.lineHeight.em"]:1.5,
  ["content.chapterSwitchRegionPercent"]:0.1,
  ["title.color"]: "green",
}

export const IDB = {
  BookReader: {
    name: "BookReader",
    version: 1,
    Book: {
      name: "Book",
      pkey: "name",
      keys: [
        /**
         * {
         *    name:"",
         *    options:{}
         * }
         */
      ]
    },
    Config:{
      name:"Config",
      pkey:"name",
      keys:[],
      predefineValue:IDBBookReaderConfigPredefineValue
    }
  }
}