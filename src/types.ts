// export interface ClassType<T = any> {
//     new(...args: any[]): T;
// }
export type ClassType<T = any> = new (...args: any[]) => T;
export class Factory {
  public create<T>(type: new () => T): T {
    return new type();
  }
}
