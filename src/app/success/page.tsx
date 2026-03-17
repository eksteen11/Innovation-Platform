'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    // Clear the cart when landing on the success page
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-foreground">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8 text-lg">
          Your healthy snack bags are scheduled for delivery to the school. We'll notify the school administration.
        </p>
        
        <Link
          href="/"
          className="inline-block w-full bg-primary text-white px-6 py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md active:scale-95"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}