class PrintingVariables {
    static String companyName = "Wipro Ltd";
}
public class SecondProgram {
    // access modifiers : - default , public , protected and private
    // non- access modifiers : - final , abstract , strictfp
    // local variables (inside a method ,or as an argiments void display(int a , int
    // b)
    // class variables (Static variables) which are called directly with the class
    // name if class is also static
    // instance variables ( non-static variables ) which are called with the help of
    // instance of a class or object of a class
    String name = "john";
    int age = 22; // instance variables
    public static void main(String[] args) {
        SecondProgram obj = new SecondProgram();
        System.out.println(obj.name);
        System.out.println(obj.age);
        System.out.println(PrintingVariables.companyName);
        //type casting is required you want to save the value from big bucket to small bucket 
byte value1 = 10;
short value2 = value1;  // implicit casting -- Widening type casting
short value3=78;
byte value4 = (byte)value3;  // explicit casting -- > Narrowing type casting
//operators : relational , logical, arithmetic , assignment , bitwise

    }   
}
