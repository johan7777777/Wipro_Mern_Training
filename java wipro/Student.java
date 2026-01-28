public class Student {

    int id;
    String name;
    int[] marks;

    public Student()
    {


    }
    
    public Student(int id , String name , int[] marks) 
    {
        this.id = id;  
        this.name = name;
        this.marks = marks;

    }

    public void displayInfo()
    {
        System.err.println("Student Id : "+ id);
         System.err.println("Student Name : "+ name);
          System.err.println("Student Marks : ");

          for (int mark : marks)
          {

            System.out.println(mark +  " ");
          }
            System.out.println("\n..");
    }
}



import java.util.Scanner;
 

public class StudentArray {

    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
         
        System.out.println("How many students you have in this batch :");

        int batchSize = sc.nextInt();

        Student[] students = new Student[batchSize];

        for(int i=0 ; i<students.length ; i++)
        {

                System.out.println("enter student id: ");
                int id = sc.nextInt();
                System.out.println("enter student name: ");
                String name = sc.next();
                System.out.println("enter student subjects he/she wants to enroll: ");
                int n = sc.nextInt();
                int[] marks = new int[n];

                System.out.println("Enter marks for " + n + " subjects");
                for(int j=0 ; j<marks.length; j++)
                    {
                        System.out.println("Subject " + (j+1) + " : ");
                        marks[j] = sc.nextInt();
                    }   

  
                  students[i] = new Student(id,name,marks);


        }

            System.out.println("Student details are given below : ");
        for(Student s : students)
        {
            s.displayInfo();

        }
        sc.close();

    }
    
}
