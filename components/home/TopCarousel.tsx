'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Truck, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

interface TopCarouselItem {
  _id: string;
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  features?: string[];
}

export default function TopCarousel(): React.JSX.Element {
  const [topCarouselItems, setTopCarouselItems] = useState<TopCarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/banners/public');
        // controller returns an array
        if (Array.isArray(res.data)) {
          setTopCarouselItems(res.data);
        } else if (res.data?.banners && Array.isArray(res.data.banners)) {
          // in case API shape differs
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

    fetchBanners();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (topCarouselItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topCarouselItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [topCarouselItems]);

  if (loading) return <div className="text-center py-10">Loading banners...</div>;
  if (!loading && topCarouselItems.length === 0) return <div className="text-center py-10">No banners found</div>;

  const currentItem = topCarouselItems[currentIndex];

  // safe link getter — returns string or undefined
  const safeHref = (href?: string) => {
    if (!href) return undefined;
    // allow only internal paths or absolute URLs. If invalid, fallback to "/"
    if (href.startsWith('/')) return href;
    try {
      const u = new URL(href);
      return u.href; // absolute URL is allowed
    } catch {
      return '/';
    }
  };

  return (
    <section className="relative bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
          {/* Slider */}
          <div className="relative h-88 md:h-104 lg:h-120">
            <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {topCarouselItems.map((item) => {
                const bg = item.image || '';
                return (
                  <div key={item._id} className="w-full flex-shrink-0 relative">
                    <div className="w-full h-full bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                      <div className="absolute inset-0 flex items-center px-8 md:px-16">
                        <div className="container mx-auto px-8">
                          <div className="max-w-2xl">
                            {item.badge && (
                              <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow mb-3">
                                {item.badge}
                              </span>
                            )}

                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                              {item.title ?? 'Untitled'}
                            </h2>

                            {item.subtitle && (
                              <p className="text-xl text-white/90 mb-6 font-medium">{item.subtitle}</p>
                            )}

                            {item.features && item.features.length > 0 && (
                              <div className="flex flex-wrap gap-4 mb-6">
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

                            {/* CTA: only render if text exists; wrap safely with Link or anchor */}
                            {item.ctaText ? (
                              (() => {
                                const href = safeHref(item.ctaLink);
                                if (href) {
                                  // if href is internal (startsWith('/')) use Next Link
                                  if (href.startsWith('/')) {
                                    return (
                                      <Link href={href}>
                                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold hover:scale-105 transition-all">
                                          {item.ctaText}
                                        </Button>
                                      </Link>
                                    );
                                  } else {
                                    // absolute external URL → open in new tab
                                    return (
                                      <a href={href} target="_blank" rel="noopener noreferrer">
                                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold hover:scale-105 transition-all">
                                          {item.ctaText}
                                        </Button>
                                      </a>
                                    );
                                  }
                                } else {
                                  // No href — render a disabled button or plain text (avoid Link with undefined)
                                  return (
                                    <Button size="lg" disabled className="bg-white/60 text-primary font-semibold">
                                      {item.ctaText}
                                    </Button>
                                  );
                                }
                              })()
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prev / Next */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + topCarouselItems.length) % topCarouselItems.length)}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % topCarouselItems.length)}
              aria-label="Next slide"
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
                className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
