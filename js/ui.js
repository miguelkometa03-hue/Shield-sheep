
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    if (type === 'warning') {
        toast.style.background = '#f39c12';
    } else if (type === 'success') {
        toast.style.background = 'var(--verde-acento)';
    }
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
const mostrarToast = showToast;
