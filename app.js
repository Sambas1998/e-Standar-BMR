// Data dari data.js
let data = [];

// Fungsi Pencarian Bahan Aktif
function searchByBahan() {
    const keyword = document.getElementById('searchBahan').value.toLowerCase();
    const results = data.filter(item => 
        item.bahan_aktif.toLowerCase().includes(keyword)
    );
    renderTable(results, 'resultBahan', ['jenis_pangan', 'bmr']);
}

// Fungsi Pencarian Jenis Pangan
function searchByPangan() {
    const keyword = document.getElementById('searchPangan').value.toLowerCase();
    const results = data.filter(item => 
        item.jenis_pangan.toLowerCase().includes(keyword)
    );
    renderTable(results, 'resultPangan', ['bahan_aktif', 'bmr']);
}

// Autocomplete untuk Bahan Aktif & Jenis Pangan
function setupAutocomplete(inputId, suggestionId, field) {
    const input = document.getElementById(inputId);
    const suggestionBox = document.getElementById(suggestionId);

    input.addEventListener('input', function() {
        const keyword = this.value.toLowerCase();
        const suggestions = [...new Set(data
            .map(item => item[field])
            .filter(value => value.toLowerCase().includes(keyword))
        ].slice(0, 5);

        suggestionBox.innerHTML = suggestions.map(item => 
            `<div class="suggestion-item">${item}</div>`
        ).join('');

        suggestionBox.style.display = suggestions.length ? 'block' : 'none';
    });

    suggestionBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-item')) {
            input.value = e.target.textContent;
            suggestionBox.style.display = 'none';
        }
    });
}

// Render Tabel dengan Pesan Kosong
function renderTable(data, containerId, columns) {
    const container = document.getElementById(containerId);
    let html = '';

    if (data.length === 0) {
        html = '<div class="no-data">Data tidak ditemukan</div>';
    } else {
        html = `
            <table>
                <thead><tr>${columns.map(col => `<th>${col.replace('_', ' ')}</th>`).join('')}</tr></thead>
                <tbody>
                    ${data.map(item => `
                        <tr>
                            ${columns.map(col => `<td>${item[col]}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    container.innerHTML = html;
}

// Inisialisasi
window.onload = () => {
    setupAutocomplete('searchBahan', 'suggestionsBahan', 'bahan_aktif');
    setupAutocomplete('searchPangan', 'suggestionsPangan', 'jenis_pangan');
};