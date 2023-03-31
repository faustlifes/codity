import { SingletonTemplate } from '../common/singleton.template';

let instance;

class DivideImpera extends SingletonTemplate {
  static getInstance () {
    return super.getInstance(instance, DivideImpera);
  }

  solution1(lon = 2010, lat = 640) {
    let div = Math.trunc(lon / lat);
    if (div === 0) {
      div = 1;
    }
    const length = lon - div * lat;
    if (length !== 0) {
      return this.solution(lat, length);
    }

    return lat;
  }
}

export default DivideImpera.getInstance();
