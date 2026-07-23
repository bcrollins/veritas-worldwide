import { useEffect } from 'react'
import {
  setMetaTags,
  clearMetaTags,
  setJsonLd,
  removeJsonLd,
  breadcrumbJsonLd,
  SITE_URL,
  SITE_NAME,
} from '../lib/seo'
import AipacDiagram from '../components/AipacDiagram'

/** Canonical surface for the AIPAC research hub (topic route is indexable). */
const AIPAC_TOPIC_URL = `${SITE_URL}/topics/aipac`

export default function AipacPage() {
  useEffect(() => {
    // Prefer the topic hub canonical — hash-only URLs are not indexable SERP targets.
    setMetaTags({
      title: `AIPAC Congressional Influence Map | ${SITE_NAME}`,
      description:
        'Interactive diagram of AIPAC lobbying expenditures across Congress and the Executive Branch. FEC-sourced contributions, voting records, and registered lobbyists.',
      url: AIPAC_TOPIC_URL,
      imageAlt: 'AIPAC Congressional Influence Map — Veritas Worldwide',
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'AIPAC Congressional Influence Map',
        description:
          'FEC-sourced data on AIPAC PAC contributions, independent expenditures, and bundled donations to members of Congress.',
        url: AIPAC_TOPIC_URL,
        creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        license: 'https://creativecommons.org/licenses/by-nc/4.0/',
        isAccessibleForFree: true,
      },
      breadcrumbJsonLd([
        { name: 'The Record', url: SITE_URL },
        { name: 'Research Topics', url: `${SITE_URL}/topics` },
        { name: 'AIPAC & The Israel Lobby', url: AIPAC_TOPIC_URL },
      ]),
    ])
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  return <AipacDiagram />
}
