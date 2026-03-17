'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const [isMounted, setIsMounted] = useState(false)
  const totalItems = useCartStore((state) => state.totalItems())

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-primary">
          SnackBags
        </Link>
        
        <Link href="/cart" className="relative p-2" aria-label="Cart">
          <ShoppingBag className="w-6 h-6 text-foreground" />
          <AnimatePresence>
            {isMounted && totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-0 right-0 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </header>
  )
}