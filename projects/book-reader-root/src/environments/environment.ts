// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
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
  ["content.chapterSwitchRegionPercent"]:0.33
}

export const IDB = {
  BookReader: {
    name: "BookReader",
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


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
