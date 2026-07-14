import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import CartProvider from "./context/CartContext";   
import SplashScreen from "./componets/SplashScreen";
export const metadata: Metadata = {
  title: "khawa.online - Online Food Delivery Service",
  description: "khawa.online is an online food delivery service that connects customers with local restaurants. We offer a wide variety of cuisines and dishes, delivered straight to your door. Whether you're craving pizza, sushi, or a healthy salad, SebaMile has you covered. Our easy-to-use platform allows you to browse menus, place orders, and track deliveries in real-time. Experience the convenience of delicious food at your fingertips with SebaMile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" className="">
      <body className="mt-8">

      <CartProvider > 
              <SplashScreen>
        <Navbar />

        {children}

      
      </SplashScreen>
   
        </CartProvider>
       
    
        <Footer></Footer>


        </body>
    </html>
  );
}
