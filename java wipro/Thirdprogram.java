import java.util.Scanner;

class SwitchExample {
    public void menuOption() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter your choice");
        int option = sc.nextInt();

        switch (option) {
            case 1:
                System.out.println("Item added");
                break;
            case 2:
                System.out.println("Item deleted");
                break;
            case 3:
                System.out.println("Item updated");
                break;
            case 4:
                System.out.println("Exit");
                System.exit(0);
        }
    }
}

public class ThirdProgram {
    public static void main(String[] args) {

        int a = 20, b = 40;
        String country = "India";
        String state = "Delhi";

        if (country.equals("India")) {
            System.out.println("Country is India");
        } else if (state.equals("Delhi")) {
            System.out.println("and state is Delhi");
        } else {
            System.out.println("Wrong Country is selected");
        }

        b = (a == 20) ? 20 : 40;
        System.out.println("Value of b is: " + b);

        SwitchExample se = new SwitchExample();
        se.menuOption();
    }
}
