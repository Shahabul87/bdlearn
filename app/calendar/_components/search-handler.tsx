"use client";

import { useState, useCallback } from 'react';
import { EventSearch } from './event-search';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((searchTerm: string) => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set('query', searchTerm);
      } else {
        params.delete('query');
      }
      router.push(`/calendar?${params.toString()}`);
    } finally {
      setIsSearching(false);
    }
  }, [router, searchParams]);

  const handleFilter = useCallback((filters: any) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(','));
      } else if (value && typeof value === 'object' && 'start' in value && 'end' in value) {
        if (value.start instanceof Date) params.set(`${key}Start`, value.start.toISOString());
        if (value.end instanceof Date) params.set(`${key}End`, value.end.toISOString());
      } else if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    router.push(`/calendar?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <EventSearch
      onSearch={handleSearch}
      onFilter={handleFilter}
      isLoading={isSearching}
    />
  );
}; 