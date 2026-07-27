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
    <ShaderErrorBoundary>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <ShaderGradientCanvas
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <ShaderGradient
            control="props"
            url=""
            shader="defaults"
            type="waterPlane"
            color1="#FF9800"
            color2="#EE8D24"
            color3="#FFB300"
            bgColor1="#FFFBF7"
            bgColor2="#FF9800"
            animate="on"
            uSpeed={0.25}
            uStrength={0.45}
            uDensity={1.2}
            cAzimuthAngle={180}
            cPolarAngle={90}
            cDistance={3.6}
            cameraZoom={1}
            wireframe={false}
            grain="on"
            lightType="3d"
            rotationX={0}
            rotationY={0}
            rotationZ={0}
          />
        </ShaderGradientCanvas>
      </div>
    </ShaderErrorBoundary>
  );
};

export default ShaderGradientBackground;
