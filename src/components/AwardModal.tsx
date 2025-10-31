import React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Award {
  id: string;
  title: string;
  description: string | null;
  image_url: string[] | null;
}

interface AwardModalProps {
  awardData: { award: Award; imageIndex: number } | null;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImageIndex: (idx: number) => void;
}

export default function AwardModal({
  awardData,
  onClose,
  onPrevImage,
  onNextImage,
  onSelectImageIndex,
}: AwardModalProps) {
  if (!awardData) return null;

  const { award, imageIndex } = awardData;

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="award-modal-title"
      aria-describedby="award-modal-description"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
        aria-label="Close modal"
      >
        <X size={32} />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full z-10">
        {imageIndex + 1} / {award.image_url?.length || 0}
      </div>

      <div
        className="max-w-7xl w-full h-[90vh] bg-gray-50 rounded-lg overflow-hidden flex flex-col lg:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="relative lg:w-1/2 h-64 lg:h-full bg-black flex items-center justify-center">
          <img
            src={award.image_url?.[imageIndex] || ""}
            alt={award.title}
            className="w-full h-full object-cover"
          />

          {/* Navigation Buttons for Images */}
          {award.image_url && award.image_url.length > 1 && (
            <>
              {imageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {imageIndex < award.image_url.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                {award.image_url.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectImageIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === imageIndex
                        ? "bg-white w-8"
                        : "bg-white/60 w-2 hover:bg-white/80"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 overflow-y-auto flex-1">
          <div className="p-8 lg:p-12">
            <h2
              id="award-modal-title"
              className="text-3xl lg:text-4xl font-medium mb-6 leading-tight font-primary text-whiteBgText"
            >
              {award.title}
            </h2>
            {award.description && (
              <div id="award-modal-description" className="prose prose-lg max-w-none text-whiteBgText font-secondary">
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg whitespace-pre-wrap">
                  {award.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
