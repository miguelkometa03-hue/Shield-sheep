---
name: "shield-sheep-ai-agents"
description: "AI Agent orchestration system for Shield-Sheep project. Use when automating code analysis, UI/UX reviews, performance optimization, or Cloudinary media management. Supports Jules.ia and Qwen Code integration."
version: "1.0.0"
lastUpdated: "2026-04-20"
---

# Shield-Sheep: Sistema de Agentes IA

**Instrucciones maestras para orquestar agentes autónomos en el proyecto Shield-Sheep**

## 🎯 Propósito Global

Automatizar análisis, mejoras y mantenimiento del proyecto mediante:
- ✅ Agentes especializados por función
- ✅ Integración con Jules.ia + Qwen Code
- ✅ Automatización con GitHub Actions
- ✅ Gestión profesional de medios (Cloudinary)
- ✅ Mejora continua y escalabilidad

---

## 🤖 Agentes del Sistema

### 1️⃣ **UI-UX-Pro-Max Agent**
**Rol**: Revisor de diseño y experiencia de usuario  
**Especialidad**: Interfaz, animaciones, accesibilidad, Cloudinary

#### Responsabilidades:
```yaml
trigger_phrases:
  - "review my design"
  - "optimize UI/UX"
  - "check accessibility"
  - "validate Cloudinary integration"
  - "improve animations"

capabilities:
  - Valida contra AGENTS.md (50+ estilos, 161 paletas, 57 tipografías)
  - Revisa accesibilidad WCAG AA/AAA
  - Optimiza animaciones (150-300ms, easing, reduced-motion)
  - Valida Cloudinary URLs y transformaciones
  - Genera reportes de mejora
  - Recomienda responsive breakpoints

constraints:
  - No modificar archivos sin aprobación
  - Generar PRs en rama "feature/ui-improvements"
  - Máximo 5 recomendaciones por review

when_to_call:
  - Nuevas páginas creadas
  - Cambios visuales significativos
  - Pre-deploy validation
  - Feedback de usuarios sobre UI
```

#### Workflow:
```
1. Escanea HTML/CSS
2. Valida contra guías de diseño
3. Crea reporte de issues
4. Propone mejoras específicas
5. (Opcional) Genera PR con cambios
6. Solicita approval antes de merge
```

#### Ejemplo de Uso:
```
/ui-review index.html
// Agent:
// 1. Checking design consistency...
// 2. Validating accessibility...
// 3. Found 8 improvement opportunities
// 4. Generating detailed report...
```

---

### 2️⃣ **Code-Analyzer Agent**
**Rol**: Auditor de calidad de código  
**Especialidad**: Análisis estático, refactorización, rendimiento

#### Responsabilidades:
```yaml
trigger_phrases:
  - "analyze my code"
  - "code quality check"
  - "audit performance"
  - "refactor this component"
  - "find dead code"

capabilities:
  - Análisis de complejidad (cyclomatic, cognitive)
  - Detección de código duplicado
  - Identificación de dead code
  - Sugerencias de refactorización
  - Análisis de dependencias
  - Validación de patrones

constraints:
  - No cambiar lógica existente sin tests
  - Generar reportes en JSON + Markdown
  - Priorizar by impact/effort

when_to_call:
  - PRs antes de merge
  - Code review automático
  - Refactorización planificada
  - Pre-production audit
```

#### Workflow:
```
1. Parsear todos los archivos JS/HTML
2. Calcular métricas de complejidad
3. Detectar patrones anti-patrón
4. Generar reporte de issues
5. Asignar severidad (critical/high/medium/low)
6. Proponer soluciones
```

---

### 3️⃣ **Performance-Optimizer Agent**
**Rol**: Optimizador de rendimiento  
**Especialidad**: Velocidad, carga, recursos

#### Responsabilidades:
```yaml
trigger_phrases:
  - "optimize performance"
  - "improve page speed"
  - "reduce bundle size"
  - "optimize images"
  - "improve load time"

capabilities:
  - Análisis Lighthouse
  - Optimización de imágenes (WebP, AVIF)
  - Lazy loading recommendations
  - Cache strategies
  - Critical path optimization
  - Core Web Vitals analysis

constraints:
  - Validar cambios con antes/después metrics
  - Generar reportes de impacto
  - Priorizar optimizaciones high-impact

when_to_call:
  - Baseline metrics
  - Después de cambios significativos
  - Pre-deploy validation
  - Investigación de lentitud
```

#### Métricas Objetivo:
```yaml
targets:
  lcp: "< 2.5s"          # Largest Contentful Paint
  fid: "< 100ms"         # First Input Delay
  cls: "< 0.1"           # Cumulative Layout Shift
  fcp: "< 1.8s"          # First Contentful Paint
  ttfb: "< 600ms"        # Time to First Byte
```

---

### 4️⃣ **Media-Manager Agent** (Cloudinary)
**Rol**: Gestor de multimedia  
**Especialidad**: Optimización, transformaciones, CDN

#### Responsabilidades:
```yaml
trigger_phrases:
  - "optimize media"
  - "setup Cloudinary"
  - "generate responsive images"
  - "create video templates"
  - "compress media"

capabilities:
  - Optimización de imágenes (auto-quality, format)
  - Generación de srcset responsivo
  - Templates de transformación
  - URLs dinámicas con parámetros
  - Compresión de video
  - Lazy loading setup
  - Analytics de uso

constraints:
  - Validar API key antes de operaciones
  - Crear backups de URLs originales
  - Documentar todas las transformaciones

cloudinary_transformations:
  images:
    optimization:
      quality: "auto:best"
      fetch_format: "auto"
    responsive:
      responsive_width: true
      sizes: "[576, 768, 1024, 1280, 1920]"
  videos:
    quality: "auto:best"
    codec: "h264"
    bitrate: "auto"
    responsive_video: true
```

---

### 5️⃣ **Test-Generator Agent**
**Rol**: Generador automático de tests  
**Especialidad**: Unit, E2E, accesibilidad

#### Responsabilidades:
```yaml
trigger_phrases:
  - "generate tests"
  - "create test suite"
  - "add a11y tests"
  - "generate e2e tests"
  - "improve coverage"

capabilities:
  - Generación de tests unitarios (Jest)
  - Generación de tests E2E (Playwright)
  - Tests de accesibilidad (axe)
  - Pruebas visuales (Percy/Chromatic)
  - Análisis de cobertura
  - Generación de fixtures

constraints:
  - Mantener target de cobertura en 85%+
  - Tests deben pasar antes de merge
  - Documentar casos de prueba complejos

test_framework:
  unit: "Jest"
  e2e: "Playwright"
  a11y: "axe-core"
  visual: "Chromatic"
```

---

### 6️⃣ **Documentation-Generator Agent**
**Rol**: Generador automático de documentación  
**Especialidad**: JSDoc, README, API docs

#### Responsabilidades:
```yaml
trigger_phrases:
  - "generate documentation"
  - "create API docs"
  - "generate JSDoc"
  - "create README"
  - "document component"

capabilities:
  - Generación de JSDoc comments
  - Creación de README por módulo
  - Generación de API documentation
  - Diagramas de arquitectura
  - Guías de contribución
  - Ejemplos de uso

output_formats:
  - Markdown (.md)
  - JSON (schema)
  - HTML (storybook)
```

---

### 7️⃣ **Security-Auditor Agent**
**Rol**: Auditor de seguridad  
**Especialidad**: Vulnerabilidades, API keys, CORS

#### Responsabilidades:
```yaml
trigger_phrases:
  - "security audit"
  - "check vulnerabilities"
  - "validate API keys"
  - "audit CORS policy"
  - "check dependencies"

capabilities:
  - Escaneo de vulnerabilidades (CVE)
  - Validación de API keys (.env)
  - Revisión CORS policies
  - Análisis de dependencias
  - Detección de secrets expuestos
  - Reporte de conformidad

security_checks:
  - API keys no expuestas
  - HTTPS enforced
  - CORS properly configured
  - Input validation
  - SQL injection prevention
  - XSS prevention
  - CSRF tokens
```

---

## 🔌 Integración con Jules.ia + Qwen Code

### Configuración Jules.ia

```bash
# En .env
JULES_API_KEY=sk-xxxxx
JULES_MODEL=jules-large
JULES_ENDPOINT=https://api.jules.ia/v1

# En npm scripts
"agents:jules": "connect-agent --provider jules --config .agents.json"
```

### Configuración Qwen Code

```bash
# En .env
QWEN_API_KEY=sk-xxxxx
QWEN_MODEL=qwen-coder-latest
QWEN_REPOSITORY=miguelkometa03-hue/Shield-sheep

# En npm scripts
"agents:qwen": "connect-agent --provider qwen --repo . --config .agents.json"
```

### Comandos Principales

```bash
# Ejecutar fase 1 (Análisis)
npm run agents:phase1

# Ejecutar todos los agentes
npm run agents:all

# Ejecutar agente específico
npm run agents:ui-review
npm run agents:code-analysis
npm run agents:performance-check
npm run agents:security-audit

# Ver status de agentes
npm run agents:status

# Logs en tiempo real
npm run agents:logs
```

---

## 🎬 Workflow de Ejecución

### 1. Análisis Inicial (Fase 1)
```
User: "Analiza mi proyecto"
         ↓
[UI-UX-Pro-Max] → Genera reporte de diseño
[Code-Analyzer] → Genera reporte de código
[Performance-Optimizer] → Genera reporte de rendimiento
[Security-Auditor] → Genera reporte de seguridad
         ↓
Consolidar en dashboard
         ↓
Output: ANÁLISIS.md + JSON metrics
```

### 2. Desarrollo Incrementado (Fase 2)
```
User: "Mejora el código"
         ↓
[Code-Analyzer] → Detecta oportunidades
[Code-Generator] → Propone refactorización
[Test-Generator] → Crea tests
[Documentation-Generator] → Genera docs
         ↓
Crear rama feature/auto-improvements
         ↓
Abrir PR para review
         ↓
Output: PR listo para merge
```

### 3. Validación Pre-Deploy (Fase 4)
```
User: Deploy a producción
         ↓
[Performance-Optimizer] → Lighthouse audit
[Security-Auditor] → Scan de vulnerabilidades
[Test-Generator] → Run full test suite
[UI-UX-Pro-Max] → Visual regression tests
         ↓
¿Todos los checks pasan?
   ✅ SÍ → Proceeder con deploy
   ❌ NO → Generar reporte de issues
         ↓
Output: Deploy report + Audit trail
```

---

## 📋 Reglas Agenticas

### Para todos los agentes:

1. **Transparencia**: Explicar cada paso en lenguaje natural
2. **Seguridad**: Nunca modificar archivos sin confirmación
3. **Documentación**: Generar reportes de cada ejecución
4. **Validación**: Verificar cambios antes de aplicar
5. **Rollback**: Mantener historia de cambios para revertir
6. **Escalabilidad**: Usar arquitectura modular
7. **Performance**: Optimizar tiempo de ejecución
8. **Accesibilidad**: Seguir WCAG AA mínimo
9. **Responsive**: Mobile-first, todos los breakpoints
10. **Testing**: Coverage mínima 85%

### Prioridades:
1. **CRÍTICO**: Seguridad, breaking changes
2. **ALTO**: Performance, a11y, breaking bugs
3. **MEDIO**: Code quality, UX improvements
4. **BAJO**: Minor optimizations, docs

---

## 📊 Monitoreo Agentico

### Métricas Clave por Agente:

| Agente | Métrica | Target | Frecuencia |
|--------|---------|--------|-----------|
| UI-UX | Accessibility Score | 95+ | Daily |
| Code | Complexity Avg | < 10 | Per PR |
| Performance | Lighthouse | 90+ | Daily |
| Security | Vulnerabilities | 0 | Continuous |
| Tests | Coverage | 85%+ | Per PR |
| Docs | Completeness | 100% | Per Release |

### Dashboard Agentico:
```
🤖 AGENT STATUS DASHBOARD

┌─────────────────────────────────────┐
│ UI-UX-Pro-Max        [████████░░] 80% │
│ Code-Analyzer        [██████░░░░] 60% │
│ Performance-Opt      [███████░░░] 70% │
│ Media-Manager        [█████░░░░░] 50% │
│ Test-Generator       [██████████] 100% │
│ Documentation        [████░░░░░░] 40% │
│ Security-Auditor     [██████░░░░] 60% │
├─────────────────────────────────────┤
│ Last Run: 2026-04-20 15:32 UTC      │
│ Next Run: 2026-04-20 16:00 UTC      │
│ Success Rate: 92.3%                 │
└─────────────────────────────────────┘
```

---

## 🚀 Quick Start para Agentes

```bash
# 1. Validar configuración
npm run agents:validate

# 2. Ejecutar Fase 1 (Análisis)
npm run agents:phase1

# 3. Ver reportes generados
ls -la reports/

# 4. Revisar recomendaciones
cat reports/ANALISIS.md

# 5. Aprobar y ejecutar mejoras
npm run agents:apply-recommendations

# 6. Crear PR automático
npm run agents:create-pr
```

---

## 🔐 Variables de Entorno Requeridas

```env
# Jules.ia Integration
JULES_API_KEY=sk-xxxxx
JULES_MODEL=jules-large
JULES_ENDPOINT=https://api.jules.ia/v1

# Qwen Code Integration
QWEN_API_KEY=sk-xxxxx
QWEN_MODEL=qwen-coder-latest
QWEN_REPOSITORY=miguelkometa03-hue/Shield-sheep

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx

# GitHub Actions
GITHUB_TOKEN=ghp_xxxxx

# Security
SECURITY_EMAIL=admin@shield-sheep.io
```

---

**Versión**: 1.0.0  
**Última actualización**: 2026-04-20  
**Mantenedor**: AI Agents System
