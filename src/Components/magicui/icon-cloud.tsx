"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.07,
    minSpeed: 0.05,
    // dragControl: false,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const lightThemeFallback = "#6e6e73"; // Your defined fallback for light theme
  const darkThemeFallback = "#ffffff";  // Your defined fallback for dark theme
  const currentFallbackHex = theme === "light" ? lightThemeFallback : darkThemeFallback;
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  let hexToUse = icon.hex; // Start with the original hex color from the icon data

  // If the theme is light AND the original icon color is black,
  // override hexToUse with the light theme's fallback color.
  // This ensures black icons get your desired fallback color in light mode.
  if (theme === "light" && (icon.hex === "#000" || icon.hex === "#000000")) {
    hexToUse = lightThemeFallback;
    console.log(`[IconCloud] OVERRIDE: Icon slug "${icon.slug}" (original hex was black) in light theme. Using fallback color: ${hexToUse}`);
  }

  // TEMPORARY LOGGING (can be removed or commented out after debugging)
  console.log(
    `Rendering icon (slug: ${icon.slug}, title: ${icon.title}), Theme: ${theme}, Original Hex: ${icon.hex}, Hex to Use for renderSimpleIcon: ${hexToUse}, Fallback if contrast fails: ${currentFallbackHex}`
  );
  // console.log("Full icon object:", JSON.stringify(icon)); // Keep if further debugging is needed

  return renderSimpleIcon({
    icon: {
      ...icon, // Pass other icon properties like path, title, slug
      hex: hexToUse, // Use the (potentially overridden) hex color
    },
    bgHex,
    fallbackHex: currentFallbackHex, // Fallback if hexToUse has poor contrast (less likely after our override)
    minContrastRatio,
    size: 50,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    setIsLoading(true);
    console.log("[IconCloud] Fetching icons for slugs:", iconSlugs);
    fetchSimpleIcons({ slugs: iconSlugs })
      .then(apiData => {
        console.log("[IconCloud] Fetched icon data:", apiData ? JSON.stringify(apiData).substring(0, 500) + "..." : "null/undefined");
        if (!apiData || !apiData.simpleIcons || Object.keys(apiData.simpleIcons).length === 0) {
          console.error("[IconCloud] No valid icons data received from fetchSimpleIcons.");
        }
        setData(apiData);
      })
      .catch(error => {
        console.error("[IconCloud] Error fetching simple icons:", error);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("[IconCloud] Finished fetching, isLoading:", false);
      });
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) {
      console.log("[IconCloud] No data object to render icons.");
      return null;
    }
    if (!data.simpleIcons || Object.keys(data.simpleIcons).length === 0) {
      console.log("[IconCloud] data.simpleIcons is null or empty. Cannot render icons.");
      return null;
    }
    console.log("[IconCloud] Preparing to render icons. Current theme:", theme || "light", "Number of icons:", Object.keys(data.simpleIcons).length);
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light")
    );
  }, [data, theme]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px", width: "100%" }}>
        Loading Icons...
        {/* Or a spinner component */}
      </div>
    );
  }

  if (!renderedIcons || renderedIcons.length === 0) {
    return (
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        No icons to display.
      </div>
    );
  }

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      {/* @ts-ignore */}
      <>{renderedIcons}</>
    </Cloud>
  );
}
