"use client";

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
