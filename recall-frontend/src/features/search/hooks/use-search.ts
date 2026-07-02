import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { track } from "@/lib/analytics/analytics";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { searchItems } from "@/lib/search";
import { searchSavedItems } from "@/services/search.service";
import type { SavedItem } from "@/types/saved-item";

import { allSearchItems } from "../mock/all-items";

const SEARCH_DEBOUNCE_MS = 140;
const RESULT_DEBOUNCE_MS = 160;

// Search state + logic. Mock (flag off): synchronous util over the local corpus.
// Backend (flag on): debounced RPC. `recentSearches` is future-ready.
export function useSearch() {
  const [searchQuery, setSearchQueryState] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [backendResults, setBackendResults] = useState<SavedItem[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const setSearchQuery = useCallback((value: string) => {
    setSearchQueryState(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (value.trim().length === 0) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    timeoutRef.current = setTimeout(() => setIsSearching(false), SEARCH_DEBOUNCE_MS);
  }, []);

  const mockResults = useMemo<SavedItem[]>(
    () => (USE_BACKEND ? [] : searchItems(searchQuery, allSearchItems)),
    [searchQuery]
  );

  // Backend search — all setState lives inside the timer callback (not the effect
  // body) so it derives off the query without fighting the render.
  useEffect(() => {
    if (!USE_BACKEND) {
      return;
    }
    let active = true;
    const query = searchQuery.trim();
    const timer = setTimeout(() => {
      if (query.length === 0) {
        if (active) {
          setBackendResults([]);
        }
        return;
      }
      void searchSavedItems(searchQuery)
        .then((rows) => {
          if (active) {
            setBackendResults(rows);
            track("search_used", { queryLength: query.length, resultCount: rows.length });
          }
        })
        .catch((error: unknown) => console.warn("[search] failed", error));
    }, RESULT_DEBOUNCE_MS);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const searchResults = USE_BACKEND ? backendResults : mockResults;

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasResults: searchResults.length > 0,
    hasQuery: searchQuery.trim().length > 0,
    recentSearches: [] as string[]
  };
}
