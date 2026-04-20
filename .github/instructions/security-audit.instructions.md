---
name: "security-audit"
description: "Use when scanning for vulnerabilities, validating API keys, auditing CORS policies, checking dependencies, or preparing for production deployment. Performs comprehensive security checks."
applyTo: "**/*"
---

# Security Audit Instructions

## Categorías de Seguridad

### 1️⃣ API Keys & Secrets
```yaml
CRÍTICO: Los secrets NUNCA deben estar en:
  ✗ Archivos HTML/JS expostos
  ✗ Git commits (history)
  ✗ Logs o console output
  ✗ Comments o documentación
  ✗ Client-side code

✓ CORRECTO:
  ✓ Archivo .env local (nunca commitear)
  ✓ Environment variables en deploy
  ✓ Secret management tools (Vault)
  ✓ Server-side only (backend)

Secrets a validar:
- CLOUDINARY_API_SECRET
- JULES_API_KEY
- QWEN_API_KEY
- GITHUB_TOKEN
- Database credentials
- Third-party API keys
```

### 2️⃣ CORS & Same-Origin Policy
```yaml
Validaciones:
- ✓ Specify exact origins (never use "*" for sensitive)
- ✓ Whitelist trusted domains only
- ✓ Use HTTPS only
- ✓ Validate preflight requests
- ✓ Set secure credentials handling

Current config validation:
- Cloudinary: ✓ Public API (whitelist own domains)
- Jules.ia: 🔴 CHECK - configured for HTTPS + auth
- Qwen Code: ✓ GitHub API (token-based)
```

### 3️⃣ Dependency Vulnerabilities
```bash
# Scan para vulnerabilities conocidas
npm audit

# Check outdated packages
npm outdated

# Generate CVE report
npm run security:audit:dependencies
```

### 4️⃣ Code Security Issues
```javascript
// Scan para common patterns:
✗ eval()
✗ innerHTML= (use textContent)
✗ window.location manipulation
✗ setTimeout/setInterval with strings
✗ SQL injection in queries
✗ XSS vulnerabilities
✗ CSRF tokens missing
✗ Unvalidated input
```

### 5️⃣ HTTPS & Certificate
```yaml
Requirements:
- ✓ All traffic HTTPS only
- ✓ Valid SSL/TLS certificate
- ✓ HSTS header configured
- ✓ Certificate not expired
- ✓ Certificate chain valid
```

## Security Checklist por Etapa

### Pre-Production
- [ ] No secrets in git history
- [ ] All API keys in .env (not tracked)
- [ ] npm audit: 0 vulnerabilities
- [ ] CORS policy validated
- [ ] HTTPS configured
- [ ] Security headers set
- [ ] Input validation on all forms
- [ ] Authentication/Authorization working

### Deploy
- [ ] Environment secrets injected
- [ ] HTTPS forced
- [ ] CSP headers configured
- [ ] Security monitoring active
- [ ] Incident response plan ready
- [ ] Backup/restore tested

### Production
- [ ] Continuous vulnerability scanning
- [ ] WAF rules enabled
- [ ] Rate limiting configured
- [ ] Logs monitored
- [ ] Alerts configured
- [ ] Incident response tested

## Security Headers

```yaml
Configurar estos headers:
  Strict-Transport-Security: "max-age=31536000; includeSubDomains"
  Content-Security-Policy: "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src * data:"
  X-Content-Type-Options: "nosniff"
  X-Frame-Options: "SAMEORIGIN"
  X-XSS-Protection: "1; mode=block"
  Referrer-Policy: "strict-origin-when-cross-origin"
```

## OWASP Top 10 Validations

### 1. Injection Attacks
```
✗ SQL injection
✗ Command injection
✗ Template injection

Fix: Use parameterized queries, escaped inputs
```

### 2. Broken Authentication
```
✗ Weak password policies
✗ Session management flaws
✗ Credential exposure

Fix: strong password hashing, secure sessions
```

### 3. Sensitive Data Exposure
```
✗ Unencrypted data in transit
✗ Exposed API keys
✗ Hardcoded credentials

Fix: HTTPS, encryption, secrets management
```

### 4. XML External Entities (XXE)
```
✗ Unsafe XML parsing

Fix: Disable external entities in parsers
```

### 5. Broken Access Control
```
✗ Missing authorization checks
✗ Privilege escalation
✗ Horizontal/vertical escalation

Fix: Validate permissions on every action
```

### 6. Security Misconfiguration
```
✗ Default credentials
✗ Misconfigured security headers
✗ Debug mode enabled

Fix: Harden config, remove debug features
```

### 7. Cross-Site Scripting (XSS)
```
✗ Unescaped user input in HTML
✗ Dangerous use of innerHTML
✗ Missing CSP headers

Fix: Escape output, use textContent, set CSP
```

### 8. Insecure Deserialization
```
✗ Unsafe JSON parsing
✗ Type juggling exploits

Fix: Validate and validate input types
```

### 9. Components with Known Vulnerabilities
```
✗ Outdated dependencies
✗ Unpatched packages

Fix: npm audit, regular updates
```

### 10. Insufficient Logging & Monitoring
```
✗ No security logs
✗ No incident detection
✗ No alerting

Fix: Log security events, set up monitoring
```

## Scanning Tools

```bash
# NPM Audit
npm audit                    # Find vulnerabilities
npm audit fix               # Auto-fix if possible

# OWASP Dependency Check
npm run security:owasp      # Generate OWASP report

# Code scanning
npm run security:scan       # Custom security scanner

# Secret scanning
npm run security:secrets    # Detect exposed secrets

# Generate report
npm run security:report     # Full security report
```

## Cloudinary Security

```yaml
Security configuration:
  resource_type: "auto"
  type: "upload"
  folder: "shield-sheep"
  access_control:
    - access_type: "token"
      start: $(date +%s)
      end: $(date +%s + 3600)  # 1 hour expiry
  quality: "auto:best"
  fetch_format: "auto"
  flags: ["secure_url"]
```

## Output Format

```markdown
# Security Audit Report

## 🔐 Overall Security Score: 8.5/10

## 🔴 Critical Issues (1)

### Exposed API Key: CLOUDINARY_API_SECRET
**Location**: admin.html:45
**Severity**: CRITICAL
**Type**: Secret Exposure
**Fix**: Move to .env, never expose in code
**Evidence**: 
\`\`\`
var secret = "cld_1234567890ABCDEF";
\`\`\`

## 🟠 High Priority Issues (2)

### Missing HTTPS Enforcement
**Location**: Global configuration
**Issue**: HTTP traffic allowed
**Fix**: Enforce HTTPS redirects, set HSTS header
**Impact**: Credentials can be intercepted

### Missing CSP Header
**Location**: All pages
**Issue**: No Content-Security-Policy header
**Fix**: Add CSP header to index.html
**Impact**: XSS vulnerability

## 🟡 Medium Issues (3)

[... continued ...]

## ✅ Passing Checks
- ✓ Dependencies: 0 vulnerabilities (npm audit)
- ✓ CORS: Properly configured
- ✓ Input validation: Present
- ✓ Authentication: Implemented

## 📋 Recommendations

1. **IMMEDIATE** (Before deploy):
   - Remove hardcoded secrets
   - Add security headers
   - Enable HTTPS

2. **SHORT TERM** (This week):
   - Implement CSP policy
   - Add rate limiting
   - Setup monitoring

3. **ONGOING**:
   - Daily vulnerability scans
   - Monthly penetration testing
   - Security training

## 🎯 Security Deployment Checklist
- [ ] No secrets in code
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] Security headers set
- [ ] npm audit: 0 critical
- [ ] Monitoring active
- [ ] Incident response ready
```

## Integración con CI/CD

```yaml
# .github/workflows/security.yml
name: Security Audit
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run security audit
        run: npm run security:audit
      - name: Report results
        if: always()
        run: npm run security:report
```

## Comando Ejecución

```bash
# Audit completo
npm run security:audit

# Por categoría
npm run security:secrets
npm run security:dependencies
npm run security:headers
npm run security:cors
npm run security:code

# Generar reporte
npm run security:report

# Continuous monitoring
npm run security:watch
```
