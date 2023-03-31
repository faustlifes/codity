export class Stack {
    constructor(){
        this.data = [];
        this.top = 0;
    }
    push(element) {
        this.data.push(element);
        this.top = this.data.length - 1;
    }
    length() {
        return this.data.length;
    }
    peek() {
        return this.data[this.top];
    }
    isEmpty() {
        return this.data.length === 0;
    }
    pop() {
        let res;
        if(this.data.length) {
            res =  this.data.pop(); // removes the last element
            this.top = this.data.length - 1;
        }
        return res;
    }
    print() {
        let top = this.top; // because top points to index where new    element to be inserted
        while(top >= 0) { // print upto 0th index
            console.log(this.data[top]);
            top--;
        }
    }
    reverse() {
        this._reverse(this.top);
    }
    _reverse(index) {
        if(index !== 0) {
            this._reverse(index-1);
        }
        console.log(this.data[index]);
    }
}
