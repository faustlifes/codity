import lesson2 from "./lessons/lesson.2";

let data: any;

data = [42, 34];
console.log(lesson2.solution(data,1));

data = [ 12, 1000, 50, 12, 50, 454, 12, 1024, 34543, 1000, 3, 12, 3, 454, 0, 0, 100000, 34543, 11111, 11111, 100000 ];
console.log(lesson2.solution2(data));