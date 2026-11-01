"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  CurrencyItem,
  CURRENCIES,
  DEFAULT_CURRENCY,
  formatCurrencyPrice,
  findCurrencyByCountryCode,
  findCurrencyByCode,
} from "@/data/currencies";

interface CurrencyContextType {
  selectedCurrency: CurrencyItem;
  setCurrency: (currency: CurrencyItem, isManual?: boolean) => void;
  formatPrice: (inrPrice: number) => string;
  isCurrencyModalOpen: boolean;
  openCurrencyModal: () => void;
  closeCurrencyModal: () => void;
  isAutoDetected: boolean;
  detectedCountry: string | null;
  redetectLocation: () => Promise<void>;
  allCurrencies: CurrencyItem[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Timezone to ISO 2-letter Country code mapping
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  // India
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  // US & Canada
  "America/New_York": "US",
  "America/Detroit": "US",
  "America/Kentucky/Louisville": "US",
  "America/Chicago": "US",
  "America/Indiana/Indianapolis": "US",
  "America/Denver": "US",
  "America/Phoenix": "US",
  "America/Los_Angeles": "US",
  "America/Anchorage": "US",
  "Pacific/Honolulu": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Montreal": "CA",
  "America/Edmonton": "CA",
  "America/Winnipeg": "CA",
  "America/Halifax": "CA",
  // UK
  "Europe/London": "GB",
  // Europe (Eurozone)
  "Europe/Berlin": "DE",
  "Europe/Paris": "FR",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Vienna": "AT",
  "Europe/Dublin": "IE",
  "Europe/Lisbon": "PT",
  "Europe/Athens": "GR",
  "Europe/Helsinki": "FI",
  // Europe (Non-Euro)
  "Europe/Zurich": "CH",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Budapest": "HU",
  "Europe/Bucharest": "RO",
  "Europe/Istanbul": "TR",
  // Asia Pacific
  "Asia/Tokyo": "JP",
  "Asia/Singapore": "SG",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  "Australia/Adelaide": "AU",
  "Pacific/Auckland": "NZ",
  "Asia/Hong_Kong": "HK",
  "Asia/Seoul": "KR",
  "Asia/Shanghai": "CN",
  "Asia/Taipei": "TW",
  "Asia/Bangkok": "TH",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Jakarta": "ID",
  "Asia/Manila": "PH",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Karachi": "PK",
  "Asia/Dhaka": "BD",
  "Asia/Colombo": "LK",
  // Middle East
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Qatar": "QA",
  "Asia/Kuwait": "KW",
  "Asia/Bahrain": "BH",
  "Asia/Muscat": "OM",
  "Asia/Jerusalem": "IL",
  // Latin America
  "America/Sao_Paulo": "BR",
  "America/Mexico_City": "MX",
  "America/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "America/Bogota": "CO",
  "America/Lima": "PE",
  // Africa
  "Africa/Johannesburg": "ZA",
  "Africa/Lagos": "NG",
  "Africa/Cairo": "EG",
  "Africa/Nairobi": "KE",
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyItem>(DEFAULT_CURRENCY);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  // Set currency with optional manual flag
  const setCurrency = useCallback((currency: CurrencyItem, isManual = true) => {
    setSelectedCurrency(currency);
    setIsAutoDetected(!isManual);
    try {
      if (isManual) {
        localStorage.setItem("moraine_currency_manual", "true");
        localStorage.setItem("moraine_currency_id", currency.id);
      } else {
        localStorage.setItem("moraine_currency_id", currency.id);
      }
    } catch {
      // ignore
    }
  }, []);

  // Format price helper
  const formatPrice = useCallback(
    (inrPrice: number) => {
      return formatCurrencyPrice(inrPrice, selectedCurrency);
    },
    [selectedCurrency]
  );

  // Auto-detection logic
  const detectCountryAndCurrency = useCallback(async (): Promise<CurrencyItem | null> => {
    let countryCode: string | null = null;

    // 1. Check browser timezone
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone && TIMEZONE_TO_COUNTRY[timeZone]) {
        countryCode = TIMEZONE_TO_COUNTRY[timeZone];
      } else if (timeZone) {
        if (timeZone.startsWith("America/")) countryCode = "US";
        else if (timeZone.startsWith("Europe/")) countryCode = "DE";
        else if (timeZone.startsWith("Australia/")) countryCode = "AU";
      }
    } catch {
      // ignore
    }

    // 2. Fallback to navigator.language if timezone didn't give a match
    if (!countryCode && typeof navigator !== "undefined" && navigator.language) {
      const parts = navigator.language.split("-");
      if (parts.length > 1) {
        countryCode = parts[1].toUpperCase();
      }
    }

    // Attempt to match timezone/locale country code immediately
    let matchedCurrency = countryCode ? findCurrencyByCountryCode(countryCode) : null;

    // 3. In parallel, fetch from lightweight IP lookup for high precision
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch("https://freeipapi.com/api/json", {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.countryCode) {
          const ipCurrency = findCurrencyByCountryCode(data.countryCode);
          if (ipCurrency) {
            matchedCurrency = ipCurrency;
            countryCode = data.countryCode;
          }
        }
      }
    } catch {
      // If IP lookup fails or times out, fallback to timezone/locale match
    }

    if (matchedCurrency) {
      setDetectedCountry(matchedCurrency.country);
      return matchedCurrency;
    }

    return null;
  }, []);

  // Initialize currency on client mount
  useEffect(() => {
    const initialize = async () => {
      try {
        const isManual = localStorage.getItem("moraine_currency_manual") === "true";
        const savedId = localStorage.getItem("moraine_currency_id");

        if (isManual && savedId) {
          const found = CURRENCIES.find((c) => c.id === savedId);
          if (found) {
            setSelectedCurrency(found);
            setIsAutoDetected(false);
            return;
          }
        }

        // Run auto-detection
        const detected = await detectCountryAndCurrency();
        if (detected) {
          setSelectedCurrency(detected);
          setIsAutoDetected(true);
          localStorage.setItem("moraine_currency_id", detected.id);
        }
      } catch {
        // ignore
      }
    };

    initialize();
  }, [detectCountryAndCurrency]);

  const redetectLocation = useCallback(async () => {
    try {
      localStorage.removeItem("moraine_currency_manual");
    } catch {
      // ignore
    }
    const detected = await detectCountryAndCurrency();
    if (detected) {
      setSelectedCurrency(detected);
      setIsAutoDetected(true);
    }
  }, [detectCountryAndCurrency]);

  const openCurrencyModal = useCallback(() => setIsCurrencyModalOpen(true), []);
  const closeCurrencyModal = useCallback(() => setIsCurrencyModalOpen(false), []);

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setCurrency,
        formatPrice,
        isCurrencyModalOpen,
        openCurrencyModal,
        closeCurrencyModal,
        isAutoDetected,
        detectedCountry,
        redetectLocation,
        allCurrencies: CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
