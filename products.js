/**
 * products.js — Shield Sheep · Capa de Datos del Catálogo
 * ─────────────────────────────────────────────────────────
 * - Catálogo real de ropa (Camisetas, Sudaderas, Accesorios, Gorras)
 * - Persistencia en localStorage con versioning y migración
 * - API limpia expuesta en window para index.html y admin.js
 * - Validación de schema para evitar datos corruptos
 */

;(function (global) {
    'use strict';

    /* ── Versión del schema de localStorage ────────────────── */
    const STORAGE_KEY     = 'ss_productos';
    const STORAGE_VERSION = 2;          // incrementar si cambia el schema
    const VERSION_KEY     = 'ss_productos_v';

    /* ── Catálogo inicial (source of truth) ─────────────────── */
    const INITIAL_PRODUCTS = [
        /* ──────────── CAMISETAS ──────────── */
        {
            id:          1,
            name:        "Camiseta 'Shalom'",
            category:    "Camisetas",
            price:       75000,
            stock:       20,
            badge:       "Más vendida",
            image:       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
            description: "Camiseta de algodón 100 % premium con la palabra hebrea שָׁלוֹם (Shalom) estampada en serigrafía de alta resolución.",
            simbolismo:  "Shalom —שָׁלוֹם— significa paz, plenitud y armonía en hebreo bíblico. Llevarla es una declaración de la paz que sobrepasa todo entendimiento.",
            importancia: "En la tradición hebrea, Shalom no es solo la ausencia de conflicto sino un estado de bienestar completo del alma. Es el saludo y la bendición más usada en las Escrituras."
        },
        {
            id:          2,
            name:        "Camiseta 'Yeshua'",
            category:    "Camisetas",
            price:       75000,
            stock:       15,
            image:       "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
            description: "Camiseta oversize unisex con el nombre hebreo יֵשׁוּעַ (Yeshua) bordado en hilo dorado sobre tela negra de peso medio.",
            simbolismo:  "Yeshua —יֵשׁוּעַ— es el nombre hebreo de Jesús. Significa 'El Señor salva', una síntesis perfecta de la promesa de redención.",
            importancia: "Usar el nombre original en su idioma originario es una conexión directa con las raíces de la fe. El bordado dorado evoca la realeza del Mesías."
        },
        {
            id:          3,
            name:        "Camiseta 'Alef-Tav'",
            category:    "Camisetas",
            price:       80000,
            stock:       10,
            badge:       "Edición limitada",
            image:       "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
            description: "Camiseta de corte regular con las letras hebreas א (Alef) y ת (Tav) en tipografía caligráfica. Confeccionada en algodón peinado.",
            simbolismo:  "Alef y Tav son la primera y última letra del alfabeto hebreo, equivalentes al Alfa y Omega griego: el principio y el fin de todas las cosas.",
            importancia: "Aparecen en Apocalipsis 1:8 como título del Señor. Portar estas letras es declarar la soberanía de Dios sobre el tiempo y la existencia."
        },

        /* ──────────── SUDADERAS ──────────── */
        {
            id:          4,
            name:        "Hoodie 'Kadosh'",
            category:    "Sudaderas",
            price:       145000,
            stock:       12,
            badge:       "Nuevo",
            image:       "https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=800&q=80",
            description: "Sudadera con capucha premium de 320 g/m² con la palabra hebrea קָדוֹשׁ (Kadosh — Santo) en tipografía manual al frente.",
            simbolismo:  "Kadosh —קָדוֹשׁ— significa 'santo', apartado para un propósito sagrado. Es el canto que los serafines entonan ante el trono (Isaías 6:3).",
            importancia: "La santidad no es solo moralidad: es identidad. Esta sudadera es un recordatorio físico de que eres llamado a vivir apartado para algo mayor."
        },
        {
            id:          5,
            name:        "Hoodie 'Ruach'",
            category:    "Sudaderas",
            price:       145000,
            stock:       8,
            image:       "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
            description: "Hoodie oversize tono carbón con la palabra רוּחַ (Ruach — Espíritu / Viento) en estampado desgastado efecto vintage.",
            simbolismo:  "Ruach —רוּחַ— es el aliento de Dios que sopló vida en Adán. La misma palabra describe el Espíritu Santo. Es viento, aliento y espíritu a la vez.",
            importancia: "Esta prenda recuerda que la misma fuerza que dio origen a la vida habita en el creyente. El diseño desgastado evoca la eternidad por encima del tiempo."
        },

        /* ──────────── ACCESORIOS ──────────── */
        {
            id:          6,
            name:        "Bolso 'Menorah'",
            category:    "Accesorios",
            price:       95000,
            stock:       7,
            image:       "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
            description: "Tote bag de lona gruesa 12 oz con la Menorah de siete brazos grabada en vinilo dorado. Asa reforzada y bolsillo interior.",
            simbolismo:  "La Menorah —מְנוֹרָה— es el candelabro sagrado del Tabernáculo. Sus siete llamas representan los siete Espíritus de Dios y la presencia divina continua.",
            importancia: "Reconocida como el símbolo más antiguo del judaísmo y la fe hebraica. Llevar la Menorah es cargar la luz del mundo consigo en lo cotidiano."
        },
        {
            id:          7,
            name:        "Mochila 'Shield'",
            category:    "Accesorios",
            price:       180000,
            stock:       5,
            badge:       "Premium",
            image:       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
            description: "Mochila urbana de 25 L con el escudo de Shield Sheep bordado. Compartimento para laptop 15\", correas acolchadas y tela resistente al agua.",
            simbolismo:  "El escudo es el símbolo central de la marca: la fe como armadura. Inspirada en el versículo de Efesios 6:16 — el escudo de la fe.",
            importancia: "Cada prenda de la armadura espiritual tiene un significado; el escudo detiene los dardos de fuego. Esta mochila es protección funcional y espiritual."
        },

        /* ──────────── GORRAS ──────────── */
        {
            id:          8,
            name:        "Gorra 'Emet'",
            category:    "Gorras",
            price:       55000,
            stock:       18,
            image:       "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
            description: "Gorra dad hat de seis paneles con la palabra hebrea אֱמֶת (Emet — Verdad) bordada en hilo dorado. Cierre ajustable metálico.",
            simbolismo:  "Emet —אֱמֶת— significa verdad en hebreo. Está compuesta por la primera, media y última letra del alfabeto: la verdad abarca todo lo que existe.",
            importancia: "Los rabinos enseñan que Emet es el sello de Dios. Usarla en la cabeza es una declaración de que la mente está guiada y protegida por la verdad divina."
        },
        {
            id:          9,
            name:        "Gorra 'Chai'",
            category:    "Gorras",
            price:       55000,
            stock:       14,
            badge:       "Nuevo",
            image:       "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=800&q=80",
            description: "Gorra snapback negra con el símbolo חַי (Chai — Vida) en bordado 3D. Panel frontal estructurado, visera plana.",
            simbolismo:  "Chai —חַי— es la palabra hebrea para vida. Su valor numérico es 18, número considerado de buena fortuna en la tradición judía.",
            importancia: "Chai es el símbolo de que el creyente vive en plenitud, no en supervivencia. El bordado 3D lo hace tridimensional, recordando que la vida tiene profundidad."
        }
    ];

    /* ── Validación de schema ────────────────────────────────── */
    const REQUIRED_FIELDS = ['id', 'name', 'category', 'price', 'stock', 'image', 'description', 'simbolismo', 'importancia'];

    function isValidProduct(p) {
        if (!p || typeof p !== 'object') return false;
        for (const field of REQUIRED_FIELDS) {
            if (p[field] === undefined || p[field] === null || p[field] === '') return false;
        }
        return (
            Number.isInteger(p.id)        &&
            typeof p.name        === 'string' &&
            typeof p.category    === 'string' &&
            typeof p.price       === 'number' && p.price >= 0 &&
            typeof p.stock       === 'number' && p.stock >= 0 &&
            typeof p.image       === 'string' && p.image.startsWith('http') &&
            typeof p.description === 'string'
        );
    }

    /* ── Carga con migración de versión ─────────────────────── */
    function loadProductos() {
        try {
            const storedVersion = parseInt(localStorage.getItem(VERSION_KEY) || '0', 10);
            const raw           = localStorage.getItem(STORAGE_KEY);

            if (!raw) return INITIAL_PRODUCTS.slice();   // primera carga

            if (storedVersion < STORAGE_VERSION) {
                // Migración: descartar datos de versiones anteriores que
                // pueden tener schema incompatible (amuletos, lanas, aceites)
                console.info('[Shield Sheep] Migración de catálogo v' + storedVersion + ' → v' + STORAGE_VERSION);
                localStorage.removeItem(STORAGE_KEY);
                localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
                return INITIAL_PRODUCTS.slice();
            }

            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_PRODUCTS.slice();

            // Filtrar productos inválidos para no romper la UI
            const valid = parsed.filter(isValidProduct);
            if (valid.length !== parsed.length) {
                console.warn('[Shield Sheep] Se descartaron ' + (parsed.length - valid.length) + ' productos con schema inválido.');
            }

            return valid.length > 0 ? valid : INITIAL_PRODUCTS.slice();

        } catch (err) {
            console.error('[Shield Sheep] Error al cargar catálogo:', err);
            return INITIAL_PRODUCTS.slice();
        }
    }

    /* ── Estado global ──────────────────────────────────────── */
    let productos = loadProductos();

    // Escribir versión si es primera carga
    if (!localStorage.getItem(VERSION_KEY)) {
        localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
    }

    /* ── API pública ────────────────────────────────────────── */

    /**
     * Persiste el catálogo actual en localStorage.
     */
    function saveProductos() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
            localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
        } catch (err) {
            console.error('[Shield Sheep] Error al guardar catálogo:', err);
        }
    }

    /**
     * Devuelve una copia del catálogo actual.
     * Usar esta función garantiza que no se muta el estado externo.
     */
    function getProductos() {
        return productos;
    }

    /**
     * Valida un objeto producto antes de insertarlo o actualizarlo.
     * Devuelve { valid: true } o { valid: false, errors: [...] }
     */
    function validateProduct(p) {
        const errors = [];
        for (const field of REQUIRED_FIELDS) {
            if (p[field] === undefined || p[field] === null || p[field] === '') {
                errors.push('Campo requerido vacío: ' + field);
            }
        }
        if (p.price   !== undefined && (isNaN(p.price)   || p.price   < 0)) errors.push('Precio inválido');
        if (p.stock   !== undefined && (isNaN(p.stock)   || p.stock   < 0)) errors.push('Stock inválido');
        if (p.image   && !p.image.startsWith('http'))                        errors.push('URL de imagen inválida (debe comenzar con http)');
        return errors.length === 0 ? { valid: true } : { valid: false, errors };
    }

    /**
     * Devuelve el catálogo inicial (para resetear desde el admin si se desea).
     */
    function getInitialProducts() {
        return INITIAL_PRODUCTS.slice();
    }

    /* ── Exponer al scope global ─────────────────────────────
     * NOTA: Se expone la referencia de función, NO el array directamente.
     * admin.js debe mutar la variable local `productos` y llamar saveProductos().
     * El index.html accede a `productos` como variable global (definida con `let`
     * al nivel de módulo IIFE — ver abajo).
    ──────────────────────────────────────────────────────── */
    global.saveProductos    = saveProductos;
    global.getProductos     = getProductos;
    global.validateProduct  = validateProduct;
    global.getInitialProducts = getInitialProducts;

    // Exponer el array como variable global mutable para compatibilidad
    // con admin.js (que hace `productos = productos.filter(...)`)
    global.productos = productos;

    // Proxy para mantener global.productos sincronizado cuando admin.js
    // reasigna la variable local. admin.js debe llamar window.syncProductos()
    // después de reasignar.
    global.syncProductos = function () {
        // admin.js llama esto después de: productos = productos.filter(...)
        // para que window.productos apunte al nuevo array.
        // Uso: después de cualquier filtro/reasignación en admin.js,
        //      llamar syncProductos() antes de saveProductos().
        productos = global.productos;
    };

}(window));
