'use client'

import { useCartStore } from '@/store/cart'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { School } from '@/types'
import { motion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'

// Mock schools for UI
const mockSchools: School[] = [
  { id: '1', name: 'Springfield High', address: '123 Main St', is_active: true },
  { id: '2', name: 'Lincoln Middle School', address: '456 Elm St', is_active: true },
  { id: '3', name: 'Oakridge Elementary', address: '789 Oak Ave', is_active: true },
]

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<string>('')
  const [studentName, setStudentName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (items.length === 0) {
      router.push('/')
    }
  }, [items, router])

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSchool || !studentName) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          schoolId: selectedSchool,
          studentName
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  if (!isMounted || items.length === 0) return null

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout & Delivery</h1>
      
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 mb-8">
        <form onSubmit={handleCheckout} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Delivery School
            </label>
            <div className="grid grid-cols-1 gap-3">
              {mockSchools.map((school) => (
                <label
                  key={school.id}
                  className={`
                    relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-colors
                    ${selectedSchool === school.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-300 hover:border-gray-400'}
                  `}
                >
                  <input
                    type="radio"
                    name="school"
                    value={school.id}
                    className="sr-only"
                    onChange={(e) => setSelectedSchool(e.target.value)}
                  />
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">{school.name}</span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">{school.address}</span>
                    </span>
                  </span>
                  <Check
                    className={`h-5 w-5 ${selectedSchool === school.id ? 'text-primary' : 'hidden'}`}
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
              Student Full Name (For pickup)
            </label>
            <input
              type="text"
              id="studentName"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white"
              placeholder="e.g. Jane Doe"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total to pay</p>
              <p className="text-2xl font-bold">${totalPrice().toFixed(2)}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!selectedSchool || !studentName || isLoading}
              type="submit"
              className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Pay with Stripe'}
              {!isLoading && <ChevronRight className="w-5 h-5" />}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  )
}