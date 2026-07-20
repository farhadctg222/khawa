"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


type SplashScreenProps = {
  children: React.ReactNode;
};


export default function SplashScreen({
  children,
}: SplashScreenProps) {

  const [showSplash, setShowSplash] = useState(false);
  const [checked, setChecked] = useState(false);


  useEffect(() => {

    const seen = localStorage.getItem("splashShown");


    if (!seen) {

      setShowSplash(true);


      const timer = setTimeout(() => {

        localStorage.setItem(
          "splashShown",
          "true"
        );

        setShowSplash(false);
        setChecked(true);

      }, 5000);


      return () => clearTimeout(timer);


    } else {

      setChecked(true);

    }

  }, []);


  if (showSplash) {

    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">

               <div className="relative w-64 h-64">
  <Image
    src="/welcome.png"
    alt="welcome"
    fill
    sizes="2px"
    className="object-contain"
  />
</div>

      </div>
    );

  }


  if (!checked) {
    return null;
  }


  return children;
}