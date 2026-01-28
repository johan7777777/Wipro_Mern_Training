public class StringExample {
    public static void main(String[] args) {
        
        String str = "Here is my Java Program";
        int count = 0;
        str = str.toUpperCase();
        for(int i =0; i<str.length();i++){
            char ch = str.charAt(i);
            if (ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U'){
                count++;
            }
        }
        System.out.println("Number of vowels: " + count);
    }
}