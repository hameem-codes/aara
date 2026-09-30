import { useEffect, useRef, useState } from "react";

/** Campus coordinates — tweak these if the pin needs to move. */
const CAMPUS = { lat: 12.9447, lng: 77.7152 };

const POPUP_HTML = `
  <b style="font-family:'Playfair Display',Georgia,serif;font-size:15px;color:#2a1020;">Aarra Springs</b><br/>
  <span style="font-size:12px;color:#5a545d;">NH 648, Chikka Tirupathi, Bengaluru</span>
`;

const LIBERTY_STYLE = "https://tiles.openfreemap.org/styles/liberty";

/** Raster OSM fallback if the vector style can't be fetched (blocked network etc). */
const FALLBACK_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      maxzoom: 19,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster" as const, source: "osm" }],
};

/**
 * Interactive campus map on MapLibre GL (free, no API key). Tries the
 * OpenFreeMap vector style; falls back to raster OSM tiles if that's
 * unreachable; shows a branded contact card if the map can't init at all
 * (e.g. WebGL unavailable).
 */
export function CampusMap({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let map: import("maplibre-gl").Map | undefined;
    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setStatus((s) => (s === "ready" ? s : "failed"));
    }, 12000);

    (async () => {
      try {
        const maplibregl = await import("maplibre-gl");
        await import("maplibre-gl/dist/maplibre-gl.css");
        if (cancelled) return;

        // Decide the style up front: if OpenFreeMap is unreachable, use raster OSM.
        let style: string | typeof FALLBACK_STYLE = LIBERTY_STYLE;
        try {
          const res = await fetch(LIBERTY_STYLE, { method: "HEAD", mode: "cors" });
          if (!res.ok) style = FALLBACK_STYLE;
        } catch {
          style = FALLBACK_STYLE;
        }
        if (cancelled) return;

        map = new maplibregl.Map({
          container: el,
          style,
          center: [CAMPUS.lng, CAMPUS.lat],
          zoom: 15,
          scrollZoom: false, // don't hijack page scroll
          attributionControl: false,
        });
        map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

        map.on("error", (e) => {
          // Style-level failures (fetch blocked, WebGL context lost) → fallback card.
          if (!map?.loaded()) console.warn("Map error:", e?.error ?? e);
        });

        // Custom coral leaf marker (brand pin instead of the default).
        const pin = document.createElement("div");
        pin.className = "campus-pin-dot";
        pin.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fdfbf7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;

        new maplibregl.Marker({ element: pin, anchor: "center" })
          .setLngLat([CAMPUS.lng, CAMPUS.lat])
          .setPopup(new maplibregl.Popup({ closeButton: false, offset: 26 }).setHTML(POPUP_HTML))
          .addTo(map!);

        map.on("load", () => {
          if (cancelled) return;
          window.clearTimeout(timeout);
          setStatus("ready");
          new maplibregl.Popup({ closeButton: false, offset: 26 })
            .setLngLat([CAMPUS.lng, CAMPUS.lat])
            .setHTML(POPUP_HTML)
            .addTo(map!);
        });
      } catch (error) {
        console.warn("Campus map failed to initialise:", error);
        if (!cancelled) setStatus("failed");
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      map?.remove();
    };
  }, []);

  if (status === "failed") {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 rounded-[24px] bg-plum p-8 text-center text-white ${className ?? ""}`}>
        <span className="flex h-12 w-12 -rotate-6 items-center justify-center rounded-[14px] bg-coral text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        <div>
          <b className="font-display text-2xl">Aarra Springs</b>
          <p className="mt-1 max-w-[260px] text-sm leading-6 text-white/70">
            NH 648, Chikka Tirupathi, Near Whitefield, Bengaluru 563160
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Aarra+Springs+Chikka+Tirupathi+Karnataka+563160"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-lime px-5 py-3 text-xs font-bold text-plum transition hover:bg-lime-dark"
          >
            Open in Google Maps ↗
          </a>
          <a
            href="tel:+917411206633"
            className="rounded-full border border-white/25 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
          >
            Call for directions
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`campus-map-wrap ${className ?? ""}`}>
      <div ref={containerRef} className="campus-map h-full w-full" aria-label="Map to Aarra Springs" role="application" />
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f3ede2]">
          <span className="text-xs font-semibold uppercase tracking-[.14em] text-plum/50">
            Loading map…
          </span>
        </div>
      )}
      <a
        href="https://www.google.com/maps/search/?api=1&query=Aarra+Springs+Chikka+Tirupathi+Karnataka+563160"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full bg-plum px-4 py-2.5 text-xs font-bold text-lime shadow-lg transition hover:bg-plum-light"
      >
        Get directions ↗
      </a>
    </div>
  );
}
