/**
 * admin.js — Shield Sheep · Lógica del Panel de Administración
 * ─────────────────────────────────────────────────────────────
 * Depende de: products.js (cargado antes en admin.html)
 * Expone funciones globales llamadas desde inline handlers en admin.html
 */

;(function () {
    'use strict';

    /* ────────────────────────────────────────────────────────
       AUTENTICACIÓN
    ──────────────────────────────────────────────────────── */

    /**
     * Verifica sesión y arranca el panel.
     * El overlay de login en admin.html se encarga de mostrar/ocultar la UI de acceso.
     */
    function initAdmin() {
        renderProducts();
        renderPriceTable();
        renderImageProductSelect();
        updateDashboard();
        loadInvestorSettings();
    }

    /* ────────────────────────────────────────────────────────
       DASHBOARD
    ──────────────────────────────────────────────────────── */

    function updateDashboard() {
        const list         = window.productos;
        const totalProducts = list.length;
        const totalStock    = list.reduce((acc, p) => acc + p.stock, 0);
        const lowStock      = list.filter(p => p.stock < 5).length;
        const avgPrice      = totalProducts > 0
            ? Math.round(list.reduce((acc, p) => acc + p.price, 0) / totalProducts)
            : 0;

        _setText('statTotalProducts', totalProducts);
        _setText('statTotalStock',    totalStock);
        _setText('statLowStock',      lowStock);
        _setText('statAvgPrice',      `$${avgPrice.toLocaleString('es-CO')}`);
    }

    /* ────────────────────────────────────────────────────────
       CRUD DE PRODUCTOS
    ──────────────────────────────────────────────────────── */

    function renderProducts() {
        const productList = document.getElementById('productList');
        const list = window.productos;

        if (!productList) return;

        if (list.length === 0) {
            productList.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:3rem;
                            background:rgba(255,255,255,0.03);border-radius:12px;
                            border:1px solid rgba(255,255,255,0.06);">
                    <i class="fas fa-box-open" style="font-size:3rem;
                       color:rgba(212,175,55,0.2);margin-bottom:1rem;display:block;"></i>
                    <p style="color:var(--gris-texto);">No hay productos registrados</p>
                </div>`;
            return;
        }

        productList.innerHTML = list.map(p => `
            <div class="admin-card">
                <img src="${_esc(p.image)}" alt="${_esc(p.name)}" loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x300?text=Sin+Imagen'">
                <div class="admin-card-content">
                    <h3>${_esc(p.name)}</h3>
                    <p>${_esc(p.category)} | Stock: <strong>${p.stock}</strong></p>
                    <p class="price">$${p.price.toLocaleString('es-CO')}</p>
                    <div class="admin-card-actions">
                        <button class="btn-edit"   onclick="editProduct(${p.id})"
                                aria-label="Editar ${_esc(p.name)}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" onclick="deleteProduct(${p.id})"
                                aria-label="Eliminar ${_esc(p.name)}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>`).join('');
    }

    /* ── Modal de creación / edición ── */

    function openProductModal() {
        _setText('modalTitle', 'Nuevo Producto');
        _setText('productSaveBtn', 'Crear Producto');
        document.getElementById('productForm').reset();
        document.getElementById('editingProductId').value   = '';
        document.getElementById('productImagePreview').style.display = 'none';
        document.getElementById('imageHelperText').style.display     = 'none';
        document.getElementById('uploadText').textContent  = 'Selecciona una imagen';
        // Limpiar campos de simbolismo/importancia que tienen valor por defecto
        const simField = document.getElementById('productSimbolismo');
        const impField = document.getElementById('productImportancia');
        if (simField) simField.value = '';
        if (impField) impField.value = '';
        document.getElementById('productModal').classList.add('active');
        // Foco accesible
        setTimeout(() => document.getElementById('productName')?.focus(), 100);
    }

    function closeProductModal() {
        document.getElementById('productModal').classList.remove('active');
    }

    function handleProductSubmit(e) {
        e.preventDefault();

        const id          = document.getElementById('editingProductId').value;
        const name        = document.getElementById('productName').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const priceRaw    = document.getElementById('productPrice').value;
        const stockRaw    = document.getElementById('productStock').value;
        const category    = document.getElementById('productCategory').value;
        const simbolismo  = (document.getElementById('productSimbolismo')?.value || '').trim()
                            || 'Símbolo de fe y propósito.';
        const importancia = (document.getElementById('productImportancia')?.value || '').trim()
                            || 'Pieza exclusiva de Shield Sheep.';

        const price = parseInt(priceRaw,  10);
        const stock = parseInt(stockRaw, 10);

        // ── Validación básica ──
        if (!name || !description || !category) {
            showToast('Completa nombre, descripción y categoría', 'warning');
            return;
        }
        if (isNaN(price) || price < 0) {
            showToast('Ingresa un precio válido (≥ 0)', 'warning');
            return;
        }
        if (isNaN(stock) || stock < 0) {
            showToast('Ingresa un stock válido (≥ 0)', 'warning');
            return;
        }

        // ── Imagen ──
        const preview  = document.getElementById('productImagePreview');
        const imgSrc   = preview?.src || '';
        const isNewImg = imgSrc && !imgSrc.includes('placeholder') && imgSrc !== window.location.href;

        const list = window.productos;

        if (id) {
            /* ── EDITAR ── */
            const idx = list.findIndex(p => p.id == id);
            if (idx === -1) { showToast('Producto no encontrado', 'warning'); return; }

            const candidate = {
                ...list[idx],
                name, description, price, stock, category, simbolismo, importancia,
                image: isNewImg ? imgSrc : list[idx].image
            };

            // Validar con API de products.js
            const validation = (typeof validateProduct === 'function')
                ? validateProduct(candidate)
                : { valid: true };

            if (!validation.valid) {
                showToast('Error: ' + validation.errors[0], 'warning');
                return;
            }

            list[idx] = candidate;
            showToast('Producto editado correctamente', 'success');

        } else {
            /* ── CREAR ── */
            const newId     = list.length > 0 ? Math.max(...list.map(p => p.id)) + 1 : 1;
            const fallbackImg = 'https://via.placeholder.com/800x600?text=Sin+Imagen';

            const candidate = {
                id:          newId,
                name, description, price, stock, category, simbolismo, importancia,
                image:       isNewImg ? imgSrc : fallbackImg,
                badge:       null
            };

            const validation = (typeof validateProduct === 'function')
                ? validateProduct(candidate)
                : { valid: true };

            if (!validation.valid) {
                showToast('Error: ' + validation.errors[0], 'warning');
                return;
            }

            list.push(candidate);
            showToast('Producto creado exitosamente', 'success');
        }

        _commitProductos();
        closeProductModal();
    }

    function editProduct(id) {
        const producto = window.productos.find(p => p.id === id);
        if (!producto) return;

        _setText('modalTitle',      'Editar Producto');
        _setText('productSaveBtn',  'Guardar Cambios');
        document.getElementById('editingProductId').value    = id;
        document.getElementById('productName').value         = producto.name;
        document.getElementById('productDescription').value  = producto.description;
        document.getElementById('productPrice').value        = producto.price;
        document.getElementById('productStock').value        = producto.stock;
        document.getElementById('productCategory').value     = producto.category;

        const simField = document.getElementById('productSimbolismo');
        const impField = document.getElementById('productImportancia');
        if (simField) simField.value = producto.simbolismo || '';
        if (impField) impField.value = producto.importancia || '';

        const preview    = document.getElementById('productImagePreview');
        const helperText = document.getElementById('imageHelperText');
        const uploadText = document.getElementById('uploadText');

        const hasImg = producto.image && !producto.image.includes('placeholder');
        if (hasImg) {
            preview.src              = producto.image;
            preview.style.display    = 'block';
            if (helperText) helperText.style.display = 'inline';
            if (uploadText) uploadText.textContent   = 'Cambiar imagen';
        } else {
            preview.style.display    = 'none';
            if (helperText) helperText.style.display = 'none';
            if (uploadText) uploadText.textContent   = 'Selecciona una imagen';
        }

        document.getElementById('productModal').classList.add('active');
        setTimeout(() => document.getElementById('productName')?.focus(), 100);
    }

    function deleteProduct(id) {
        const producto = window.productos.find(p => p.id === id);
        if (!producto) return;

        if (!confirm(`¿Eliminar "${producto.name}"?\nEsta acción no se puede deshacer.`)) return;

        // FIX CRÍTICO: reasignar window.productos Y llamar syncProductos()
        // para que la referencia global quede correcta después del filter.
        window.productos = window.productos.filter(p => p.id !== id);
        if (typeof syncProductos === 'function') syncProductos();

        _commitProductos();
        showToast('Producto eliminado', 'success');
    }

    function previewProductImage(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            showToast('El archivo debe ser una imagen', 'warning');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast('La imagen no puede superar 5 MB', 'warning');
            return;
        }
        const reader = new FileReader();
        reader.onload = ev => {
            const preview = document.getElementById('productImagePreview');
            preview.src           = ev.target.result;
            preview.style.display = 'block';
            const helperText = document.getElementById('imageHelperText');
            if (helperText) helperText.style.display = 'inline';
            const uploadText = document.getElementById('uploadText');
            if (uploadText) uploadText.textContent = 'Cambiar imagen';
        };
        reader.readAsDataURL(file);
    }

    /* ────────────────────────────────────────────────────────
       PRECIOS
    ──────────────────────────────────────────────────────── */

    function renderPriceTable() {
        const table = document.getElementById('priceTable');
        if (!table) return;
        const list = window.productos;

        if (list.length === 0) {
            table.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--gris-texto);">No hay productos</td></tr>';
            return;
        }

        table.innerHTML = list.map(p => `
            <tr>
                <td><strong>${_esc(p.name)}</strong></td>
                <td>$${p.price.toLocaleString('es-CO')}</td>
                <td>
                    <input type="number" id="price_${p.id}" min="0" value="${p.price}"
                           aria-label="Nuevo precio para ${_esc(p.name)}">
                </td>
                <td>
                    <button type="button" onclick="updatePrice(${p.id})"
                            style="background:var(--verde-acento);color:var(--blanco);">
                        <i class="fas fa-save"></i> Guardar
                    </button>
                </td>
            </tr>`).join('');
    }

    function updatePrice(id) {
        const input    = document.getElementById('price_' + id);
        if (!input) return;
        const newPrice = parseInt(input.value, 10);

        if (isNaN(newPrice) || newPrice < 0) {
            showToast('Ingresa un precio válido', 'warning');
            return;
        }

        const producto = window.productos.find(p => p.id === id);
        if (!producto) return;

        producto.price = newPrice;
        _commitProductos();
        showToast(`Precio actualizado: $${newPrice.toLocaleString('es-CO')}`, 'success');
    }

    /* ────────────────────────────────────────────────────────
       IMÁGENES
    ──────────────────────────────────────────────────────── */

    function renderImageProductSelect() {
        const select = document.getElementById('imageProductSelect');
        if (!select) return;
        select.innerHTML =
            '<option value="">— Selecciona un producto —</option>' +
            window.productos.map(p =>
                `<option value="${p.id}">${_esc(p.name)}</option>`
            ).join('');
    }

    function previewImage(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            const prev = document.getElementById('imagePreview');
            prev.src           = ev.target.result;
            prev.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    function handleImageUpload(e) {
        e.preventDefault();
        const productId   = document.getElementById('imageProductSelect').value;
        const imagePreview = document.getElementById('imagePreview');
        const imageSrc    = imagePreview?.src || '';

        if (!productId) { showToast('Selecciona un producto', 'warning'); return; }
        if (!imageSrc || imageSrc.startsWith('data:,') || imageSrc === window.location.href) {
            showToast('Selecciona una imagen válida', 'warning');
            return;
        }

        const producto = window.productos.find(p => p.id == productId);
        if (!producto) return;

        producto.image = imageSrc;
        _commitProductos();
        showToast('Imagen actualizada correctamente', 'success');

        // Reset form
        const imgInput = document.getElementById('imageInput');
        if (imgInput) imgInput.value = '';
        imagePreview.src           = '';
        imagePreview.style.display = 'none';
        document.getElementById('imageProductSelect').value = '';
    }

    /* ────────────────────────────────────────────────────────
       CONFIGURACIÓN (Info de Inversores)
    ──────────────────────────────────────────────────────── */

    function loadInvestorSettings() {
        const contactInfo = localStorage.getItem('investorContactInfo')
            || 'Contáctanos a: info@shieldsheep.com';
        const input = document.getElementById('investorContactInput');
        if (input) input.value = contactInfo;
    }

    function handleSettingsSave(e) {
        e.preventDefault();
        const val = document.getElementById('investorContactInput')?.value?.trim();
        if (!val) { showToast('El campo no puede estar vacío', 'warning'); return; }
        localStorage.setItem('investorContactInfo', val);
        showToast('Configuración guardada', 'success');
    }

    /**
     * Restaura el catálogo a los productos iniciales.
     * Llamable desde el admin con un botón "Restaurar catálogo".
     */
    function resetCatalog() {
        if (!confirm('¿Restaurar el catálogo al estado original?\nSe perderán todos los cambios.')) return;
        if (typeof getInitialProducts === 'function') {
            window.productos = getInitialProducts();
            if (typeof syncProductos === 'function') syncProductos();
            _commitProductos();
            showToast('Catálogo restaurado al original', 'success');
        }
    }

    /* ────────────────────────────────────────────────────────
       HELPERS PRIVADOS
    ──────────────────────────────────────────────────────── */

    /** Guarda y re-renderiza todo */
    function _commitProductos() {
        saveProductos();
        renderProducts();
        renderPriceTable();
        renderImageProductSelect();
        updateDashboard();
    }

    /** Escapa HTML para evitar XSS en innerHTML */
    function _esc(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /** Asigna textContent de forma segura */
    function _setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    /* ────────────────────────────────────────────────────────
       EXPOSICIÓN AL SCOPE GLOBAL
       (admin.html usa inline onclick="..." que necesita estas funciones)
    ──────────────────────────────────────────────────────── */
    Object.assign(window, {
        initAdmin,
        updateDashboard,
        renderProducts,
        openProductModal,
        closeProductModal,
        handleProductSubmit,
        editProduct,
        deleteProduct,
        previewProductImage,
        renderPriceTable,
        updatePrice,
        renderImageProductSelect,
        previewImage,
        handleImageUpload,
        loadInvestorSettings,
        handleSettingsSave,
        resetCatalog
    });

    /* ────────────────────────────────────────────────────────
       INICIALIZACIÓN
    ──────────────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', () => {
        // Solo inicializar si hay sesión activa.
        // El overlay de login en admin.html maneja el flujo de acceso.
        if (sessionStorage.getItem('adminLoggedIn') === 'true') {
            initAdmin();
        }
        // Cerrar modal con Escape
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeProductModal();
        });
    });

}());
