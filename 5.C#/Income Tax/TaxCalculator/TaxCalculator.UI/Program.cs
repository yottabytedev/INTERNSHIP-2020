using System;
using System.Globalization;
using TaxCalculator.Buisness;

namespace TaxCalculator.UI
{
    class Program
    {
        static void Main(string[] args)
        {
            double income = 0.0;
            double deduction = 0.0;

            Console.WriteLine("Enter your income in Rupees");
            try
            {
                income = Convert.ToDouble(Console.ReadLine());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.ReadKey();
                Environment.Exit(0);
            }

            Console.WriteLine("Enter your 80C investment amount in Rupees");
            try
            {
                deduction = Convert.ToDouble(Console.ReadLine());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.ReadKey();
                Environment.Exit(0);
            }

            // Terminate program if negative salary or deduction is provided
            if (income < 0 || deduction < 0)
            {
                Console.WriteLine("Negative input detected");
                Console.ReadKey();
                Environment.Exit(0);
            }


            IncomeTax it = new IncomeTax();
            
            var gti = it.GTI(income, deduction);      //    Calculate Gross Taxable Income
            var ITax = (slabs)it.TaxDeduction(gti);   //    Calculate Tax for different slabs

            Program display = new Program();
            display.Display(ITax);                    //    Display Tax values
            
            Console.ReadKey();
        }

        void Display(slabs ITax)
        {
            //  Display Tax amount slabwise
            //  Converted amounts to string with Indian currency format
            Console.WriteLine("\nSlabs \t\t\t\t Amount per slabs");
            Console.WriteLine("--------------------------------------------------------------");
            Console.WriteLine("Rs. 2,50,000 - 5,00,000  \t Rs. {0}", ITax.slab1.ToString("#,0.00", new CultureInfo("hi-IN")));
            Console.WriteLine("Rs. 5,00,000 - 10,00,000 \t Rs. {0}", ITax.slab2.ToString("#,0.00", new CultureInfo("hi-IN")));
            Console.WriteLine("Rs. 10,00,000+   \t\t Rs. {0}", ITax.slab3.ToString("#,0.00", new CultureInfo("hi-IN")));
            Console.WriteLine("--------------------------------------------------------------");
            Console.WriteLine("Total amt \t\t\t Rs. {0}", ITax.totalAmt.ToString("#,0.00", new CultureInfo("hi-IN")));
            Console.WriteLine("--------------------------------------------------------------");
        }
    }
}
