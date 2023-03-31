import { SingletonTemplate } from '../common/singleton.template';

let instance;

function readonly(target, property, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

function log(logMessage) {
  // возвращаем функцию декоратора
  return function (target, property, descriptor) {
    // сохраняем исходное значение, которое является методом (функцией)
    const originalMethod = descriptor.value;

    // заменяем реализацию метода
    descriptor.value = function(...args) {
      console.log('[LOG]', logMessage);

      // вызов исходного метода
      // `this` указываем на экземпляр
      return originalMethod.call(this, ...args);
    };

    return descriptor;
  }
}

class CommonTasks extends SingletonTemplate {
  static getInstance () {
    return super.getInstance(instance, CommonTasks);
  }

  /*create your own decorator*/
  @readonly
  @log('this method was called')
  solution = () => {
   return this;
  }
}

export default CommonTasks.getInstance();
