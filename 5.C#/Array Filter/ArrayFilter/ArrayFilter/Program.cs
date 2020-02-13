using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using testConsole;

namespace testConsole
{
    public delegate bool filter(int num);

    // Array for storing numbers
    public class ArrayNumbers
    {
        private int[] Array = new int[size];

        /* Keeping size static. Once value of size is changed here reflect in
           whole solution */
        public static int size = 10;

        // indexer
        public int this[int index]
        {
            get
            {
                return Array[index];
            }

            set
            {
                Array[index] = value;
            }
        }
    }

    // Filters for array numbers
    public class Filters
    {
        public static bool EvenNumbers(int n)
        {
            return (n % 2 == 0);
        }

        public static bool GreaterThanTen(int n)
        {
            return (n > 10);
        }

        public static bool DivisibleByFive(int n)
        {
            return (n % 5 == 0);
        }
    }


    public class Program
    {
        public static void Main(string[] args)
        {

            ArrayNumbers arr = new ArrayNumbers();

            Console.WriteLine("Enter 10 numbers\n");

            // Getting an array of 10 no. from user
            GetArray(arr);

            while (true)
            {
                // Get filter choice from user
                filter filterOption = getFilterChoice();

                // Apply filter on array and display the result
                GetResult(arr, filterOption);

            }
        }

        public static filter getFilterChoice()
        {
            Console.WriteLine("Select one to filter array elements:");
            Console.WriteLine("1) Returns all even numbers.");
            Console.WriteLine("2) Returns numbers greater than 10.");
            Console.WriteLine("3) Returns numbers divisible by 5.");
            Console.WriteLine("4) Exit.");

            // taking input for filter choice and converting it from string to int
            int filterChoice = Convert.ToInt32(Console.ReadLine());

            // Defining an empty delegate 
            filter filterOption = null;

            // Put appropriate function(filter) in delegate
            switch (filterChoice)
            {
                case 1: filterOption = Filters.EvenNumbers;
                    break;
                case 2: filterOption = Filters.GreaterThanTen;
                    break;
                case 3: filterOption = Filters.DivisibleByFive;
                    break;
                case 4: Environment.Exit(0);
                    break;
                default: Console.WriteLine("Choose a valid filter\n");
                    // If wrong input is entered ask user to enter the result again
                    filterOption = getFilterChoice();
                    break;
            }
            return filterOption;
        }

        // Apply filter on each no. in array and print only if no. fits the filter
        public static void GetResult(ArrayNumbers arr, filter filterOption)
        {
            Console.WriteLine("\n--------------------------------------------------------------\n");
            for (int i = 0; i < ArrayNumbers.size; i++)
            {
                if (filterOption(arr[i]))
                {
                    Console.Write(arr[i] + "\t");
                }
            }
            Console.WriteLine("\n--------------------------------------------------------------\n");
        }

        // Get numbers from user. Exclude invalid inputs
        public static void GetArray(ArrayNumbers arr)
        {
            int i = 0;

            while (i < ArrayNumbers.size)
            {
                string temp = Console.ReadLine();
                int val;

                if (int.TryParse(temp, out val))
                {
                    val = Convert.ToInt32(temp);
                    arr[i++] = val;
                }
                else
                {
                    Console.WriteLine("Enter a valid number");
                }
            }
        }
    }
}
