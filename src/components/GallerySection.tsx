import React, { useState } from 'react';
import { useFitnessCMS } from '../context/FitnessContext';
import { filterGalleryItems } from '../utils/fitnessLogic';
import { GalleryItem } from '../types/fitness';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { store } = useFitnessCMS();
  const { gallery } = store;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Gym Interior' },
    { id: 'equipment', label: 'Equipment & Iron' },
    { id: 'training', label: 'Training in Action' },
  ];

  const filteredItems = filterGalleryItems(gallery, selectedCategory);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-500">
              <span className="w-6 h-[2px] bg-rose-600"></span>
              <span>Visual Tour & Equipment</span>
            </div>
            <h2 className="font-athletic text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
              Inside <span className="text-rose-600">Fitness Point</span>
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Take an interactive look inside our premium strength arena, cardio floor, and training environments.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer aspect-[4/3] shadow-md hover:border-rose-600/60 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Overlay Button */}
              <div className="absolute top-3 right-3 p-2 rounded-lg bg-neutral-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-neutral-700 backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest font-mono">
                  {item.category}
                </p>
                <h4 className="font-athletic text-lg font-bold text-white uppercase tracking-wide mt-0.5 line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && filteredItems[activeImageIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery Image Lightbox"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors border border-neutral-700 z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors border border-neutral-700 z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors border border-neutral-700 z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[450px]">
              <img
                src={filteredItems[activeImageIndex].image}
                alt={filteredItems[activeImageIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-widest font-mono">
                  {filteredItems[activeImageIndex].category}
                </span>
                <h3 className="font-athletic text-2xl font-bold uppercase text-white mt-1">
                  {filteredItems[activeImageIndex].title}
                </h3>
                <p className="text-sm text-neutral-400 mt-0.5">
                  {filteredItems[activeImageIndex].caption}
                </p>
              </div>
              <span className="text-xs text-neutral-500 font-mono tabular-nums shrink-0 ml-4">
                {activeImageIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
