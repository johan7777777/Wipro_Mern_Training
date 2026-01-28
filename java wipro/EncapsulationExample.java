public class EncapsulationExample {

    private int id;
    private String name;
    private long phoneno;
    private double balance;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String aadharName) {
        this.name = aadharName;
    }

    public long getPhoneno() {
        return phoneno;
    }

    public void setPhoneno(long phoneno) {
        if(String.valueOf(phoneno).length() == 10) {
            this.phoneno = phoneno;
        }
    }

    public void deposit(double amount) {
        if(amount > 0) {
            balance += amount;
        }
    }

    public void withdraw(double amount) {
        if(amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }

    public double getBalance() {
        return balance;
    }

    public static void main(String[] ar) {

        EncapsulationExample obj = new EncapsulationExample();
        obj.setId(101);
        obj.setName("Niti Dwivedi");
        obj.setPhoneno(9876543210L);

        obj.deposit(5000);

        System.out.println("Hi! " + obj.getName() +
            " After depositing, the updated Balance is: " + obj.getBalance());
    }
}

