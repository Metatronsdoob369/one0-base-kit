import React from 'react';
import PATHsassin3DMermaid from '@/components/PATHsassin3DMermaid';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, MousePointer2, RotateCcw, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const PATHsassin3D: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Visualization */}
      <PATHsassin3DMermaid />
      
      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-10"
      >
        <Link
          to="/pathsassin"
          className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </motion.div>
      
      {/* Controls Guide */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 max-w-xs"
      >
        <div className="flex items-center mb-3">
          <Info className="w-4 h-4 text-white mr-2" />
          <h3 className="text-white font-semibold">3D Controls</h3>
        </div>
        <div className="space-y-2 text-sm text-white/80">
          <div className="flex items-center">
            <MousePointer2 className="w-4 h-4 mr-2" />
            <span>Click nodes to view details</span>
          </div>
          <div className="flex items-center">
            <RotateCcw className="w-4 h-4 mr-2" />
            <span>Drag to rotate view</span>
          </div>
          <div className="flex items-center">
            <ZoomIn className="w-4 h-4 mr-2" />
            <span>Scroll to zoom</span>
          </div>
        </div>
      </motion.div>
      
      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-4 left-4 z-10 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
      >
        <h3 className="text-white font-semibold mb-3">Skill Domains</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-white/80 text-sm">Outer Skills</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-white/80 text-sm">Middle Skills</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-white/80 text-sm">Inner Skills</span>
          </div>
        </div>
      </motion.div>
      
      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-4 right-4 z-10 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 max-w-md"
      >
        <h3 className="text-white font-semibold mb-2">Interactive Skill Network</h3>
        <p className="text-white/80 text-sm">
          Explore your mastery journey through this 3D visualization. Each sphere represents a skill, 
          with connections showing how skills relate and build upon each other. The size and glow 
          intensity reflect your progress and mastery level.
        </p>
      </motion.div>
    </div>
  );
};

export default PATHsassin3D; 