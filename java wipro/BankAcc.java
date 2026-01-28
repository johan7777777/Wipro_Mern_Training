
class BankAcc {

    private double balance;

    // constructor
    public BankAcc(double balance) {
        this.balance = balance;
    }

    // deposit method
    public void deposit(double amount) {
        balance = balance + amount;
        System.out.println("Deposited Amount: " + amount);
        System.out.println("Current Balance: " + balance);
    }

    

    // withdraw method
    public void withdraw(double amount) {
        if (amount <= balance) {
            balance = balance - amount;
            System.out.println("Withdrawn Amount: " + amount);
        } else {
            System.out.println("Insufficient Balance");
        }
        System.out.println("Current Balance: " + balance);
    }

    // get balance
    public double getBalance() {
        return balance;
    }
}
