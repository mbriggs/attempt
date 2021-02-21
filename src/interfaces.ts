export interface Cls<T = any> {
  new (...args: any[]): T;

  name: string;
}
