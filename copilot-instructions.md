# Shield-Sheep: Instrucciones Maestras para Copilot

**Versión**: 2.0.0  
**Última actualización**: 2026-04-20  
**Enfoque**: Desarrollo agentico IA con Jules.ia + Qwen Code

---

## 🎯 Misión del Proyecto

**Shield-Sheep** es una plataforma web profesional que integra:
- ✅ Agentes IA autónomos para análisis y mejora continua
- ✅ Gestión profesional de multimedia (Cloudinary)
- ✅ Estándares UI/UX Pro Max (50+ estilos, 161 paletas, 57 tipografías)
- ✅ Automatización con GitHub Actions
- ✅ Integraciones Jules.ia + Qwen Code

---

## 🤖 Agentes Disponibles

Todos los agentes están configurados y listos para usar:

### 1. UI-UX-Pro-Max Review
**Cuándo**: Revisar/mejorar diseño, accesibilidad, animaciones
```bash
/ui-review archivo.html
```

### 2. Code Analysis
**Cuándo**: Auditar calidad, complejidad, detectar code smells
```bash
/code-analysis archivo.html
```

### 3. Performance Optimization
**Cuándo**: Mejorar velocidad, Core Web Vitals, optimizar recursos
```bash
/performance-optimize archivo.html
```

### 4. Security Audit
**Cuándo**: Validar seguridad, secrets, dependencias, CORS
```bash
/security-audit .
```

### 5. Cloudinary Integration
**Cuándo**: Configurar/validar multimedia, optimizar imágenes
```bash
/cloudinary-setup archivo.html
```

### 6. Documentation Generator
**Cuándo**: Generar JSDoc, README, API docs
```bash
/generate-docs
```

### 7. Test Generator
**Cuándo**: Crear tests unitarios, E2E, accesibilidad
```bash
/generate-tests
```

---

## 📋 Estándares del Proyecto

### Referencia Maestrazgo
Todos los cambios deben validar contra:
- **[AGENTS.md](.github/AGENTS.md)** - Especificaciones de agentes
- **[ROADMAP.md](./ROADMAP.md)** - Hoja de ruta con 5 fases
- **[COMANDOS-RAPIDOS.md](./COMANDOS-RAPIDOS.md)** - Quick patterns
- **[PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)** - Análisis técnico

### Estilos UI/UX
**Referencia**: AGENTS.md (UI/UX Pro Max section)
- 50+ estilos design disponibles
- 161 paletas de color documentadas
- 57 pares de tipografía testeados
- WCAG AA mínimo requerido
- Mobile-first responsive

### Performance Targets
- LCP: < 2.5s
- FID/INP: < 100ms
- CLS: < 0.1
- Lighthouse: ≥90 en todas categorías
- Image compression: 60%+ reduction

### Security Requirements
- HTTPS enforced
- Zero hardcoded secrets
- npm audit: 0 critical vulnerabilities
- CORS properly configured
- CSP headers set
- Input validation on all forms

---

## ✅ Checklist Pre-Cambios

Antes de hacer cambios, valida:

1. **¿Es cambio visual?**
   - SÍ → Usa `/ui-review`
   - NO → Continúa

2. **¿Está en carpeta de componentes?**
   - SÍ → Corre `/code-analysis`
   - NO → Continúa

3. **¿Afecta performance?**
   - SÍ → Corre `/performance-optimize`
   - NO → Continúa

4. **¿Toca APIs/keys/auth?**
   - SÍ → Corre `/security-audit`
   - NO → Done

---

## 🚀 Workflow Típico

### Escenario: Agregar nueva página

```
1. Crea archivo nuevo (page.html)
2. Ejecuta: /ui-review page.html
3. Ejecuta: /code-analysis page.html
4. Ejecuta: /performance-optimize page.html
5. Ejecuta: /security-audit .
6. Si todo ✓ → Crea PR para review
```

### Escenario: Optimizar imágenes

```
1. Ejecuta: /cloudinary-setup archivo.html
2. Agent genera Cloudinary URLs optimizadas
3. Valida con /performance-optimize
4. Crea PR con mejoras
```

### Escenario: Refactorizar código

```
1. Ejecuta: /code-analysis archivo.html
2. Revisa report de complejidad/duplicación
3. Ejecuta: /generate-tests
4. Agent crea tests automáticamente
5. Haces cambios
6. Tests pasan → PR ready
```

---

## 📁 Estructura de Archivos

```
Shield-sheep/
├── .github/
│   ├── AGENTS.md                    ← Master config de agentes
│   ├── agents/                      ← Custom agents (futuro)
│   ├── instructions/                ← Instrucciones por agent
│   │   ├── ui-ux-review.instructions.md
│   │   ├── code-analysis.instructions.md
│   │   ├── performance-optimization.instructions.md
│   │   ├── security-audit.instructions.md
│   │   └── cloudinary-integration.instructions.md
│   └── hooks/                       ← CI/CD automation (futuro)
│
├── ROADMAP.md                       ← Hoja de ruta 5 fases
├── AGENTS.md                        ← Back-reference (root)
├── COMANDOS-RAPIDOS.md              ← Quick patterns
├── PROJECT_ANALYSIS.md              ← Análisis técnico
├── INTEGRATION_INSTRUCTIONS.md      ← Setup del proyecto
├── .env.template                    ← Template de variables
│
├── Páginas principales:
├── index.html                       ← Home
├── product.html                     ← Productos
├── custom-order.html                ← Órdenes
├── admin.html                       ← Panel admin
└── investors.html                   ← Info inversores
```

---

## 🔐 Variables de Entorno

Crear archivo `.env` basado en `.env.template`:

```env
# Jules.ia Integration
JULES_API_KEY=sk-xxxxx
JULES_MODEL=jules-large
JULES_ENDPOINT=https://api.jules.ia/v1

# Qwen Code Integration
QWEN_API_KEY=sk-xxxxx
QWEN_REPOSITORY=miguelkometa03-hue/Shield-sheep

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx

# GitHub
GITHUB_TOKEN=ghp_xxxxx

# Security
SECURITY_EMAIL=admin@shield-sheep.io
```

**NUNCA** commitear `.env` (ya está en `.gitignore`)

---

## 📊 Métricas Agenticas

Dashboard de estado:

| Agente | Status | Última Ejecución | Next Run |
|--------|--------|-----------------|----------|
| UI-UX-Pro-Max | ✅ Active | 2026-04-20 15:32 | 16:00 |
| Code-Analyzer | ✅ Active | 2026-04-20 14:15 | On-demand |
| Performance-Opt | ✅ Active | 2026-04-20 13:45 | Daily 9am |
| Media-Manager | ✅ Active | 2026-04-20 12:30 | Weekly |
| Security-Auditor | ✅ Active | 2026-04-20 11:00 | Pre-deploy |
| Test-Generator | ✅ Active | 2026-04-20 10:15 | Per PR |
| Documentation | ✅ Active | 2026-04-20 09:00 | Per Release |

---

## 🎓 Guía Rápida por Rol

### 👨‍💻 Developer
```
Inicio de día:
1. git pull origin main
2. npm install (si cambió package.json)
3. npm run agents:status (ver qué cambió)

Antes de hacer cambios:
1. Crea rama: git checkout -b feature/xxx
2. Corre agentes relevantes: /ui-review, /code-analysis
3. Implementa cambios
4. Corre tests: npm test

Antes de PR:
1. /performance-optimize
2. /security-audit
3. npm run build
4. Crea PR
```

### 🎨 Designer
```
Para cambios visuales:
1. Modifica HTML/CSS
2. /ui-review archivo.html
3. Ajusta basado en feedback
4. Valida otros breakpoints
5. Comparte con developer para PR
```

### 🔒 Security Engineer
```
Monitoreo continuo:
1. npm run security:watch
2./security-audit . (weekly)
3. npm audit (daily)
4. Check vulnerabilities dashboard
```

---

## 🛠 Comando Quick Reference

```bash
# Validar configuración
npm run agents:validate

# Ejecutar Fase 1 (Análisis)
npm run agents:phase1

# Ver todos los agentes
npm run agents:status

# Logs en vivo
npm run agents:logs

# Ver reportes generados
ls -la reports/

# Ejecutar agente específico
npm run agents:ui-review
npm run agents:code-analysis
npm run agents:performance
npm run agents:security
npm run agents:cloudinary

# Build local
npm run build

# Tests
npm test
npm run test:watch
npm run test:coverage
```

---

## 🚨 Protocolo de Issues

### Cuando encuentres un problema

1. **Crea una issue en GitHub**
   - Etiqueta: `bug`, `agent-*`, `ui-*`, etc.
   - Describe tipo de problema
   - Incluye steps to reproduce

2. **Agentes investigarán automáticamente**
   - Si es UX: `/ui-review`
   - Si es código: `/code-analysis`
   - Si es performance: `/performance-optimize`
   - Si es seguridad: `/security-audit`

3. **Genera PR automático** o
   **Crea branch manual**: `fix/issue-#XXX`

4. **Valida con agentes** antes de merge

---

## 📚 Documentación Completa

- **[AGENTS.md](.github/AGENTS.md)** - 7 agentes detallados
- **[ROADMAP.md](./ROADMAP.md)** - 5 fases de desarrollo
- **[Instructions](.github/instructions/)** - Por agent detallado
- **[PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)** - Análisis técnico
- **[INTEGRATION_INSTRUCTIONS.md](./INTEGRATION_INSTRUCTIONS.md)** - Setup

---

## 💬 Contacto & Soporte

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Slack**: #shield-sheep channel
- **Email**: admin@shield-sheep.io

---

**Last Updated**: 2026-04-20  
**Maintained By**: AI Agents System  
**Status**: Production Ready ✅
