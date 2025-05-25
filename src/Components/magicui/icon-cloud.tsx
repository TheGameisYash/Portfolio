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
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510"; // Background for context

  // We will try to force the original icon.hex color.
  const colorToForce = icon.hex; 
  const minContrastToAttemptForce = 1.0; // Be as permissive as possible for the library's check

  console.log(
    `Attempting to force render icon (slug: ${icon.slug}) with its original hex: ${colorToForce}. Theme: ${theme}`
  );

  return renderSimpleIcon({
    icon: {
      ...icon, // Pass other icon properties like path, title, slug
      hex: colorToForce, // Tell renderSimpleIcon to primarily use this original hex
    },
    bgHex: bgHex,        // Background color for context
    fallbackHex: colorToForce, // IF the library's contrast check *still* fails, tell it to fall back to the SAME original hex
    minContrastRatio: minContrastToAttemptForce,
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
    fetchSimpleIcons({ slugs: iconSlugs })
      .then(apiData => {
        if (!apiData || !apiData.simpleIcons || Object.keys(apiData.simpleIcons).length === 0) {
          console.error("[IconCloud] No valid icons data received from fetchSimpleIcons for slugs:", iconSlugs);
        }
        setData(apiData);
      })
      .catch(error => {
        console.error("[IconCloud] Error fetching simple icons for slugs:", iconSlugs, error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    if (!data.simpleIcons || Object.keys(data.simpleIcons).length === 0) return null;
    
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light")
    );
  }, [data, theme]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px", width: "100%" }}>
        Loading Icons...
      </div>
    );
  }

  if (!renderedIcons || renderedIcons.length === 0) {
    return (
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        No icons to display for the given slugs.
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
