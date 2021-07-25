export type ConfigKey = string
export type ConfigValue = any
export class Config {
  name:ConfigKey
  value?:ConfigValue
  constructor(
    name:ConfigKey,
    value?:ConfigValue
  ){
    this.name = name
    this.value = value
  }
}
