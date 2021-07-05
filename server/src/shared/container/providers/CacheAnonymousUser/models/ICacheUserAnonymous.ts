export default interface ICacheUserAnonymous {
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T | string>;
  invalidate(key: string): Promise<void>;
}
