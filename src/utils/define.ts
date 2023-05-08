export function defineAutoInitProtoGetter(proto: any, name: string | symbol, init: ((intance: any) => any)) {
  const attch = Symbol(name.toString())

  Object.defineProperty(proto, name, {
    get() {
      if (attch in this) return this[attch]
      return (this[attch] = init(this))
    },
    set(v: any) {
      this[attch] = v
    }
  })
}
