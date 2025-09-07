import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { BtnClickEvent } from "@/types/types";

interface UseCustomSelectProps {
  countryCode: string;
  moveKeyToTop: any[];
  enableSearch: boolean;
  handleChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const useCustomSelect = ({
  countryCode,
  moveKeyToTop,
  enableSearch,
  handleChangeSelect,
}: UseCustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filtered countries based on search query
  const filteredCountries = useMemo(() => {
    if (!moveKeyToTop) return [];
    if (!enableSearch || !searchQuery) return moveKeyToTop;

    return moveKeyToTop?.filter(
      (option) =>
        option?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        option?.dial_code?.includes(searchQuery)
    );
  }, [moveKeyToTop, searchQuery, enableSearch]);

  // Optimized scroll to selected country
  const scrollToSelected = useCallback(
    (immediate = false) => {
      if (!listRef.current) return;

      const selectedButton = listRef.current.querySelector(
        `button[value="${countryCode}"]`
      ) as HTMLButtonElement;

      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: immediate ? "instant" : "smooth",
          block: "nearest",
        });
      }
    },
    [countryCode]
  );

  // Focus management
  const manageFocus = useCallback(() => {
    if (!isOpen) return;

    if (enableSearch && searchInputRef.current) {
      // Focus search input immediately when opening
      searchInputRef.current.focus();
    } else {
      // Focus selected option for keyboard navigation
      const selectedButton = listRef.current?.querySelector(
        `button[value="${countryCode}"]`
      ) as HTMLButtonElement;

      if (selectedButton) {
        selectedButton.focus();
      }
    }
  }, [isOpen, enableSearch, countryCode]);

  // Handle dropdown toggle - instant
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => {
      const newIsOpen = !prev;
      
      if (newIsOpen) {
        // Pre-position scroll immediately
        scrollToSelected(true);
        
        // Focus management immediately
        manageFocus();
      } else {
        // Clear search and reset focus when closing
        setSearchQuery("");
        setFocusedIndex(-1);
      }
      
      return newIsOpen;
    });
  }, [scrollToSelected, manageFocus]);

  // Handle option click - optimized for immediate response
  const handleOptionClick = useCallback(
    (e: BtnClickEvent) => {
      const target = e.currentTarget;
      const value = target.value;
      const dialCode = target.getAttribute("data-dial-code") ?? "";

      // Close dropdown immediately for instant feedback
      setIsOpen(false);
      setSearchQuery("");
      setFocusedIndex(-1);

      // Create fake event for compatibility
      const fakeEvent = {
        target: {
          value: value,
          selectedOptions: [
            {
              getAttribute: (attr: string) =>
                attr === "data-dial-code" ? dialCode : null,
            },
          ],
        },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;

      // Handle selection after UI feedback
      handleChangeSelect(fakeEvent);
    },
    [handleChangeSelect]
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setFocusedIndex(-1); // Reset focused index when searching
    },
    []
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev < filteredCountries.length - 1 ? prev + 1 : 0;
            // Scroll the focused item into view
            setTimeout(() => {
              const focusedElement = listRef.current?.querySelector(
                `button:nth-of-type(${next + 1})`
              );
              if (focusedElement) {
                focusedElement.scrollIntoView({ block: 'nearest' });
              }
            }, 0);
            return next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev > 0 ? prev - 1 : filteredCountries.length - 1;
            // Scroll the focused item into view
            setTimeout(() => {
              const focusedElement = listRef.current?.querySelector(
                `button:nth-of-type(${next + 1})`
              );
              if (focusedElement) {
                focusedElement.scrollIntoView({ block: 'nearest' });
              }
            }, 0);
            return next;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && filteredCountries[focusedIndex]) {
            const country = filteredCountries[focusedIndex];
            
            // Close dropdown immediately for instant feedback
            setIsOpen(false);
            setSearchQuery("");
            setFocusedIndex(-1);
            
            const fakeEvent = {
              target: {
                value: country.value,
                selectedOptions: [
                  {
                    getAttribute: (attr: string) =>
                      attr === "data-dial-code" ? country.dial_code : null,
                  },
                ],
              },
            } as unknown as React.ChangeEvent<HTMLSelectElement>;
            
            handleChangeSelect(fakeEvent);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSearchQuery("");
          setFocusedIndex(-1);
          break;
      }
    },
    [isOpen, filteredCountries, focusedIndex, handleChangeSelect]
  );

  // Handle click outside cleanup
  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
    setFocusedIndex(-1);
  }, []);

  // Smooth scroll to selected when country changes (background prep)
  useEffect(() => {
    if (!isOpen) {
      scrollToSelected(true);
    }
  }, [countryCode, isOpen, scrollToSelected]);

  // Scroll to selected when opening dropdown - instant
  useEffect(() => {
    if (isOpen) {
      // Immediate scroll, no delay
      scrollToSelected(false);
    }
  }, [isOpen, scrollToSelected]);

  return {
    // State
    isOpen,
    searchQuery,
    filteredCountries,
    focusedIndex,

    // Refs
    listRef,
    searchInputRef,

    // Handlers
    toggleDropdown,
    handleOptionClick,
    handleSearchChange,
    handleClickOutside,
    handleKeyDown,
  };
};
