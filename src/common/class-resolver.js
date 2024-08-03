import Lesson1 from '../lessons/lesson-1';
import Lesson2 from '../lessons/lesson-2';
import Lesson3 from '../lessons/lesson-3';
import Lesson4 from '../lessons/lesson-4';
import Lesson5 from '../lessons/lesson-5';
import Lesson6 from '../lessons/lesson-6';
import Lesson7 from '../lessons/lesson-7';
import LeetCode1 from '../leetcode/leetcode.1';
import LeetCode2 from '../leetcode/leetcode.2';
import LeetCode3 from '../leetcode/leetcode.3';
import Decorators from '../algorithms/decorators';
import QuickSearch from '../algorithms/quick-search';
import DivideImpera from '../algorithms/divide-impera';
import MaxWaterArea from '../algorithms/maxWaterArea';
import BinarySearchLesson from '../algorithms/binary-search';
import AppleTask from '../algorithms/apple-task';



export const classResolver = {
    'cl1': new Lesson1(),
    'cl2': new Lesson2(),
    'cl3': new Lesson3(),
    'cl4': new Lesson4(),
    'cl5': new Lesson5(),
    'cl6': new Lesson6(),
    'cl7': new Lesson7(),
    'lt1': new LeetCode1(),
    'lt2': new LeetCode2(),
    'lt3': new LeetCode3(),
    'dcrts': new Decorators(),
    'quickSearch': new QuickSearch(),
    'divideImpera': new DivideImpera(),
    'maxWaterArea': new MaxWaterArea(),
    'bsrc': new BinarySearchLesson(),
    'appl': new AppleTask(),
};
