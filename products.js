// Centralized Product Data for Shield Sheep
// Managing persistence via localStorage

const initialProducts = [
    {
        id: 1,
        name: "Escudo 'Paz Interior'",
        category: "Protección Espiritual",
        price: 85000,
        stock: 12,
        image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800",
        description: "Un amuleto tallado en madera sagrada que brinda calma y claridad en momentos de caos.",
        simbolismo: "La espiral central representa el viaje hacia el alma, rodeada de pétalos que simbolizan la protección de los ancestros.",
        importancia: "Fundamental para mantener el equilibrio emocional en entornos de alto estrés."
    },
    {
        id: 2,
        name: "Lana 'Velo de Luna'",
        category: "Textiles Místicos",
        price: 45000,
        stock: 25,
        image: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?auto=format&fit=crop&q=80&w=800",
        description: "Fibra natural hilada bajo la luz de la luna llena, ideal para rituales de manifestación.",
        simbolismo: "El brillo plateado evoca la energía femenina y los ciclos constantes de renovación.",
        importancia: "Utilizada en la creación de prendas que protegen el aura durante el sueño."
    },
    {
        id: 3,
        name: "Aceite 'Escudo Solar'",
        category: "Alquimia",
        price: 32000,
        stock: 8,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
        description: "Esencia concentrada de plantas solares para repeler energías negativas externas.",
        simbolismo: "El color dorado intenso representa la fuerza imparable de la vida y la verdad.",
        importancia: "Actúa como una barrera energética instantánea al aplicarse en los puntos de pulso."
    }
];

// Global product state
let productos = JSON.parse(localStorage.getItem('ss_productos')) || initialProducts;

function saveProductos() {
    localStorage.setItem('ss_productos', JSON.stringify(productos));
}

// Function to get products (useful for consistency)
function getProductos() {
    return productos;
}

// Make them globally available
window.saveProductos = saveProductos;
window.getProductos = getProductos;
