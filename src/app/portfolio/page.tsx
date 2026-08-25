"use client";

import React, { useState } from "react";
import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { CommandPalette } from "@/components/search/CommandPalette";

export default function PortfolioPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <PortfolioView onOpenSearch={() => setIsSearchOpen(true)} />
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
