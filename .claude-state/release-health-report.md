# Release Health Report

- Checked at: 2026-07-16T08:31:08.816Z
- Base URL: http://localhost:4175
- Status: pass
- Version: 1.0.0
- Commit: 1e0903027210
- Deployment: unknown
- Analytics lifetime views: 0
- Analytics signups: 0

## Checks
- PASS — Build info route responds: GET /api/build-info returned 200
- PASS — Homepage release headers respond: HEAD / returned 200
- PASS — Release version header present: 1.0.0
- PASS — Release commit header present: 1e0903027210
- PASS — Release deployment header present: Deployment header not expected outside Railway
- PASS — Release headers match build info: api=1e0903027210 / n/a · headers=1e0903027210 / missing
- PASS — Build info includes JavaScript entry assets: js=5
- PASS — Build info includes CSS entry assets: css=1
- PASS — Build info reports manuscript PDF present: recordPdf=true
- PASS — Build info reports institute field manual PDF present: instituteFieldManualPdf=true
- PASS — Build info exposes institute field manual PDF URL: instituteFieldManualPdfUrl=/veritas-institute-field-manual.pdf
- PASS — Public bundle excludes deprecated admin auth assets: js=assets/index-C3ExZca7.js, assets/rolldown-runtime-QTnfLwEv.js, assets/vendor-react-CyYHJXCk.js, assets/hubspot-BhVuqbwi.js, assets/analytics-D_b_jtBZ.js
- PASS — Analytics snapshot responds: GET /api/analytics/snapshot returned 200
- PASS — Machine-readable llms surface responds: HEAD /llms.txt returned 200
- PASS — Institute markdown surface responds: HEAD /veritas-institute.md returned 200
