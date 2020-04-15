import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .map(t => (t.type === 'income' ? t.value : 0))
      .reduce((p, n) => p + n, 0);
    const outcome = this.transactions
      .map(t => (t.type === 'outcome' ? t.value : 0))
      .reduce((p, n) => p + n, 0);
    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
