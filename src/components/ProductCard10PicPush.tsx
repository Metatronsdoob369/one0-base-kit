import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, ArrowRight } from 'lucide-react';
import { logAnalyticsEvent } from '@/lib/logAnalyticsEvent';

export const ProductCard10PicPush = () => {
  const handleClick = () => {
    logAnalyticsEvent('product_click', { product: '10PicPush' });
  };

  return (
    <div className="rounded-2xl shadow-xl border border-gray-700 bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 hover:shadow-2xl transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-yellow-400" />
          <h3 className="text-xl font-semibold text-white">10 Pic Push</h3>
        </div>
        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
      </div>

      <p className="text-sm text-gray-300 mb-4">
        Upload 10 photos, answer a few fun questions, and get your AI-powered brand reveal — no posting, no pressure.
      </p>

      <div className="flex justify-between items-center">
        <Link to="/10-pic-push" onClick={handleClick}>
          <span className="text-sm text-yellow-400 hover:underline inline-flex items-center gap-1">
            Try it now <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
        <span className="text-xs text-gray-400">Free preview</span>
      </div>
    </div>
  );
}; 