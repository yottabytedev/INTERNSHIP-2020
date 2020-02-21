namespace TaxCalculator.Interface
{
    public interface IncomeTaxInterface
    {
        double GTI(double income, double deduction);        // Gross Taxable Income
        Slabs TaxDeduction(double gti);                    // Tax per slab
    }
}
