'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Truck, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

interface TopCarouselItem {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  discount?: string;
  ctaText: string;
  ctaLink: string;
  features?: string[];
  buttonText: string
}

export default function TopCarousel(): React.JSX.Element {
  const [topCarouselItems, setTopCarouselItems] = useState<TopCarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // ✅ Fetch Banners using AXIOS
  // ---------------------------

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        console.log("Api",process.env.NEXT_PUBLIC_API_URL);
        
        const API = `${process.env.NEXT_PUBLIC_API_URL}/api/banners/public`; 
        const res = await axios.get(API);


        if (Array.isArray(res.data)) { 
          setTopCarouselItems(res.data);
        } else if (res.data?.banners && Array.isArray(res.data.banners)) {
          setTopCarouselItems(res.data.banners);
        } else {
          console.warn('Unexpected banners response shape', res.data);
          setTopCarouselItems([]);
        }
      } catch (error) {
        console.error('Banner fetch error:', error);
        setTopCarouselItems([]);
      } finally {
        setLoading(false);
      }
    };
    console.log("API URL = ", process.env.NEXT_PUBLIC_API_URL);
    fetchBanners();
  }, []);








  // Auto Slide
  useEffect(() => {
    if (topCarouselItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % topCarouselItems.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [topCarouselItems]);

  // Loader
  if (loading) return <div className="text-center py-10">Loading banners...</div>;
  if (topCarouselItems.length === 0)
    return <div className="text-center py-10">No banners found</div>;

  return (
    <section className="relative bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">

          {/* Slider Container */}
          <div className="relative h-88 md:h-104 lg:h-120">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {topCarouselItems.map((item) => (
                <div key={item._id} className="w-full flex-shrink-0 relative">
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                    <div className="absolute inset-0 flex items-center px-8 md:px-16">
                      <div className="container mx-auto px-8">
                        <div className="max-w-2xl">

                          {/* Badge */}
                          <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow mb-3">
                            {item.badge}
                          </span>

                          {/* Title */}
                          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                            {item.title}
                          </h2>

                          {/* Subtitle */}
                          <p className="text-xl text-white/90 mb-6 font-medium">
                            {item.subtitle}
                          </p>

                          {/* Features */}
                          {item.features && (
                          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
                            {item.features.map((feature, index) => {
                              const icons = [Truck, Shield, Clock];
                              const Icon = icons[index % icons.length];
                              return (
                                <div key={index} className="flex items-center gap-2 text-white/80">
                                  <Icon className="h-5 w-5" />
                                  <span className="text-sm">{feature}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                          
                          {/* CTA Button */}
                          <Link href={item?.ctaLink || "#"}>
                            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold hover:scale-105 transition-all duration-300 shadow-md">
                              {item.buttonText}
                            </Button>
                          </Link>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
              onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + topCarouselItems.length) % topCarouselItems.length)
              }
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Right Arrow */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % topCarouselItems.length)
              }
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
            {topCarouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
