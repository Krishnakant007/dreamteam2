// app/terms/page.tsx
export default function TermsPage() {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-black text-white">
        <h1 className="text-3xl font-bold mb-6 text-red-500">TERMS AND CONDITIONS</h1>
        
        <div className="space-y-6 text-sm">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Acceptance of Risk</h2>
            <p className="mb-4">
              YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOUR USE OF FASHTRA'S SERVICES IS AT YOUR SOLE RISK. 
              THE AI-DRIVEN NATURE OF OUR PLATFORM INVOLVES INHERENT UNCERTAINTIES AND RISK OF LOSS.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-bold mb-3">2. No Liability</h2>
            <p className="mb-4">
              FASHTRA, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS SHALL NOT BE LIABLE 
              FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT 
              LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-bold mb-3">3. No Guarantees</h2>
            <p className="mb-4">
              OUR AI ALGORITHMS PROVIDE SUGGESTIONS ONLY. FASHTRA MAKES NO REPRESENTATIONS, WARRANTIES, OR GUARANTEES, 
              EXPRESS OR IMPLIED, REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY PREDICTIONS OR RECOMMENDATIONS.
            </p>
          </section>
  
          <div className="mt-8 p-4 bg-gray-900 rounded-lg">
            <p className="font-bold text-red-400">
              BY USING FASHTRA, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS, UNDERSTAND THEM, 
              AND AGREE TO BE BOUND BY THEM. YOU FURTHER ACKNOWLEDGE THAT YOU ARE SOLELY RESPONSIBLE 
              FOR ALL DECISIONS MADE USING OUR PLATFORM.
            </p>
          </div>
        </div>
      </div>
    );
  }