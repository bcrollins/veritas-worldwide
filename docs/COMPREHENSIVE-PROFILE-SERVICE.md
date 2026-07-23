# Comprehensive Online Profile — Operator Runbook

**Entity:** Veritas Worldwide  
**Public surface:** https://veritasworldwide.com/comprehensive-profile  
**Price:** $499 USD one-time  
**Contact:** rights@veritasworldwide.com  

## What clients buy

A private, authenticated open-source investigation report on a single subject. Device and account identifiers are included **only** when independently verifiable and lawfully obtainable. Every report includes a methodology appendix.

## Checkout

1. Client completes intake + lawful-purpose attestations on `/comprehensive-profile`.
2. `POST /api/services/comprehensive-profile/checkout` appends order to `data/osint-orders.ndjson`.
3. If `STRIPE_SECRET_KEY` is set, server creates a Stripe Checkout Session ($499) and returns `checkoutUrl`.
4. Else if `COMPREHENSIVE_PROFILE_CHECKOUT_URL` is set, that Payment Link is returned.
5. Else API returns **202** with orderId; email the client a payment link within one business day.

## Delivery SLA

5–10 business days after cleared payment and complete disambiguation.

## Hard exclusions

No hacking, no sealed records, no harassment facilitation. Refuse and refund if purpose fails review.

## Anonymity

Public copy is entity-only. Never put operator personal identity in client reports, emails, or git commit messages for this product.

## Verification

```bash
npm run verify:comprehensive-profile
```

## Abuse controls

- Rate limit: 8 requests/minute per client key on `/api/services/comprehensive-profile/*`.
- Keyword refuse-list blocks clear harassment/stalking/hacking language at intake (400).
- Lawful-purpose attestations required client-side and server-side.
- Health: `orderIntakeCount` is a non-PII counter only.
