---
name: "cloudinary-integration"
description: "Use when setting up Cloudinary for image/video optimization, generating responsive images, creating transformation templates, or managing media assets. Ensures professional multimedia delivery."
applyTo: "**/*.html"
---

# Cloudinary Integration Instructions

## Configuración Base

```javascript
// Variables requeridas en .env
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
CLOUDINARY_URL_SECURE=true
```

## Patrones de URL Optimizados

### Imágenes Responsivas

```javascript
// Patrón básico con transformaciones
https://res.cloudinary.com/{CLOUD_NAME}/image/upload/
  f_auto,                    // Auto format (WebP/AVIF)
  q_auto:best,               // Auto quality optimization
  w_auto,                    // Responsive width
  c_limit,                   // No upscaling
  dpr_auto,                  // Device pixel ratio
  /v{VERSION}/               // Cache busting
  {PUBLIC_ID}

// Ejemplo completo
https://res.cloudinary.com/shield-sheep/image/upload/
  f_auto,q_auto:best,w_auto,c_limit,dpr_auto/
  v1682123456/
  products/hero-image.jpg
```

### Srcset Responsivo

```html
<!-- Generation template -->
<img
  src="https://res.cloudinary.com/{CLOUD_NAME}/image/upload/
    f_auto,q_auto:best,w_800/v1682123456/{PUBLIC_ID}"
  srcset="
    https://res.cloudinary.com/{CLOUD_NAME}/image/upload/
    f_auto,q_auto:best,w_480/v1682123456/{PUBLIC_ID} 480w,
    https://res.cloudinary.com/{CLOUD_NAME}/image/upload/
    f_auto,q_auto:best,w_768/v1682123456/{PUBLIC_ID} 768w,
    https://res.cloudinary.com/{CLOUD_NAME}/image/upload/
    f_auto,q_auto:best,w_1024/v1682123456/{PUBLIC_ID} 1024w,
    https://res.cloudinary.com/{CLOUD_NAME}/image/upload/
    f_auto,q_auto:best,w_1280/v1682123456/{PUBLIC_ID} 1280w
  "
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, 80vw"
  loading="lazy"
  width="800"
  height="600"
  alt="Product hero image"
/>
```

### Video con Poster

```html
<!-- Video with Cloudinary poster -->
<video
  poster="https://res.cloudinary.com/{CLOUD_NAME}/image/upload/
    f_auto,q_auto:best,w_800,c_fill/
    v1682123456/{PUBLIC_ID}.jpg"
  controls
  width="800"
  height="450"
>
  <source
    src="https://res.cloudinary.com/{CLOUD_NAME}/video/upload/
      q_auto:best,f_auto,so_auto/
      v1682123456/{PUBLIC_ID}.mp4"
    type="video/mp4"
  />
  <source
    src="https://res.cloudinary.com/{CLOUD_NAME}/video/upload/
      q_auto:best,f_auto,so_auto/
      v1682123456/{PUBLIC_ID}.webm"
    type="video/webm"
  />
  Your browser doesn't support video.
</video>
```

## Transformaciones Comunes

### Crop & Resize

```
// Aspect ratio 1:1 (square)
c_fill,ar_1:1,w_400

// Crop to face
c_thumb,g_face,w_400,h_400

// Pad to aspect ratio
c_pad,ar_16:9,b_white,w_800

// Scale down only (no upscale)
c_scale,w_800
```

### Filters & Effects

```
// Blur background (security)
e_blur:300,e_blur_faces

// Grayscale
e_grayscale

// Sepia tone
e_sepia

// Quality auto
q_auto:best

// Original quality
q_100
```

### Text Overlay

```
// Add text overlay
l_text:Arial_50:Premium,x_20,y_20,c_white

// Combine with images
l_image:logo.png,g_north_east,x_10,y_10
```

## Lazy Loading Implementation

```html
<!-- Intersection Observer pattern -->
<img
  data-src="https://res.cloudinary.com/{CLOUD_NAME}/image/upload/
    f_auto,q_auto:best,w_800/v1682123456/{PUBLIC_ID}"
  data-srcset="..."
  class="lazy"
  loading="lazy"
  width="800"
  height="600"
  alt="Deferred image"
/>

<script>
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.srcset = img.dataset.srcset;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}
</script>
```

## Performance Optimization

### Checklist de Optimización

- [ ] Todas las imágenes vía Cloudinary
- [ ] `f_auto` agregado a todas las URLs
- [ ] `q_auto:best` configurado
- [ ] Srcset responsivo generado
- [ ] Lazy loading implementado
- [ ] Width/height attributes presentes
- [ ] Cache headers configurados
- [ ] Versioning (v param) activo
- [ ] Video thumbnails optimizados
- [ ] CDN caching habilitado

### Medición de Impacto

```
Antes:  2.1s LCP, 125KB images
Después: 1.2s LCP, 45KB images (65% reduction)
         
Métrica: 
- Image size reduction: 60-65%
- LCP improvement: 40-50%
- CLS improvement: 0 (no layout shifts)
```

## Validación de URLs

```javascript
// Verificar que Cloudinary está correctamente configurado
const validCloudinaryUrl = (url) => {
  const pattern = /^https:\/\/res\.cloudinary\.com\/[a-z0-9-]+\//;
  return pattern.test(url);
};

// Validar transformaciones
const hasOptimizations = (url) => {
  return url.includes('f_auto') &&      // Format auto
         url.includes('q_auto') &&      // Quality auto
         url.includes('w_auto' || /w_\d+/);  // Responsive width
};

// Verificar secure URL
const isSecure = (url) => {
  return url.startsWith('https://');
};
```

## Troubleshooting

### Imagen no se carga
```
1. Verificar CLOUDINARY_CLOUD_NAME correcto
2. Verificar PUBLIC_ID existe en Cloudinary
3. Verificar URL es HTTPS
4. Verificar permisos de acceso
5. Check Cloudinary dashboard status
```

### Calidad pobre
```
1. Cambiar de q_auto:best a q_80-90
2. Verificar formato con f_auto
3. Cambiar a formato lossless si necesario
4. Verificar imagen original es buena calidad
```

### Performance lenta
```
1. Habilitar progressive JPEG: fl_progressive
2. Aumentar compression: f_png,fl_lossy
3. Usar WebP/AVIF: f_auto
4. Implementar lazy loading
5. Verificar CDN cache activo
```

## Testing

```html
<!-- Test page to validate setup -->
<html>
<head>
  <title>Cloudinary Integration Test</title>
</head>
<body>
  <!-- Test 1: Basic image with auto optimization -->
  <img 
    src="https://res.cloudinary.com/{CLOUD_NAME}/image/upload/f_auto,q_auto:best,w_400/test-image.jpg"
    alt="Test 1: Auto optimization"
  />

  <!-- Test 2: Responsive image -->
  <img
    srcset="
      https://res.cloudinary.com/{CLOUD_NAME}/image/upload/f_auto,q_auto:best,w_480/test-image.jpg 480w,
      https://res.cloudinary.com/{CLOUD_NAME}/image/upload/f_auto,q_auto:best,w_800/test-image.jpg 800w
    "
    alt="Test 2: Responsive"
  />

  <!-- Test 3: Video with poster -->
  <video poster="https://res.cloudinary.com/{CLOUD_NAME}/image/upload/f_auto,q_auto:best,w_800/test-video.jpg">
    <source src="https://res.cloudinary.com/{CLOUD_NAME}/video/upload/q_auto:best,f_auto/test-video.mp4" type="video/mp4">
  </video>

  <script>
    // Validate all Cloudinary URLs
    const cloudinaryImages = document.querySelectorAll('[src*="cloudinary"], [srcset*="cloudinary"]');
    console.log('Found', cloudinaryImages.length, 'Cloudinary images');
    
    cloudinaryImages.forEach(img => {
      img.onerror = () => {
        console.error('Failed to load:', img.src || img.srcset);
      };
      img.onload = () => {
        console.log('✓ Loaded:', img.src || img.srcset);
      };
    });
  </script>
</body>
</html>
```

## Monitoreo Continuo

```bash
# Validar todas las URLs Cloudinary
npm run cloudinary:validate

# Generar reporte de optimización
npm run cloudinary:report

# Watch para cambios
npm run cloudinary:watch
```
