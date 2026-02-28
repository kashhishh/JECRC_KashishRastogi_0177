//You are building a Dynamic Tax Computation Engine for a finance application.

//Different tax categories calculate tax differently:

//Individual Tax → Based on income slabs
//Business Tax → Based on income + surcharge
//Senior Citizen Tax → Special exemption rules


using System;

namespace DynamicTaxComputation
{

    class TaxPayer
    {
        public int TaxPayerId { get; set; }
        public string Name { get; set; }
        public double Income { get; set; }
        public double Surcharge { get; set; }
    }


    class TaxEngine
    {
        public void Compute(TaxPayer taxPayer, string category, Func<TaxPayer, double> calculator)
        {
            double tax = calculator(taxPayer);

            Console.WriteLine("========= TAX COMPUTATION =========");
            Console.WriteLine($"Name     : {taxPayer.Name}");
            Console.WriteLine($"Category : {category}");
            Console.WriteLine($"Tax      : {tax}");
            Console.WriteLine("---------------------------------\n");
        }
    }

    class Program
    {
        static void Main()
        {

            TaxPayer taxPayer = new TaxPayer
            {
                TaxPayerId = 801,
                Name = "Ravi",
                Income = 800000,
                Surcharge = 20000
            };


            Func<TaxPayer, double> IndividualTaxRule =
                tp => tp.Income * 0.10;

            Func<TaxPayer, double> BusinessTaxRule =
                tp => (tp.Income * 0.15) + tp.Surcharge;

            Func<TaxPayer, double> SeniorCitizenTaxRule =
                tp => tp.Income * 0.05;


            TaxEngine engine = new TaxEngine();


            engine.Compute(taxPayer, "Individual", IndividualTaxRule);
            engine.Compute(taxPayer, "Business", BusinessTaxRule);
            engine.Compute(taxPayer, "Senior Citizen", SeniorCitizenTaxRule);
        }
    }
}
