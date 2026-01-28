public abstract class AbstractionExample {

    // contains abstract or non-abstract methods

    public abstract void phoneCall();  // implementation is hidden
   
    public void aboutPhone(){

        long memory;
    };  // non abstract which is not hidden and already revealed the implementation

    public static void main(String[] args) {
        
        Incentive incentive;

        incentive = new Manager(); // we cannot  create an object of abstract class
        incentive.diwaliBonus();

        incentive = new SE();
        incentive.diwaliBonus();
    }
    
}