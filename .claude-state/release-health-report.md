# Release Health Report

- Checked at: 2026-05-24T05:23:46.238Z
- Base URL: https://veritasworldwide.com
- Status: pass
- Version: 1.0.0
- Commit: 83e2451ae18a
- Deployment: b27d1e14-8aa7-427e-9968-52bc2c3bde82
- Analytics lifetime views: 3520
- Analytics signups: 8

## Checks
- PASS — Build info route responds: GET /api/build-info returned 200
- PASS — Live commit matches expected release: expected 83e2451, observed 83e2451ae18a
- PASS — Homepage release headers respond: HEAD / returned 200
- PASS — Release version header present: 1.0.0
- PASS — Release commit header present: 83e2451ae18a
- PASS — Release deployment header present: b27d1e14-8aa7-427e-9968-52bc2c3bde82
- PASS — Release headers match build info: api=83e2451ae18a / b27d1e14-8aa7-427e-9968-52bc2c3bde82 · headers=83e2451ae18a / b27d1e14-8aa7-427e-9968-52bc2c3bde82
- PASS — Build info includes JavaScript entry assets: js=11
- PASS — Build info includes CSS entry assets: css=1
- PASS — Public bundle excludes deprecated admin auth assets: js=assets/index-BxJbQdrQ.js, assets/rolldown-runtime-Dw2cE7zH.js, assets/vendor-react-CQ9I-_Vi.js, assets/MarketingConsentField-BFTKUqXL.js, assets/analytics-c2mS4NBB.js, assets/hubspot-BdmdrxY9.js, assets/ga4-FDeMVNLC.js, assets/NewsletterSignup-DmHeVz1Z.js, assets/AuthContext-CGOIQa28.js, assets/constants-D7mKDxHq.js, assets/conversionTracking-DcBVciny.js
- PASS — Analytics snapshot responds: GET /api/analytics/snapshot returned 200
- PASS — Machine-readable llms surface responds: HEAD /llms.txt returned 200
- PASS — Institute markdown surface responds: HEAD /veritas-institute.md returned 200
