"use client";

import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { EventSearch } from './event-search';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      setIsSearching(true);
      try {
        const params = new URLSearchParams(searchParams);
        if (query) {
          params.set('query', query);
        } else {
          params.delete('query');
        }
        router.push(`/calendar?${params.toString()}`);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [searchParams]
  );

  const handleFilter = useCallback((filters: any) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(','));
      } else if (value && typeof value === 'object') {
        if (value.start) params.set(`${key}Start`, value.start.toISOString());
        if (value.end) params.set(`${key}End`, value.end.toISOString());
      } else if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    router.push(`/calendar?${params.toString()}`);
  }, [searchParams]);

  return (
    <EventSearch
      onSearch={handleSearch}
      onFilter={handleFilter}
      isLoading={isSearching}
    />
  );
}; 