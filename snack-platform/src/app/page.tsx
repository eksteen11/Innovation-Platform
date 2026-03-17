import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types'

// Mock data until Supabase is fully populated
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Mango Magic',
    description: 'Sweet and tangy dried mango slices, perfect for a midday energy boost.',
    price: 4.50,
    image_url: '',
    is_active: true
  },
  {
    id: '2',
    name: 'Apple Crisps',
    description: 'Crunchy dried apple rings with a hint of cinnamon.',
    price: 3.75,
    image_url: '',
    is_active: true
  },
  {
    id: '3',
    name: 'Berry Blast',
    description: 'A mix of dried strawberries, blueberries, and raspberries.',
    price: 5.00,
    image_url: '',
    is_active: true
  },
  {
    id: '4',
    name: 'Banana Bites',
    description: 'Chewy banana coins, naturally sweet and rich in potassium.',
    price: 4.00,
    image_url: '',
    is_active: true
  }
]

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-4">Healthy Snacks, Delivered to School</h1>
        <p className="text-gray-600 max-w-2xl text-lg">
          Choose from our selection of premium dried fruit bags. Nutritious, delicious, and easy to pick up right at your school.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Available Snacks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}