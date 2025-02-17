// // app/page.js
// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <h1 className="text-4xl font-bold mb-4">PATIENT</h1>
//       <p className="text-xl">PATIENT</p>
//     </main>
//   );
// }
'use client';

import { Button } from "@/components/ui/button";
import { auth } from "@/app/api/auth";


export default function Home() {
  const handleClick = async () => {
      await auth.logout();
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Button 
        onClick={handleClick}
        className="px-6 py-3 text-lg font-semibold transition-all hover:scale-105"
      >
        Click Me
      </Button>
    </div>
  );
}