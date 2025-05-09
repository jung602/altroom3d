export interface SceneConfig {
  id: string;
  title: string;
  location: string;
  thumbnail: string;
  description: string;
  model: {
    component: string;
    scale: number;
    position: [number, number, number];
    rotation: [number, number, number];
  };
  labels: {
    title: string;
    content: string;
    position: [number, number, number];
  }[];
  reflector: {
    enabled: boolean;
    items: {
      position: [number, number, number];
      rotation: [number, number, number];
      args: [number, number] | number[];
      color?: string;
      overlayOpacity?: number;
      overlayOffset?: [number, number, number];
      resolution?: number;
      radius?: number;
      clipBias?: number;
    }[];
  };
} 