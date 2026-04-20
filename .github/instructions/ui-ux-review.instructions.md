---
name: "ui-ux-review"
description: "Use when reviewing UI/UX design, checking Cloudinary integration, validating accessibility, optimizing animations, or improving responsive design. Agent will analyze against AGENTS.md design standards."
applyTo: "*.html"
---

# UI/UX Review Instructions

## Cuando Usar Este Agente

✅ **Usa cuando**:
- Crear nuevas páginas/componentes visuales
- Revisar cambios de diseño
- Validar Cloudinary integrations
- Mejorar accesibilidad o animaciones
- Pre-deploy design validation

❌ **No uses cuando**:
- Cambios puramente lógicos de backend
- Actualizaciones de dependencias
- Refactorización sin cambio visual

## Standards de Referencia

La revisión debe validar contra:
- `AGENTS.md` (50+ estilos, 161 paletas, 57 tipografías)
- `COMANDOS-RAPIDOS.md` (quick UI patterns)
- WCAG 2.1 Level AA mínimo
- Core Web Vitals recommendations

## Proceso de Review

### 1. Análisis Inicial (2 min)
```
1. ¿Tipo de componente? (button, card, form, etc)
2. ¿Categoría? (entertainment, tool, productivity, service)
3. ¿Estado actual vs esperado?
```

### 2. Validaciones (5 min)
```
✓ Color contrast (4.5:1 normal, 3:1 large)
✓ Touch targets (44x44pt mínimo)
✓ Responsive breakpoints (mobile, tablet, desktop)
✓ Animation timing (150-300ms)
✓ Cloudinary URLs válidas
✓ Accesibilidad (labels, ARIA, keyboard nav)
✓ Dark mode compatibility
✓ Font sizes (16px+ body, 1.5-1.75 line-height)
```

### 3. Recomendaciones (3 min)
```
Máximo 5 mejoras priorizadas por impact:
  CRÍTICO  → Breaking accessibility
  ALTO     → Major UX issues
  MEDIO    → Best practice improvements
  BAJO     → Nice-to-have optimizations
```

### 4. Output
```
Markdown report con:
- Resumen ejecutivo
- Issues encontrados (con severidad)
- Recomendaciones específicas
- Código de ejemplo (si aplica)
- Links a documentación
```

## Cloudinary Checklist

- [ ] URLs usan `https://` secure
- [ ] Transformaciones documentadas
- [ ] Responsive srcset generado
- [ ] Lazy loading implementado
- [ ] Video thumbnails optimizados
- [ ] Cache headers configurados
- [ ] Quality auto-adjusted
- [ ] Format auto-negotiated

## Example Output

```markdown
# UI/UX Review: index.html ✅ APPROVED

## Resumen
Página bien diseñada con excelente accesibilidad. 
Encontradas 2 mejoras menores en animaciones.

## ✓ Checks Pasados
- Contrast ratio 5.2:1 (AA+)
- Mobile responsive ✓
- Touch targets 48px+ ✓
- Semantic HTML ✓

## ⚠ Oportunidades de Mejora

### 1. Animation Timing
**Severidad**: BAJO
**Location**: hero section fade-in
**Current**: 600ms
**Recommended**: 300ms (feels snappier)
**Action**: Change transition-duration

### 2. Cloudinary Format
**Severidad**: BAJO
**Location**: product images
**Current**: Default JPEG
**Recommended**: Auto format (WebP/AVIF)
**Action**: Add f_auto to transformation URL

## 📊 Metrics
- Accessibility Score: 95/100
- Mobile Usability: 100/100
- Dark Mode Ready: ✓
- Animation Performance: ✓
```
