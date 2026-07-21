"use client";

import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
 

  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(null); // ✅ new
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    delivery_note: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ order submit
  const handleSubmit = async () => {
    if (form.name.trim().length < 3) {
  alert("সঠিক নাম লিখুন");
  return;
}

if (!/^01[3-9]\d{8}$/.test(form.phone)) {
  alert("সঠিক মোবাইল নম্বর লিখুন");
  return;
}

if (form.address.trim().length < 10) {
  alert("সম্পূর্ণ ঠিকানা লিখুন");
  return;
}

    if (cart.length === 0) {
      alert("Cart empty!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          delivery_note: form.delivery_note,
          items: cart,
          total,
        }),
      });

      const data = await res.json();
      

      if (!res.ok) {
        alert(data.error || "Order failed!");
        return;
      }

      // ✅ order id save
     setOrderId(data.insertId);
     clearCart(); // ✅ clear cart after order

      // ✅ show modal
      setShowModal(true);
      //ok

    } catch (err) {
      console.error(err);
      alert("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧾 Checkout</h1>

      {/* Inputs */}
      <input
  type="text"
  placeholder="Full Name"
  value={form.name}
  className="border p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>

     <input
  type="tel"
  placeholder="01XXXXXXXXX"
  value={form.phone}
  maxLength={11}
  inputMode="numeric"
  className="border p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
  onChange={(e) => setForm({ ...form, phone: e.target.value })}
/>

     <input
  type="text"
  placeholder="Complete Address"
  value={form.address}
  className="border p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
  onChange={(e) => setForm({ ...form, address: e.target.value })}
/>

      {/* Delivery Note */}
      <textarea
  rows={4}
  value={form.delivery_note}
  placeholder="Delivery Note (Optional)"
  className="border p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
  onChange={(e) =>
    setForm({ ...form, delivery_note: e.target.value })
  }
/>

      {/* Order Summary */}
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Order Summary:</h2>

              {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>

              <p className="text-gray-500 text-sm">
                {item.quantity} × ৳{item.price}
              </p>
            </div>

            <h3 className="font-bold">
              ৳ {item.quantity * item.price}
            </h3>
          </div>
        ))}
      </div>

                  <div className="bg-green-50 rounded-xl p-4 mt-5">

              <div className="flex justify-between">

              <span>Subtotal</span>

              <span>৳ {total}</span>

              </div>

              <div className="flex justify-between mt-2">

              <span>Delivery Charge</span>

              <span>Free</span>

              </div>

              <hr className="my-3"/>

              <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span>৳ {total}</span>

              </div>

              </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded w-full"
      >
        {loading ? "Placing..." : "Place Order"}
      </button>

      {/* ✅ MODAL */}
     {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-80 text-center">

      <h2 className="text-xl font-bold mb-2">
        🎉 Order Placed!
      </h2>

      <p className="mb-3">
        Order No: <strong>#{orderId}</strong>
      </p>

      <button
        onClick={() => {
          router.push(`/ordersuccess?id=${orderId}`);
        }}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        OK
      </button>

    </div>
  </div>
)}
    </div>
  );
}