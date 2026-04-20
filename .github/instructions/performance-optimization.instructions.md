---
name: "performance-optimization"
description: "Use when analyzing performance metrics, improving page load times, optimizing images, reducing bundle size, or validating Core Web Vitals. Provides actionable optimization recommendations."
applyTo: "**/*.{html,js,css}"
---

# Performance Optimization Instructions

## Métricas Core Web Vitals

### LCP (Largest Contentful Paint)
```
Target: < 2.5s
- GREEN: 0-2.5s
- YELLOW: 2.5-4s
- RED: > 4s

Improvement:
- Optimize hero image (first)
- Preload critical resources
- Reduce server response time
- Minimize render-blocking JS
```

### FID (First Input Delay) / INP (Interaction to Next Paint)
```
Target FID: < 100ms
Target INP: < 200ms

Improvement:
- Break up long tasks (>50ms)
- Defer non-critical JS
- Use requestIdleCallback
- Optimize event handlers
```

### CLS (Cumulative Layout Shift)
```
Target: < 0.1
- GREEN: 0-0.1
- YELLOW: 0.1-0.25
- RED: > 0.25

Common causes:
- Missing image dimensions
- Ads/embeds without reserved space
- Fonts causing FOIT
- Dynamic content insertion

Fix:
- Add width/height to images
- Reserve space for dynamic content
- Use font-display: swap
- Optimize font loading
```

## Análisis por Componente

### Imágenes
```
✓ Use responsive images (srcset/sizes)
✓ Lazy load below-fold images
✓ Use modern formats (WebP, AVIF)
✓ Optimize with Cloudinary
✓ Compress: target 60%+ reduction
✓ Add width/height attributes
✗ Don't use img tags in CSS
✗ Avoid oversized images
✗ Don't load all variants at once
```

### JavaScript
```
✓ Split code by route
✓ Minify production code
✓ Remove unused dependencies
✓ Use tree shakeable imports
✓ Async/defer scripts when possible
✗ Avoid synchronous scripts in head
✗ Don't block initial paint
✗ Minimize main thread work
```

### CSS
```
✓ Extract critical CSS
✓ Minify and compress
✓ Remove unused CSS
✓ Use CSS Grid/Flexbox (no floats)
✓ Avoid deep selectors
✗ Don't inline large CSS
✗ Avoid @import
✗ Limit CSS file count
```

## Lighthouse Audit

```
Performance Scoring:
- 90+: Green (Excellent)
- 50-89: Yellow (Needs work)
- < 50: Red (Poor)

Targets:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+
```

## Cloudinary Performance

```javascript
// Optimization URL pattern
https://res.cloudinary.com/{cloud_name}/image/upload/
  f_auto,              // Auto format (WebP/AVIF)
  q_auto:best,         // Auto quality
  w_auto,              // Responsive width
  c_limit,             // Don't upscale
  dpr_auto,            // Device pixel ratio
  /v1682123456/        // Version cache
  {public_id}
```

## Performance Checklist

### Images (30% del perf)
- [ ] All images via Cloudinary with f_auto
- [ ] Responsive srcset generated
- [ ] Lazy loading implemented
- [ ] Width/height attributes set
- [ ] Compression 60%+ vs original
- [ ] Video thumbnails optimized

### JavaScript (40% del perf)
- [ ] Code split by route
- [ ] Minified in production
- [ ] No unused dependencies
- [ ] Tree-shaking enabled
- [ ] Long tasks broken up
- [ ] Debounced expensive operations

### CSS (20% del perf)
- [ ] Critical CSS extracted
- [ ] Unused CSS removed
- [ ] Minified in production
- [ ] Font loading optimized
- [ ] No deep selectors (> 4 levels)
- [ ] Animations use transform/opacity

### Caching (10% del perf)
- [ ] Browser cache headers set
- [ ] Service worker configured
- [ ] CDN cache optimized
- [ ] Versioned assets
- [ ] Long-lived cache for static

## Output Report

```markdown
# Performance Analysis Report

## 📊 Core Web Vitals
- LCP: 1.8s ✓ (Target: < 2.5s)
- FID: 45ms ✓ (Target: < 100ms)
- CLS: 0.08 ✓ (Target: < 0.1)

## 🎯 Lighthouse Score
- Performance: 92 ✓
- Accessibility: 96 ✓
- Best Practices: 88
- SEO: 98 ✓

## 🔴 Issues Found

### Issue #1: LCP Opportunity
- Current: 2.3s
- Issue: Hero image not optimized
- Fix: Add f_auto,q_auto:best to Cloudinary URL
- Impact: -0.5s (22% improvement)

### Issue #2: Unused CSS
- Current: 45KB unused
- Location: admin.html styles
- Fix: Remove unused classes
- Impact: -12KB bundle

## 🟡 Opportunities

### Lazy Load Below-Fold Images
- Estimated impact: -200ms FCP
- Implementation: Add loading="lazy"
- Priority: MEDIUM

### Minify JavaScript
- Current size: 125KB
- After minify: 68KB
- Impact: -45% size reduction
- Priority: HIGH

## 📈 Estimated Improvements
- Load time: 2.1s → 1.6s (-24%)
- First paint: 0.8s → 0.6s (-25%)
- Total blocking time: 120ms → 45ms (-62%)

## ✅ Recommendation
Apply all HIGH priority optimizations before deploy.
```

## Comando Ejecución

```bash
# Audit completo
npm run performance:audit

# Por componente
npm run performance:audit:images
npm run performance:audit:js
npm run performance:audit:css

# Generar reporte
npm run performance:report

# Watch mode
npm run performance:watch
```
