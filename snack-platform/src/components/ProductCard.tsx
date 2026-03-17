'use client'

import { Product } from '@/types'
import { useCartStore } from '@/store/cart'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
    >
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <span className="text-4xl">🥭</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(product)}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
            aria-label="Add to cart"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}