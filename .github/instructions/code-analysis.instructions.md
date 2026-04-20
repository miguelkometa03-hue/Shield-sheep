---
name: "code-analysis"
description: "Use when auditing code quality, detecting code smells, finding duplications, assessing complexity, or preparing code for review. Generates detailed metrics and improvement recommendations."
applyTo: "**/*.{js,html,css}"
---

# Code Analysis Instructions

## Cuando Usar Este Agente

✅ **Usa cuando**:
- PR pre-merge review
- Refactorización planning
- Code smell detection
- Complexity assessment
- Dead code identification

❌ **No uses cuando**:
- Cambios pequeños del tipo typo
- Actualizaciones de config files
- Changes en docs-only

## Métricas a Evaluar

### 1. Complejidad
```javascript
// Cyclomatic Complexity
- Función simple: 1
- Con 1 if/else: 2-3
- Target: < 10 per función
- Rojo: > 15

// Líneas de código per función
- Target: < 50 LOC
- Rojo: > 200 LOC
```

### 2. Duplicación
```
- Código duplicado: % del total
- Target: < 5%
- Rojo: > 10%
- Acciones: Extract function, utils module
```

### 3. Dependencias
```javascript
// Análisis de importaciones
- Circular dependencies: ❌ NO PERMITIDO
- Unused imports: ⚠ MIN
- Deep imports: Refactor a barrel exports
- External deps: Minimizar, documentar razón
```

### 4. Patrones
```
✓ Single Responsibility (función hace UNA cosa)
✓ DRY (Don't Repeat Yourself)
✓ Consistent naming conventions
✓ Error handling
✗ Global state
✗ Magic numbers
✗ Deep nesting (> 3 levels)
```

## Análisis Detallado por Archivo

### JavaScript/TypeScript
```javascript
Checks:
- Const/let scope correctness
- Function complexity (cyclomatic)
- Unused variables
- Unreachable code
- typeof checks correctness
- Array/Object mutation issues
- Callback depth (promise chains)
```

### HTML
```html
Checks:
- Semantic HTML5 usage
- Accessibility attributes (alt, aria-label)
- Heading hierarchy (h1→h6)
- Form labels correctness
- Duplicate IDs
- Unused classes
- Inline styles (should use CSS)
```

### CSS
```css
Checks:
- Unused classes/selectors
- Specificity issues
- Z-index management
- Color consistency (use tokens)
- Responsive design patterns
- Animation performance
- Unused vendor prefixes
```

## Severidad de Issues

| Nivel | Ejemplos | Acción |
|-------|----------|--------|
| 🔴 CRÍTICO | Errores lógicos, seguridad, breaking changes | Fix antes de merge |
| 🟠 ALTO | Complejidad > 15, duplicación > 15%, anti-patterns | Fix en esta PR |
| 🟡 MEDIO | Code smell, naming issues, testability | Considerar en refactor |
| 🟢 BAJO | Style suggestions, minor optimizations | Nice-to-have |

## Output Format

```markdown
# Code Analysis Report

## 📊 Metrics Summary
- Cyclomatic Complexity (Avg): 5.2 ✓
- Duplicated Code: 3.1% ✓
- Unused Variables: 2
- Deep Nesting (> 3): 1

## 🔴 Critical Issues (0)

## 🟠 High Priority Issues (2)

### Issue #1: High Complexity in admin.html
**Location**: admin.html:145
**Type**: Conditional complexity
**Complexity**: 18 (target: < 10)
**Fix**: Extract to helper functions

### Issue #2: Circular Dependency
**Location**: product.html → index.html
**Type**: Module structure
**Impact**: Hard to test
**Fix**: Extract shared code to utils/

## 🟡 Medium Issues (4)

[... continued ...]

## ✅ Quality Gate: PASSED ✅
Ready for merge with recommendations.
```

## Recomendaciones Automáticas

```bash
# Que el agent genere:
npm run code:fix-eslint
npm run code:extract-duplicates
npm run code:refactor-complexity
npm run code:update-imports
```

## Checklist para Approve

- [ ] Complejidad promedio < 8
- [ ] Duplicación < 5%
- [ ] Imports circulares: 0
- [ ] Unused variables: 0
- [ ] Errores lógicos: 0
