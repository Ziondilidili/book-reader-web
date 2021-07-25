export const environment = {
  production: true
};
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
      keys:[]
    }
  }
}