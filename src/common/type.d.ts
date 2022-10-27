export interface ObjectType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface Class<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(...args: any): T
}