﻿using System;
using System.Globalization;
using TaxCalculator.Buisness;
using TaxCalculator.Interface;

namespace TaxCalculator.UI
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine("\t\t\t\t Welcome To Income Tax Calculator \n\n");

            double income;
            double deduction;


            // Calculate tax until user stops the program
            while(true)
            {
                Console.ForegroundColor = ConsoleColor.Gray;

                // Calling GetValue(message to print) function and storing the values
                income = GetValue("Enter your income in Rupees");
                deduction = GetValue("Enter your 80C investment amount in Rupees");

                // Object for calculating Gross Taxable Income and Tax for different slabs
                IncomeTax it = new IncomeTax();

                double gti = it.GTI(income, deduction);
                Slabs ITax = it.TaxDeduction(gti);

                
                Display(ITax);


                // Check response of user for repeating process
                char response = 'p';

                do
                {
                    Console.WriteLine("\n\nDo you want to calculate your tax again ?(y/n)");
                    try
                    {
                        response = Convert.ToChar(Console.ReadLine());
                        response = Char.ToLower(response);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Invalid response \n" + e.Message);
                    }
                } while (response != 'n' && response != 'y');
                

                Console.WriteLine("\n\n");
                if( response == 'n')
                {
                    Environment.Exit(0);
                }
            }
        }

        private static double GetValue(string msg)
        {
            Console.WriteLine(msg);
            double temp;

            try
            {
                temp = Convert.ToDouble(Console.ReadLine());
                
                if (temp < 0) 
                {
                    Console.WriteLine("Negative input detected");
                    return GetValue(msg);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return GetValue(msg);
            }

            return temp;
        }

        public static void Display(Slabs ITax)
        {
            //  Display Tax amount slabwise
            //  Converted amounts to string with Indian currency format
            Console.WriteLine("\nSlabs \t\t\t\t Amount per slabs");
            Console.WriteLine("--------------------------------------------------------------");
            Console.WriteLine("Rs. 2,50,000 - 5,00,000  \t Rs. {0}", ITax.firstSlab.ToString("#,0.00", new CultureInfo("hi-IN")));
            Console.WriteLine("Rs. 5,00,000 - 10,00,000 \t Rs. {0}", ITax.secondSlab.ToString("#,0.00", new CultureInfo("hi-IN")));
            Console.WriteLine("Rs. 10,00,000+   \t\t Rs. {0}", ITax.thirdSlab.ToString("#,0.00", new CultureInfo("hi-IN")));
            Console.WriteLine("--------------------------------------------------------------");
            Console.BackgroundColor = ConsoleColor.Red;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("Total amt \t\t\t Rs. {0}", ITax.totalAmt.ToString("#,0.00", new CultureInfo("hi-IN")));
            Console.BackgroundColor = ConsoleColor.Black;
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine("--------------------------------------------------------------");
        }
    }
}
