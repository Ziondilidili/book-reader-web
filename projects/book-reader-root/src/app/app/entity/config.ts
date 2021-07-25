export class Config {
  name:string
  value?:string|number|Config|null
  constructor(
    name:string,
    value?:string|number|Config|null
  ){
    this.name = name
    this.value = value
  }
}
