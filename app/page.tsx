"use client";

import { useEffect, useState } from "react";
import { Landing } from "../components/Landing";
import { Registry } from "../components/Registry";

const STORAGE_KEY = "freeboard-view";

export default function HomePage() {
  const [view, setView] = useState<"landing" | "registry">("landing");

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("view");
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (fromQuery === "registry" || stored === "registry") {
      setView("registry");
    }
  }, []);

  const openRegistry = () => {
    setView("registry");
    sessionStorage.setItem(STORAGE_KEY, "registry");
  };

  const goLanding = () => {
    setView("landing");
    sessionStorage.setItem(STORAGE_KEY, "landing");
  };

  return view === "landing" ? <Landing onOpenRegistry={openRegistry} /> : <Registry onGoLanding={goLanding} />;
}
