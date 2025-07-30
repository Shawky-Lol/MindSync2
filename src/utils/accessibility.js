// Accessibility utilities for MindSync

// Focus management utilities
export const focusUtils = {
  // Trap focus within a container (for modals, dropdowns)
  trapFocus: (container) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  // Restore focus to previously focused element
  createFocusManager: () => {
    let previouslyFocused = null;

    return {
      save: () => {
        previouslyFocused = document.activeElement;
      },
      restore: () => {
        if (previouslyFocused && previouslyFocused.focus) {
          previouslyFocused.focus();
        }
      }
    };
  },

  // Check if element is focusable
  isFocusable: (element) => {
    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    return focusableSelectors.some(selector => element.matches(selector));
  }
};

// Screen reader utilities
export const screenReaderUtils = {
  // Announce messages to screen readers
  announce: (message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  // Create visually hidden text for screen readers
  createSROnlyText: (text) => {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  },

  // Update aria-label dynamically
  updateAriaLabel: (element, newLabel) => {
    element.setAttribute('aria-label', newLabel);
  }
};

// Keyboard navigation utilities
export const keyboardUtils = {
  // Common keyboard event handlers
  handleEnterSpace: (callback) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback(e);
    }
  },

  handleEscape: (callback) => (e) => {
    if (e.key === 'Escape') {
      callback(e);
    }
  },

  handleArrowKeys: (callbacks) => (e) => {
    const { onUp, onDown, onLeft, onRight } = callbacks;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        onUp?.(e);
        break;
      case 'ArrowDown':
        e.preventDefault();
        onDown?.(e);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onLeft?.(e);
        break;
      case 'ArrowRight':
        e.preventDefault();
        onRight?.(e);
        break;
    }
  },

  // Create roving tabindex for lists
  createRovingTabindex: (container, itemSelector) => {
    const items = container.querySelectorAll(itemSelector);
    let currentIndex = 0;

    const updateTabindex = () => {
      items.forEach((item, index) => {
        item.setAttribute('tabindex', index === currentIndex ? '0' : '-1');
      });
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          currentIndex = (currentIndex + 1) % items.length;
          updateTabindex();
          items[currentIndex].focus();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          currentIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
          updateTabindex();
          items[currentIndex].focus();
          break;
        case 'Home':
          e.preventDefault();
          currentIndex = 0;
          updateTabindex();
          items[currentIndex].focus();
          break;
        case 'End':
          e.preventDefault();
          currentIndex = items.length - 1;
          updateTabindex();
          items[currentIndex].focus();
          break;
      }
    };

    updateTabindex();
    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }
};

// Color contrast utilities
export const contrastUtils = {
  // Calculate relative luminance
  getLuminance: (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Calculate contrast ratio between two colors
  getContrastRatio: (color1, color2) => {
    const l1 = contrastUtils.getLuminance(...color1);
    const l2 = contrastUtils.getLuminance(...color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Check if contrast meets WCAG guidelines
  meetsWCAG: (color1, color2, level = 'AA', size = 'normal') => {
    const ratio = contrastUtils.getContrastRatio(color1, color2);
    const requirements = {
      'AA': { normal: 4.5, large: 3 },
      'AAA': { normal: 7, large: 4.5 }
    };
    return ratio >= requirements[level][size];
  }
};

// Motion and animation accessibility
export const motionUtils = {
  // Check user's motion preferences
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Create motion-safe animation options
  getAnimationProps: (normalProps, reducedProps = {}) => {
    return motionUtils.prefersReducedMotion() ? reducedProps : normalProps;
  },

  // Pause animations if user prefers reduced motion
  respectMotionPreference: (animationFunction) => {
    if (!motionUtils.prefersReducedMotion()) {
      animationFunction();
    }
  }
};

// Form accessibility utilities
export const formUtils = {
  // Associate labels with form controls
  associateLabel: (input, label) => {
    const id = input.id || `input-${Date.now()}`;
    input.id = id;
    label.setAttribute('for', id);
  },

  // Add error messages with proper ARIA attributes
  addErrorMessage: (input, message) => {
    const errorId = `${input.id}-error`;
    let errorElement = document.getElementById(errorId);
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = errorId;
      errorElement.className = 'error-message';
      errorElement.setAttribute('role', 'alert');
      input.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.setAttribute('aria-describedby', errorId);
    input.setAttribute('aria-invalid', 'true');
  },

  // Remove error messages
  removeErrorMessage: (input) => {
    const errorId = `${input.id}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
      errorElement.remove();
    }
    
    input.removeAttribute('aria-describedby');
    input.removeAttribute('aria-invalid');
  }
};

// High contrast mode detection
export const highContrastUtils = {
  // Detect if high contrast mode is enabled
  isHighContrastMode: () => {
    // Create a test element to detect high contrast mode
    const testElement = document.createElement('div');
    testElement.style.border = '1px solid';
    testElement.style.borderColor = 'red green';
    document.body.appendChild(testElement);
    
    const computedStyle = window.getComputedStyle(testElement);
    const isHighContrast = computedStyle.borderTopColor === computedStyle.borderRightColor;
    
    document.body.removeChild(testElement);
    return isHighContrast;
  },

  // Apply high contrast styles
  applyHighContrastStyles: () => {
    if (highContrastUtils.isHighContrastMode()) {
      document.body.classList.add('high-contrast');
    }
  }
};

// Export all utilities
export default {
  focusUtils,
  screenReaderUtils,
  keyboardUtils,
  contrastUtils,
  motionUtils,
  formUtils,
  highContrastUtils
};

