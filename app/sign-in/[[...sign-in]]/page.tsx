// import { SignIn } from '@clerk/nextjs';

import { SignIn } from "@clerk/nextjs";
import { Card } from "../../../components/ui/card";

// export default function Page() {
//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url('/Grass.jpg')" }}
//     >
//       <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
//         <SignIn />
//       </div>
//     </div>
//   );
// }




export default function Page() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black"
      style={{ backgroundImage: "url('/Grass.jpg')" }}
    >
      <Card className="p-6 bg-opacity-80 rounded-lg shadow-lg">
        <SignIn />
      </Card>
    </div>
  );
}
