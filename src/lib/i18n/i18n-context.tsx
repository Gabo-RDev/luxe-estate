'use client';

import React, { createContext, useContext } from 'react';
import type { Locale, Dictionary } from '@/types/I18n';

import { I18nContextType } from '@/interfaces/I18nContextType.interface';

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
