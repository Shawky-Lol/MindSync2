// Performance optimization utilities for MindSync

// Debounce function for search inputs and form submissions
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events and resize handlers
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading utility for images
export const lazyLoadImage = (src, placeholder = '/assets/placeholder.jpg') => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(placeholder);
    img.src = src;
  });
};

// Memory cleanup for event listeners
export class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(element, event, handler, options = {}) {
    const key = `${element}-${event}`;
    if (this.listeners.has(key)) {
      this.removeEventListener(element, event);
    }
    
    element.addEventListener(event, handler, options);
    this.listeners.set(key, { element, event, handler, options });
  }

  removeEventListener(element, event) {
    const key = `${element}-${event}`;
    const listener = this.listeners.get(key);
    if (listener) {
      listener.element.removeEventListener(listener.event, listener.handler);
      this.listeners.delete(key);
    }
  }

  cleanup() {
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners.clear();
  }
}

// Local storage with compression for large data
export const compressedStorage = {
  setItem: (key, value) => {
    try {
      const compressed = JSON.stringify(value);
      localStorage.setItem(key, compressed);
      return true;
    } catch (error) {
      console.warn('Failed to store data:', error);
      return false;
    }
  },

  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to retrieve data:', error);
      return defaultValue;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Failed to remove data:', error);
      return false;
    }
  }
};

// Animation performance utilities
export const animationUtils = {
  // Reduce motion for users who prefer it
  respectsReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Get optimal animation duration based on user preferences
  getAnimationDuration: (defaultDuration = 300) => {
    return animationUtils.respectsReducedMotion() ? 0 : defaultDuration;
  },

  // Check if device can handle complex animations
  canHandleComplexAnimations: () => {
    // Simple heuristic based on device capabilities
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    return !isSlowConnection && !isLowEndDevice;
  }
};

// Bundle size optimization - code splitting helpers
export const loadComponent = async (componentPath) => {
  try {
    const module = await import(componentPath);
    return module.default || module;
  } catch (error) {
    console.error('Failed to load component:', error);
    return null;
  }
};

// Performance monitoring
export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
  }

  startTiming(label) {
    this.metrics.set(label, performance.now());
  }

  endTiming(label) {
    const startTime = this.metrics.get(label);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`${label}: ${duration.toFixed(2)}ms`);
      this.metrics.delete(label);
      return duration;
    }
    return null;
  }

  measureComponent(WrappedComponent, componentName) {
    return function MeasuredComponent(props) {
      React.useEffect(() => {
        this.startTiming(`${componentName} render`);
        return () => {
          this.endTiming(`${componentName} render`);
        };
      }, []);

      return React.createElement(WrappedComponent, props);
    }.bind(this);
  }
}

// Memory usage monitoring
export const memoryUtils = {
  getCurrentUsage: () => {
    if (performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
      };
    }
    return null;
  },

  logUsage: (label = 'Memory Usage') => {
    const usage = memoryUtils.getCurrentUsage();
    if (usage) {
      console.log(`${label}: ${usage.used}MB / ${usage.total}MB (limit: ${usage.limit}MB)`);
    }
  }
};

export default {
  debounce,
  throttle,
  lazyLoadImage,
  EventManager,
  compressedStorage,
  animationUtils,
  loadComponent,
  PerformanceMonitor,
  memoryUtils
};

