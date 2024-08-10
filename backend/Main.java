import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        // Create a Scanner object for input
        Scanner scanner = new Scanner(System.in);
        
        
        int num1 = scanner.nextInt();
 
        int num2 = scanner.nextInt();
        
        int num3 = scanner.nextInt();
        
        // Calculate the sum of the three numbers
        int sum = num1 + num2 + num3;
        
        // Display the result
        System.out.println(sum);
        
        // Close the scanner
        scanner.close();
    }
}
