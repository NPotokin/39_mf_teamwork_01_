// Обязывает использование в создаваемом объекте ключи переданного типа через дженерик
export type SameKyes<
  T extends Record<string, string>
> = {
  [key in keyof T]: string
}
export type Env = 'development' | 'production'
