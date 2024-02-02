"use client";
import MultipleSelect from "@/components/MultipleSelect";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex justify-center items-center min-h-screen">
      {isClient && <MultipleSelect />}
    </main>
  );
}
