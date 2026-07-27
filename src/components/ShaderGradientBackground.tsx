// @ts-nocheck
import React, { Component } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

class ShaderErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('[ShaderGradient Error Boundary]:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-orange-500 via-amber-500 to-amber-600 opacity-60 blur-2xl animate-pulse" />
      );
    }
    return this.props.children;
  }
}

export const ShaderGradientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#F97316]" />
  );
};

export default ShaderGradientBackground;
