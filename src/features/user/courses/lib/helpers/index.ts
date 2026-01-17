const getYoutubeId = (url: string): string | null => {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }

    const parts = u.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");

    if (embedIdx >= 0 && parts[embedIdx + 1]) {
      return parts[embedIdx + 1];
    }

    const shortsIdx = parts.indexOf("shorts");

    if (shortsIdx >= 0 && parts[shortsIdx + 1]) {
      return parts[shortsIdx + 1];
    }

    return null;
  } catch {
    return null;
  }
};

export const getYoutubeEmbedUrl = (url: string): string | null => {
  const id = getYoutubeId(url);

  if (!id) return null;

  return `https://www.youtube.com/embed/${id}?autoplay=1`;
};
