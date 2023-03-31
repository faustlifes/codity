import { SingletonTemplate } from '../../common/singleton.template';

let instance;

class KlarnaTask1 extends SingletonTemplate {
  static getInstance () {
    return super.getInstance(instance, KlarnaTask1);
  }
  dateToUTC(date = new Date(), isDate = false) {
    if (isDate) {
      return Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }
    return Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
  }
  checkTime = (start, end, curr) => {
    const utcStart = this.dateToUTC(start, true);
    const utcEnd = this.dateToUTC(end, true);
    const utcCurr = this.dateToUTC(curr);
    if (utcCurr >= utcStart && utcCurr < utcEnd) {
      return true;
    }
    return false;
  }

  getBalanceByCategoryInPeriod = (transactions = [], category, start, end) => {
    let total = 0;
    transactions = [{
      id: 123,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -30,
      category: 'groceries',
      time: '2018-03-12T12:34:00Z'
    },{
      id: 123,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: 60,
      category: 'groceries',
      time: '2018-03-12T12:34:00Z'
    },{
      id: 123,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -30,
      category: 'notGroceries',
      time: '2018-03-12T12:34:00Z'
    }];

    transactions.forEach((transaction) => {
      if ((transaction.category === category) &&
        this.checkTime(start, end, new Date(transaction.time))) {
        total += transaction.amount;
      }
    });
    return total;
  }


}

export default KlarnaTask1.getInstance();