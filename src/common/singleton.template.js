
export class SingletonTemplate {
  static getInstance(instance, constr) {
    if (!instance) {
      instance = new constr();
    }
    return instance;
  }
}