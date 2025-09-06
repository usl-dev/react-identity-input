import { useState, useEffect, useMemo } from "react";

interface UseVirtualScrollingProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number; // Number of items to render outside visible area
}

export const useVirtualScrolling = <T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
}: UseVirtualScrollingProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.ceil((scrollTop + containerHeight) / itemHeight);

    // Add overscan items
    const start = Math.max(0, visibleStart - overscan);
    const end = Math.min(items.length, visibleEnd + overscan);

    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      item,
      index: visibleRange.start + index,
    }));
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
  };
};
