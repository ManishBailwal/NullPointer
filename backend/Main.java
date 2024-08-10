import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        
        System.out.print("Enter the ending value: ");
        int end = scanner.nextInt();

        for (int i = 1; i <= end; i++) {
            System.out.println( i);
        }

        scanner.close();
    }
}