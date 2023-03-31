##Balance by category
Calculate the balance in a specific category within the specified time period.

`getBalanceByCategoryInPeriod(transactionsList, category, startTime, endTime)`
####Input
You can assume that all parameters will always be present and valid.

```
list of transactions (Transaction[])
category (String)
start time (inclusive) (Date)
end time (exclusive) (Date)
Output
Total balance (Number)
Negative number means money spent.
```
Remember, this is what a transaction looks like:

```
{
  id: 123,
  sourceAccount: 'my_account',
  targetAccount: 'coffee_shop',
  amount: -30,
  category: 'eating_out',
  time: '2018-03-12T12:34:00Z'
}
```
