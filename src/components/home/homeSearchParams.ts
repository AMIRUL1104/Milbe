interface SearchRouter {
  push(href: string, options?: { scroll?: boolean }): void;
}

let queuedBaseHref: string | undefined;
let queuedHref: string | undefined;

/**
 * Merge near-simultaneous search and location updates against the latest URL
 * target, even while a previous App Router navigation is still in flight.
 */
export function updateHomeSearchParams(
  router: SearchRouter,
  updates: Record<string, string | undefined>,
): void {
  const currentUrl = new URL(window.location.href);
  const currentHref = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
  let nextUrl = currentUrl;

  if (queuedHref && queuedBaseHref) {
    const queuedUrl = new URL(queuedHref);
    const sameRoute =
      queuedUrl.origin === currentUrl.origin &&
      queuedUrl.pathname === currentUrl.pathname;
    const navigationIsCurrent =
      currentUrl.href === queuedHref || currentUrl.href === queuedBaseHref;

    if (sameRoute && navigationIsCurrent) {
      nextUrl = currentUrl.href === queuedHref ? currentUrl : queuedUrl;
    }
  }

  const baseHref = currentUrl.href;
  for (const [key, value] of Object.entries(updates)) {
    if (value) {
      nextUrl.searchParams.set(key, value);
    } else {
      nextUrl.searchParams.delete(key);
    }
  }
  nextUrl.searchParams.set("page", "1");

  const targetHref = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
  if (targetHref === currentHref) {
    queuedBaseHref = undefined;
    queuedHref = undefined;
    return;
  }

  queuedBaseHref = baseHref;
  queuedHref = nextUrl.href;
  router.push(targetHref, { scroll: false });
}
