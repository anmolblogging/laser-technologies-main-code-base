import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1305753/pexels-photo-1305753.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-red-600/50 to-purple-900/50"
        style={{
          background: 'linear-gradient(90deg, rgba(243, 21, 36, 0.5) 0%, rgba(6, 3, 44, 0.5) 100%)'
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-white"
           style={{clipPath: 'polygon(0 40%, 100% 0%, 100% 100%, 0% 100%)'}}>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                WebkitTextStroke: '1px rgba(0,0,0,0.1)'
              }}>
            Sharper. Faster. Smarter Manufacturing.
          </h1>

          <h4 className="text-lg sm:text-xl md:text-2xl text-white mb-10 max-w-4xl mx-auto leading-relaxed">
            Boost productivity and precision with our state-of-the-art laser machines and automation solutions designed for your success.
          </h4>

          <div className="mb-16">
            <button className="group bg-white hover:bg-yellow-50 text-black font-semibold px-8 sm:px-12 py-4 sm:py-5 rounded-lg text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
              Explore Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="max-w-4xl mx-auto mt-12 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/KR5fWm6JBds"
                title="Manufacturing Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
