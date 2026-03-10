
export function getSafeImage(
  value: any,
  fallback = "/cover-placeholder.jpg"
) {
  if (!value || typeof value !== "string") return fallback;

  const v = value.trim();

  if (!v || v === "null" || v === "undefined") {
    return fallback;
  }

  // DB external image
  if (v.startsWith("http://") || v.startsWith("https://")) {
    return v;
  }

  // Public folder image
  if (v.startsWith("/")) {
    return v;
  }

  // Relative → fix it
  return `/${v}`;
}

