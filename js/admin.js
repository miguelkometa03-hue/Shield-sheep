// Admin Panel Logic for Shield Sheep
// Managing Products, Prices, Images, and Dashboard

function checkLogin() {
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    if (loggedIn !== 'true') {
        window.location.href = 'admin.html#login';
        location.reload();
    } else {
        initAdmin();
    }
}

function initAdmin() {
    renderProducts();
    renderPriceTable();
    renderImageProductSelect();
    updateDashboard();
    loadInvestorSettings();
}

// ==================== DASHBOARD ====================
function updateDashboard() {
    const totalProducts = productos.length;
    const totalStock = productos.reduce((acc, p) => acc + p.stock, 0);
    const lowStock = productos.filter(p => p.stock < 5).length;
    const avgPrice = totalProducts > 0
        ? Math.round(productos.reduce((acc, p) => acc + p.price, 0) / totalProducts)
        : 0;

    document.getElementById('statTotalProducts').textContent = totalProducts;
    document.getElementById('statTotalStock').textContent = totalStock;
    document.getElementById('statLowStock').textContent = lowStock;
    document.getElementById('statAvgPrice').textContent = `$${avgPrice.toLocaleString('es-CO')}`;
}

// ==================== PRODUCT CRUD ====================
function renderProducts() {
    const productList = document.getElementById('productList');
    if (productos.length === 0) {
        productList.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--blanco); border-radius: 12px;">
                <i class="fas fa-box-open" style="font-size: 3rem; color: var(--gris-borde); margin-bottom: 1rem;"></i>
                <p style="color: var(--gris-texto);">No hay productos registrados</p>
            </div>
        `;
        return;
    }

    productList.innerHTML = productos.map(p => `
        <div class="admin-card">
            <img src="${p.image}" alt="${p.name}">
            <div class="admin-card-content">
                <h3>${p.name}</h3>
                <p>${p.category} | Stock: <strong>${p.stock}</strong></p>
                <p class="price">$${p.price.toLocaleString('es-CO')}</p>
                <div class="admin-card-actions">
                    <button class="btn-edit" onclick="editProduct(${p.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteProduct(${p.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openProductModal() {
    document.getElementById('modalTitle').textContent = 'Nuevo Producto';
    document.getElementById('productSaveBtn').textContent = 'Crear Producto';
    document.getElementById('productForm').reset();
    document.getElementById('editingProductId').value = '';
    document.getElementById('productImagePreview').style.display = 'none';
    document.getElementById('imageHelperText').style.display = 'none';
    document.getElementById('uploadText').textContent = 'Selecciona una imagen';
    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function handleProductSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('editingProductId').value;
    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const price = parseInt(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const category = document.getElementById('productCategory').value;
    const imagePreview = document.getElementById('productImagePreview');
    let image = imagePreview.src || 'https://via.placeholder.com/400x500?text=Sin+Imagen';

    if (!name || !description || isNaN(price) || isNaN(stock) || !category) {
        showToast('⚠️ Completa todos los campos requeridos', 'warning');
        return;
    }

    if (id) {
        // EDIT
        const index = productos.findIndex(p => p.id == id);
        if (index !== -1) {
            productos[index] = {
                ...productos[index],
                name,
                description,
                price,
                stock,
                category,
                image: image && !image.includes('placeholder') ? image : productos[index].image
            };
            showToast('✅ Producto editado correctamente', 'success');
        }
    } else {
        // CREATE
        productos.push({
            id: Math.max(...productos.map(p => p.id), 0) + 1,
            name,
            description,
            price,
            stock,
            category,
            image,
            simbolismo: "Nuevo producto en Shield Sheep.",
            importancia: "Alta"
        });
        showToast('✅ Producto creado exitosamente', 'success');
    }

    saveProductos();
    renderProducts();
    renderPriceTable();
    renderImageProductSelect();
    updateDashboard();
    closeProductModal();
}

function editProduct(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    document.getElementById('modalTitle').textContent = 'Editar Producto';
    document.getElementById('productSaveBtn').textContent = 'Guardar Cambios';
    document.getElementById('editingProductId').value = id;
    document.getElementById('productName').value = producto.name;
    document.getElementById('productDescription').value = producto.description;
    document.getElementById('productPrice').value = producto.price;
    document.getElementById('productStock').value = producto.stock;
    document.getElementById('productCategory').value = producto.category;

    if (producto.image && !producto.image.includes('placeholder')) {
        document.getElementById('productImagePreview').src = producto.image;
        document.getElementById('productImagePreview').style.display = 'block';
        document.getElementById('imageHelperText').style.display = 'inline';
        document.getElementById('uploadText').textContent = 'Cambiar imagen';
    } else {
        document.getElementById('productImagePreview').style.display = 'none';
        document.getElementById('imageHelperText').style.display = 'none';
        document.getElementById('uploadText').textContent = 'Selecciona una imagen';
    }

    document.getElementById('productModal').classList.add('active');
}

function deleteProduct(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    if (confirm(`¿Deseas eliminar "${producto.name}"? Esta acción no se puede deshacer.`)) {
        productos = productos.filter(p => p.id !== id);
        saveProductos();
        renderProducts();
        renderPriceTable();
        renderImageProductSelect();
        updateDashboard();
        showToast('🗑️ Producto eliminado correctamente', 'success');
    }
}

function previewProductImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        document.getElementById('productImagePreview').src = event.target.result;
        document.getElementById('productImagePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// ==================== PRICES ====================
function renderPriceTable() {
    const table = document.getElementById('priceTable');
    if (productos.length === 0) {
        table.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 2rem; color: var(--gris-texto);">No hay productos para actualizar precios</td></tr>';
        return;
    }

    table.innerHTML = productos.map(p => `
        <tr>
            <td><strong>${p.name}</strong></td>
            <td>$${p.price.toLocaleString('es-CO')}</td>
            <td>
                <input type="number" id="price_${p.id}" min="0" value="${p.price}">
            </td>
            <td>
                <button type="button" onclick="updatePrice(${p.id})" style="background: var(--verde); color: var(--blanco);">
                    <i class="fas fa-save"></i> Guardar
                </button>
            </td>
        </tr>
    `).join('');
}

function updatePrice(id) {
    const input = document.getElementById('price_' + id);
    const newPrice = parseInt(input.value);

    if (isNaN(newPrice) || newPrice < 0) {
        showToast('⚠️ Ingresa un precio válido', 'warning');
        return;
    }

    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    producto.price = newPrice;
    saveProductos();
    renderProducts();
    renderPriceTable();
    updateDashboard();
    showToast(`✅ Precio actualizado: $${newPrice.toLocaleString('es-CO')}`, 'success');
}

// ==================== IMAGES ====================
function renderImageProductSelect() {
    const select = document.getElementById('imageProductSelect');
    if (!select) return;
    select.innerHTML = '<option value="">-- Selecciona un producto --</option>' +
        productos.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

function previewImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        document.getElementById('imagePreview').src = event.target.result;
        document.getElementById('imagePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function handleImageUpload(e) {
    e.preventDefault();
    const productId = document.getElementById('imageProductSelect').value;
    const imagePreview = document.getElementById('imagePreview');
    const imageSrc = imagePreview.src;

    if (!productId) {
        showToast('⚠️ Selecciona un producto', 'warning');
        return;
    }

    if (!imageSrc || imageSrc.startsWith('data:,')) {
        showToast('⚠️ Selecciona una imagen válida', 'warning');
        return;
    }

    const producto = productos.find(p => p.id == productId);
    if (!producto) return;

    producto.image = imageSrc;
    saveProductos();
    renderProducts();
    renderPriceTable();
    showToast('✅ Imagen actualizada correctamente', 'success');

    // Reset form
    document.getElementById('imageInput').value = '';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imageProductSelect').value = '';
}

// ==================== SETTINGS (Investor Info) ====================
function loadInvestorSettings() {
    const contactInfo = localStorage.getItem('investorContactInfo') || 'CONTACTANOS A: info@shieldsheep.com';
    const input = document.getElementById('investorContactInput');
    if (input) input.value = contactInfo;
}

function handleSettingsSave(e) {
    e.preventDefault();
    const contactInfo = document.getElementById('investorContactInput').value;
    localStorage.setItem('investorContactInfo', contactInfo);
    showToast('✅ Configuración de inversores guardada', 'success');
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    // If we are on the admin page and NOT on the login hash
    if (window.location.pathname.includes('admin.html') && window.location.hash !== '#login') {
        checkLogin();
    }
});
