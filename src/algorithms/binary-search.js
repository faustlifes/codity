
class BinarySearchLesson {

    solution1(list = [1000,12,60,190.230,456,1,2,3,4,56], item) {
        list = list.sort((a,b) => a - b);
        let low = 0;
        let high = list.length - 1;

        while (low <= high) {
            const mid = (low + high);
            const guess = list[mid];
            if( guess === item) {
                return mid;
            }
            if (guess > item) {
                high = mid - 1;
            }
            else
            {
                low = mid + 1
            }
        }
        return null;
    }

}

export default BinarySearchLesson;
