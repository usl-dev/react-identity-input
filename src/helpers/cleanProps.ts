export function cleanProps<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, v]) => !propsToOmit.includes(key) && v !== undefined
    )
  ) as Partial<T>;
}

const propsToOmit = ["min", "max", "type"];
