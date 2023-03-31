import { SingletonTemplate } from '../../common/singleton.template';

class Arabesque extends SingletonTemplate {
    static getInstance () {
        return super.getInstance(instance, Arabesque);
    }

    //TODO TASK - you have an array with weigths and x and y costs for their antiweigths X - is a single and Y is a double
    solution (A, X, Y) {

        const sorted = A.sort((a, b) => b - a);
        const l = A.length;
        let i = 0;

        const results = [];

        const single = X * A.length;

        let capacity = sorted.reduce((s, curr) => s + curr);
        const map = {};

        for (i = 0; i < l; i++) {
            const curr = sorted[ i ];
        }


        return Math.min(...results);
    }

}

export default Arabesque.getInstance();
