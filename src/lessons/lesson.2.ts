
let instance;

class Lesson2 {
	static getInstance() {

		if (!instance) {
			instance = new Lesson2();
		}
		return instance;
	}

	solution(A: number[], K: number): number[] {
		let result: number[] = A;
		let i = 0;

		if (K % A.length === 0) {
			return result;
		}
		for (i = 0; i < K; i ++) {
			result = result.map((item, index) => {
				if (index === 0) {
					return result[ result.length - 1 ];
				}
				return result[ index - 1 ];
			});
		}
		return result;
	}

	solution2 (A: number[]): number {
		let result: number = 0;
		let i: number;
		const len: number = A.length;

		for (i = 0; i < len; i++) {
			result ^= A[i];
		}
		return result;
	}

}

export default Lesson2.getInstance();
