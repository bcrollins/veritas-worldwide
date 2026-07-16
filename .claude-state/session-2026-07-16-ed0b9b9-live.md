# Ocean tip ed0b9b9 live 15/15 — JWT HS256 pin

## Product
- `jwt.sign(..., { algorithm: 'HS256' })`
- `jwt.verify(..., { algorithms: ['HS256'] })`
- Pure-locked; full auth smoke (register/login/refresh/logout) green live

## Live matrix
- commit `ed0b9b92b23b`
- 12 baseline security headers + dual security.txt + RateLimit
- rateLimit×23 · a11y 69/521 · node v22.14.0
- scorecard **122**
