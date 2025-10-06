import { ArrowRight, Zap, Layers, Settings, CheckCircle } from 'lucide-react';

interface Product {
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  power: string;
  speed: string;
  color: string;
}

const products: Product[] = [
  {
    name: 'Fiber Laser Cutting Machine',
    category: 'Metal Cutting',
    description: 'High-precision fiber laser cutting for metal sheets with unmatched speed and accuracy. Perfect for automotive and aerospace applications.',
    image: 'https://images.pexels.com/photos/1267335/pexels-photo-1267335.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Auto-focus system', 'Smart nesting software', 'Energy efficient'],
    power: '3-12 kW',
    speed: 'Up to 120 m/min',
    color: 'from-red-500 to-red-600'
  },
  {
    name: 'CO2 Laser Engraving System',
    category: 'Engraving & Marking',
    description: 'Versatile CO2 laser system for engraving and cutting non-metal materials. Ideal for signage, packaging, and customization.',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Multi-material support', 'Camera positioning', 'Rotary attachment'],
    power: '60-150W',
    speed: 'Up to 1000 mm/s',
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Laser Welding Station',
    category: 'Welding Solutions',
    description: 'Advanced laser welding system for precise joining of metals. Features real-time monitoring and adaptive power control.',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Wobble welding', 'Seam tracking', 'Minimal distortion'],
    power: '1-3 kW',
    speed: 'Up to 10 m/min',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: '3D Laser Cutting Robot',
    category: 'Automation',
    description: '6-axis robotic arm with integrated laser cutting head for complex 3D shapes. Industry 4.0 ready with IoT connectivity.',
    image: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['AI path optimization', 'Remote monitoring', 'Collision detection'],
    power: '2-6 kW',
    speed: 'Variable',
    color: 'from-green-500 to-green-600'
  }
];

export default function ProductsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Layers className="w-4 h-4" />
            Our Products
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Precision Laser Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of laser systems engineered for excellence in manufacturing, cutting, welding, and engraving applications
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-12">
          {products.map((product, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-4 text-white">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4" />
                          <span className="text-sm font-semibold">Power</span>
                        </div>
                        <div className="text-lg font-bold">{product.power}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Settings className="w-4 h-4" />
                          <span className="text-sm font-semibold">Speed</span>
                        </div>
                        <div className="text-lg font-bold">{product.speed}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-6">
                  <div>
                    <div className={`inline-block bg-gradient-to-r ${product.color} text-white px-4 py-1 rounded-full text-sm font-semibold mb-3`}>
                      {product.category}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      {product.name}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {product.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 text-green-600 mt-0.5 flex-shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button className={`bg-gradient-to-r ${product.color} hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl`}>
                      View Details
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="border-2 border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all duration-300">
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our engineering team can design and build tailored laser systems to meet your specific manufacturing requirements
            </p>
            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
              Contact Engineering Team
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
