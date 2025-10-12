
export default function VideoSection() {
  return (
    <section
      className="py-20 bg-gray-50 "
      aria-label="Video demonstration of precision laser technology"
    >
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Witness Precision in Action
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Explore how our advanced laser systems redefine manufacturing
          efficiency, accuracy, and quality.
        </p>
      </div>

      {/* Video Wrapper */}
      <div className="flex justify-center">
        <div className="relative w-[80vw] h-[80vh]  overflow-hidden shadow-2xl">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/_KN_kmVpKAw?autoplay=0&mute=0&loop=0&rel=0&modestbranding=1"
            title="Laser Cutting Precision Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
