
class MaxWaterArea {
// This solution finds max area of water that can be filled between two columns in array
/*
* 4 |                   |
* 3 |       |           |
* 2 |       |       |   |
* 1 |       |   |   |   |
* 0 |___|___|___|___|___|_
*     0   1   2   3   4
* */
    solution1(height = [0,0,100]) {
        let maxArea = 0;
        let left = 0;
        let right = height.length - 1;

        while (left < right) {
            const currentArea = Math.min(height[left], height[right]) * (right - left);
                maxArea = Math.max(maxArea, currentArea);
            if (height[left] < height[right]) {
                left += 1;
            } else {
                right -= 1;
            }
        }

        return maxArea;
    }
}

export default MaxWaterArea;
