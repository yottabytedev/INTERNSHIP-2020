using System;
using TaxCalculator.Interface;

namespace TaxCalculator.Buisness
{
    public class IncomeTax : IncomeTaxInterface
    {
        public double GTI(double income, double deduction)
        {
            //  Return Gross Taxable Income after subtracting the deduction maximum of amount 1.5 lakh
            return Math.Max((income - Math.Min(150000, deduction)),0);
        }
        
        public object TaxDeduction(double gti)
        {
            slabs s = new slabs();
   
            //  Calculating tax amount in every slab if no tax amount make it 0
            s.slab1 = Math.Max((Math.Min(gti, 500000) - 250000), 0) * 0.05;
            s.slab2 = Math.Max((Math.Min(gti, 1000000) - 500000), 0) * 0.20;
            s.slab3 = Math.Max((gti - 1000000), 0) * 0.30;
            s.totalAmt = s.slab1 + s.slab2 + s.slab3;

            return s;
        }
    }

    // Class for storing value of each slab
    public class slabs
    {
        public double slab1;
        public double slab2;
        public double slab3;
        public double totalAmt;
    }
}
