import { IDBBookReaderConfigPredefineValue } from "./book-reader.pre.config";

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
    Config: {
      name: "Config",
      pkey: "name",
      keys: [],
      predefineValue: IDBBookReaderConfigPredefineValue
    }
  }
}