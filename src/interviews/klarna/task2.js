import { SingletonTemplate } from '../../common/singleton.template';

let instance;

class KlarnaTask2 extends SingletonTemplate {
  static getInstance () {
    return super.getInstance(instance, KlarnaTask2);
  }

  dateToUTC (date = new Date(), isDate = false) {
    if (isDate) {
      return Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }
    return Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
  }

  filterTransactions = (item, i, list) => {
    if (list.length < 2) {
      return false;
    }

    let curr = this.dateToUTC(new Date(item.time));
    let prev = list[i - 1] ? this.dateToUTC(new Date(list[i - 1].time)): curr - 65000;
    let next = list[i + 1] ? this.dateToUTC(new Date(list[i + 1].time)): curr + 65000;

    if ((curr - prev  <= 60000) || (next - curr <= 60000)) {
      return true;
    } else {
      return false;
    }

  }

  findDuplicateTransactions = (transactions = []) => {
    let duplicates = [];
    let transactionsMap = new Map();
    transactions = [
      {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -50,
        category: 'eating_out',
        time: '2018-03-01T12:34:00.000Z'
      },
      {
        id: 13,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -50,
        category: 'eating_out',
        time: '2018-04-01T10:24:00.000Z'
      },
      {
        id: 14,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -50,
        category: 'eating_out',
        time: '2018-04-01T10:24:40.000Z'
      },
      {
        id: 15,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -50,
        category: 'eating_out',
        time: '2018-04-01T10:25:10.000Z'
      },
      {
        id: 3,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:34:30.000Z'
      },
      {
        id: 1,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:00.000Z'
      },
      {
        id: 6,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:05.000Z'
      },
      {
        id: 4,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:36:00.000Z'
      },
      {
        id: 2,
        sourceAccount: 'A',
        targetAccount: 'B',
        amount: 100,
        category: 'eating_out',
        time: '2018-03-02T10:33:50.000Z'
      },
      {
        id: 5,
        sourceAccount: 'A',
        targetAccount: 'C',
        amount: 250,
        category: 'other',
        time: '2018-03-02T10:33:00.000Z'
      },
      { id: 6,
        sourceAccount: 'my_account',
        targetAccount: 'internet_shop',
        amount: -250,
        category: 'other',
        time: '2018-03-01T22:16:40.000Z' },
      { id: 102,
        sourceAccount: 'my_account',
        targetAccount: 'internet_shop',
        amount: -250,
        category: 'other',
        time: '2018-03-01T22:16:50.000Z' }
    ];

    transactions.forEach((transaction) => {
      const key =
        this.dateToUTC(new Date(transaction.time),true) +
        transaction.sourceAccount + transaction.targetAccount + transaction.category + transaction.amount;
      if (transactionsMap.has(key)) {
        transactionsMap.get(key).push(transaction);
      } else {
        transactionsMap.set(key, [transaction]);
      }
    });

    transactionsMap = new Map([...transactionsMap.entries()].sort());

    for (const transactionsMapElement of transactionsMap) {
      if (transactionsMapElement[1].length > 1) {
        transactionsMapElement[1].sort((a, b) => {
          return this.dateToUTC(new Date(a.time)) - this.dateToUTC(new Date(b.time));
        });
        transactionsMap.set(transactionsMapElement[0], transactionsMapElement[1].filter(this.filterTransactions));
        if (transactionsMap.has(transactionsMapElement[0]) &&
          transactionsMap.get(transactionsMapElement[0]).length > 1) {
          duplicates.push(transactionsMap.get(transactionsMapElement[0]));
        }
      }
    }
    return duplicates;
  }


}

export default KlarnaTask2.getInstance();