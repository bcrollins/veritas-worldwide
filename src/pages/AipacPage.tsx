import { useEffect } from 'react'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import AipacDiagram from '../components/AipacDiagram'

export default function AipacPage() {
  useEffect(() => {
    setMetaTags({
      title: `AIPAC Congressional Influence Map | ${SITE_NAME}`,
      description:
        'Interactive diagram of AIPAC lobbying expenditures across the U.S. Congress and Executive Branch. FEC-sourced contribution data, voting records, and registered lobbyists.',
      url: `${SITE_URL}/#aipac`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'AIPAC Congressional Influence Map',
      description:
        'FEC-sourced data on AIPAC PAC contributions, independent expenditures, and bundled donations to members of Congress.',
      url: `${SITE_URL}/#aipac`,
      creator: { '@type': 'Organization', name: SITE_NAME },
      license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    })
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  return <AipacDiagram />
}
