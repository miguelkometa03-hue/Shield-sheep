# 🚀 SETUP RÁPIDO: COMANDOS LISTOS PARA EJECUTAR

## 1️⃣ PRIMERO: Configura tus API Keys

### Abre `.env` y rellena:
```bash
# Firebase
FIREBASE_API_KEY=tu_firebase_api_key_aqui
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_UPLOAD_PRESET=tu_preset
CLOUDINARY_API_KEY=tu_api_key

# Jules.ia
JULES_API_KEY=tu_jules_api_key_aqui
JULES_API_URL=https://api.julius.ia
JULES_MODEL=gpt-4-turbo

# Qwen Code
QWEN_API_KEY=tu_qwen_api_key_aqui
QWEN_MODEL=qwen-max
```

---

## 2️⃣ EJECUTA EL SCRIPT DE SETUP

```bash
# Dale permisos y ejecuta
chmod +x setup-ai-integration.sh
./setup-ai-integration.sh
```

Este script:
- ✅ Valida tus credenciales
- ✅ Verifica la conexión con Jules.ia
- ✅ Configura Qwen Code
- ✅ Genera reportes
- ✅ Instala dependencias

---

## 3️⃣ COMANDOS INDIVIDUALES

### 🔎 Jules.ia - Análisis de Código

```bash
# Instalar CLI de Jules
npm install -g @julesai/cli

# Autenticar
jules login --api-key $JULES_API_KEY

# Análisis completo del proyecto
jules analyze ./

# Reporte detallado
julius analyze ./ --report=detailed

# Solo rendimiento
julius analyze ./ --scope=performance

# Solo seguridad
julius analyze ./ --scope=security

# Linting & calidad
julius analyze ./ --scope=quality

# Generar tests automáticamente
julius generate-tests ./ --output=./tests
```

### 🧠 Qwen Code - Búsqueda Inteligente

```bash
# Conectar a tu repositorio
qwen --connect miguelkometa03-hue/Shield-sheep --branch main

# Buscar en el código
qwen search "animation"
qwen search "Cloudinary"
qwen search "Firebase"

# Encontrar funciones específicas
qwen find-function "handleOrder"
qwen find-class "AdminPanel"

# Análisis de rendimiento
qwen analyze --focus=performance

# Refactoring suggestions
qwen refactor --scope=project

# Encontrar problemas
qwen issues --severity=high
```

### 🔐 Validar Configuración

```bash
# Ver variables de entorno cargadas
source .env
echo $JULES_API_KEY
echo $QWEN_API_KEY

# Probar Jules.ia
curl -X GET https://api.julius.ia/v1/health \
  -H "Authorization: Bearer $JULES_API_KEY"

# Probar Cloudinary
curl -X GET https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources \
  -u "$CLOUDINARY_API_KEY:"

# Listar archivos del proyecto
find . -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \) | head -20
```

---

## 4️⃣ ANÁLISIS COMPLETO DEL PROYECTO

```bash
# Ejecutar análisis múltiple
echo "=== Analizando HTML ===" && find . -name "*.html" -type f
echo "=== Analizando CSS ===" && find . -name "*.css" -type f
echo "=== Analizando JS ===" && find . -name "*.js" -type f

# Estadísticas proyecto
echo "📊 Estadísticas:"
echo "HTML files: $(find . -name "*.html" | wc -l)"
echo "CSS files: $(find . -name "*.css" | wc -l)"
echo "JS files: $(find . -name "*.js" | wc -l)"
echo "Tamaño total: $(du -sh . | cut -f1)"

# Búsqueda de palabras clave importantes
echo "🔍 Búsquedas importantes:"
grep -r "Cloudinary" . --include="*.html" --include="*.js" | head -5
grep -r "Firebase" . --include="*.html" --include="*.js" | head -5
grep -r "animation" . --include="*.css" | head -5
```

---

## 5️⃣ VERIFICACIÓN FINAL

```bash
# Checklist de configuración
echo "✓ Git repository:"
git config --get remote.origin.url

echo "✓ Rama actual:"
git branch

echo "✓ Archivos de configuración:"
ls -la | grep -E "\.env|\.qwen|\.agent"

echo "✓ Página principal:"
head -20 index.html

echo "✓ Página admin:"
head -20 admin.html

echo "✓ Variables CSS:"
grep --color "^\\s*--" $(find . -name "*.css") | head -10
```

---

## 6️⃣ GENERAR REPORTES

```bash
# Crear directorio para reportes
mkdir -p .reporting/{jules,qwen,analysis}

# Jules Analysis Report
julius analyze ./ --report=json > .reporting/jules/analysis.json

# Qwen Report
qwen analyze --format=json > .reporting/qwen/analysis.json

# Reporte de accesibilidad
grep -r "aria-label" . --include="*.html" > .reporting/analysis/accessibility.txt
grep -r "role=" . --include="*.html" >> .reporting/analysis/accessibility.txt

# Reporte de seguridad
grep -r "Content-Security-Policy" . --include="*.html" > .reporting/analysis/security.txt
grep -r "https://" . --include="*.html" | grep -v "%s" >> .reporting/analysis/security.txt

# Ver reportes
echo "📄 Reportes generados:"
ls -la .reporting/*/*.json .reporting/*/*.txt 2>/dev/null
```

---

## 7️⃣ INTEGRACIÓN CON VS CODE

### Extensiones Recomendadas
```bash
# Instalar extensiones
code --install-extension Julius.julius-ai
code --install-extension Qwen.qwen-code-extensions
code --install-extension Firebase.firebase
code --install-extension cloudinary.cloudinary-vscode
```

### Configuración VS Code (settings.json)
```json
{
  "julius.apiKey": "${env:JULES_API_KEY}",
  "qwen.repository": "miguelkometa03-hue/Shield-sheep",
  "qwen.branch": "main",
  "cloudinary.cloudName": "${env:CLOUDINARY_CLOUD_NAME}",
  "firebase.projectId": "${env:FIREBASE_PROJECT_ID}",
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 8️⃣ SOLUCIÓN DE PROBLEMAS

### Error: "JULES_API_KEY not found"
```bash
# Verificar .env
cat .env | grep JULES_API_KEY

# Source manualmente
source .env
echo $JULES_API_KEY
```

### Error: "Qwen cannot access repository"
```bash
# Verificar GitHub token
gh auth status

# Reconectar si es necesario
gh auth login

# Verificar acceso al repo
gh repo view miguelkometa03-hue/Shield-sheep
```

### Error: "Cloudinary upload failed"
```bash
# Validar credenciales
curl -X GET https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources \
  -u "$CLOUDINARY_API_KEY:" -s | jq '.'
```

### Error: "Firebase initialization failed"
```bash
# Validar Firebase config
node -e "console.log({
  apiKey: process.env.FIREBASE_API_KEY?.substr(0,5),
  projectId: process.env.FIREBASE_PROJECT_ID
})"
```

---

## 9️⃣ AUTOMATIZACIÓN CONTINUA

### Ejecutar análisis periódicamente
```bash
# Análisis diario (cron job)
0 9 * * * cd /workspaces/Shield-sheep && ./setup-ai-integration.sh >> .reporting/daily.log

# Análisis pre-commit
# Agregar a .git/hooks/pre-commit
#!/bin/bash
julius analyze ./ --scope=security
qwen issues --severity=high
```

---

## 🔟 DOCUMENTACIÓN ADICIONAL

Ver estos archivos para más información:
- `INTEGRATION_INSTRUCTIONS.md` - Guía detallada
- `PROJECT_ANALYSIS.md` - Análisis técnico completo
- `.instructions.md` - Configuración del agente
- `.agent.md` - Documentación del agente IA
- `AGENTS.md` - UI/UX Pro Max skill

---

## ✨ ¡LISTO!

Ahora tienes:
✅ Jules.ia conectado para análisis de código
✅ Qwen Code integrado al repositorio
✅ Cloudinary configurado para medios
✅ Firebase configurado para backend
✅ Reportes automatizados
✅ Agente IA personalizado

¡Tu Shield-Sheep está lista para productivo! 🐑🎉
