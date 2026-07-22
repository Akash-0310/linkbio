import { useEffect } from 'react';

const SITE_NAME = 'LinkBio';

/**
 * Set the document <title> for the lifetime of a component and restore the
 * previous title on unmount.
 *
 * Pass the page-specific part only — the site name is appended automatically,
 * so useDocumentTitle('About') yields "About · LinkBio". Pass a falsy value to
 * fall back to the bare site name.
 *
 * Without this, every route kept the static title from index.html, which hurt
 * tab clarity, browser history, and link/social sharing.
 */
export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
