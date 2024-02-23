export function omitKeyFromObj(key: string, obj: any) {
  const { [key]: omitted, ...rest } = obj;

  return rest;
}
