export async function IDBRequestConvertor<T = any, R = any>(
  request: IDBRequest<T>,
  convertor: (result: T) => R = result => result as any
) {
  return new Promise<R>((resolve, reject) => {
    request.onsuccess = function (ev) {
      const result = this.result
      const convertedResult = convertor(result)
      resolve(convertedResult)
    }
    request.onerror = function (ev) {
      reject(ev)
    }
  })
}