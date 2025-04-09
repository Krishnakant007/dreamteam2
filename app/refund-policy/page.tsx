// app/refund-policy/page.tsx
export default function RefundPolicyPage() {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-black text-white">
        <h1 className="text-3xl font-bold mb-6 text-red-500">NO REFUND POLICY</h1>
        
        <div className="space-y-6 text-sm">
          <section>
            <h2 className="text-xl font-bold mb-3">1. All Sales Are Final</h2>
            <p className="mb-4">
              ALL PURCHASES AND TRANSACTIONS ON FASHTRA ARE FINAL. NO REFUNDS WILL BE ISSUED UNDER ANY CIRCUMSTANCES, 
              INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dissatisfaction with AI algorithm performance</li>
              <li>Technical issues or platform downtime</li>
              <li>User errors in team selection</li>
              <li>Changes in personal circumstances</li>
              <li>Any other reason not explicitly covered here</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-bold mb-3">2. No Chargebacks</h2>
            <p className="mb-4">
              YOU AGREE NOT TO INITIATE ANY CHARGEBACKS OR PAYMENT REVERSALS. ANY ATTEMPT TO DO SO MAY RESULT IN 
              IMMEDIATE ACCOUNT TERMINATION AND LEGAL ACTION TO RECOVER DISPUTED AMOUNTS PLUS APPLICABLE FEES.
            </p>
          </section>
  
          <div className="mt-8 p-4 bg-gray-900 rounded-lg">
            <p className="font-bold text-red-400">
              BY MAKING A PURCHASE ON FASHTRA, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND THIS NO REFUND POLICY 
              AND AGREE TO BE BOUND BY ITS TERMS WITHOUT EXCEPTION.
            </p>
          </div>
        </div>
      </div>
    );
  }