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
        
        public Slabs TaxDeduction(double gti)
        {
            Slabs slab = new Slabs();
   
            //  Calculating tax amount in every slab if no tax amount make it 0
            slab.firstSlab = Math.Max((Math.Min(gti, 500000) - 250000), 0) * 0.05;
            slab.secondSlab = Math.Max((Math.Min(gti, 1000000) - 500000), 0) * 0.20;
            slab.thirdSlab = Math.Max((gti - 1000000), 0) * 0.30;
            slab.totalAmt = slab.firstSlab + slab.secondSlab + slab.thirdSlab;

            return slab;
        }
    }

}
