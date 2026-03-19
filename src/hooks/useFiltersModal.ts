import { useEffect, useReducer } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FILTER_KEYS,
  FILTERS_DEFAULTS,
  PRICE_BOUNDS,
} from '@/lib/constants';
import { filtersReducer } from '@/reducers/filtersReducer';
import { getInitialFilters, mapFiltersToParams } from '@/utils/filters';

export function useFiltersModal(isOpen: boolean, onClose: () => void) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, dispatch] = useReducer(
    filtersReducer,
    FILTERS_DEFAULTS,
    (def) => getInitialFilters(new URLSearchParams(searchParams.toString()), def),
  );

  // --- Derived percentages for the price range slider ---
  const getPercentage = (price: number) => {
    const pct =
      ((price - PRICE_BOUNDS.MIN) / (PRICE_BOUNDS.MAX - PRICE_BOUNDS.MIN)) * 100;
    return Math.max(0, Math.min(100, pct));
  };

  const minPct = getPercentage(state.minPrice);
  const maxPct = getPercentage(state.maxPrice);
  const rangePct = maxPct - minPct;

  // Synchronize React with external system (prevent background scrolling when modal is open)
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // --- Handlers ---
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    const filters = mapFiltersToParams(state);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    // Reset to page 1 on new filter apply
    params.delete('page');

    router.push(`/properties?${params.toString()}`, { scroll: false });
    onClose();
  };

  const handleClearFilters = () => {
    dispatch({ type: 'RESET' });
    const params = new URLSearchParams(searchParams.toString());

    FILTER_KEYS.forEach((key) => params.delete(key));

    router.push(`/properties?${params.toString()}`, { scroll: false });
  };

  return {
    state,
    dispatch,
    minPct,
    maxPct,
    rangePct,
    handleApplyFilters,
    handleClearFilters,
  };
}
