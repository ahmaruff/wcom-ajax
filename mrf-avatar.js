// Membuat template untuk custom element

const template = document.createElement('template');
template.innerHTML = `
<style>
div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
}

div svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
<div id="avatar-container"></div>`;

// Defaul data SVG yang akan ditampilkan
const defaultSvg= `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" shape-rendering="crispEdges"><metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Pixel Art</dc:title><dc:creator>DiceBear</dc:creator><dc:source xsi:type="dcterms:URI">https://www.figma.com/community/file/1198754108850888330</dc:source><dcterms:license xsi:type="dcterms:URI">https://creativecommons.org/publicdomain/zero/1.0/</dcterms:license><dc:rights>„Pixel Art” (https://www.figma.com/community/file/1198754108850888330) by „DiceBear”, licensed under „CC0 1.0” (https://creativecommons.org/publicdomain/zero/1.0/)</dc:rights></rdf:Description></rdf:RDF></metadata><mask id="viewboxMask"><rect width="16" height="16" rx="0" ry="0" x="0" y="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><rect fill="#111111" width="16" height="16" x="0" y="0" /><path d="M4 2h8v1h1v3h1v2h-1v3h-1v1H9v1h4v1h1v2H2v-2h1v-1h4v-1H4v-1H3V8H2V6h1V3h1V2Z" fill="#a26d3d"/><path d="M4 2h8v1h1v3h1v2h-1v3h-1v1H4v-1H3V8H2V6h1V3h1V2Z" fill="#fff" fill-opacity=".1"/><path d="M7 12h2v1h4v1h1v2H2v-2h1v-1h4v-1Z" fill="#d11141"/><path fill="#000" fill-opacity=".3" d="M7 12h2v1H7z"/><path fill="#fff" d="M4 5h3v3H4zM9 5h3v3H9z"/><path fill="#647b90" d="M10 5h2v2h-2zM5 5h2v2H5z"/><path fill="#fff" fill-opacity=".4" d="M5 5h1v1H5zM6 6h1v1H6zM10 5h1v1h-1zM11 6h1v1h-1z"/><path fill="#fff" fill-opacity=".7" d="M11 5h1v1h-1zM6 5h1v1H6z"/><path d="M7 11h2v-1H7v1ZM7 10V9H6v1h1ZM9 10V9h1v1H9Z" fill="#de0f0d"/><path d="M4 1h8v1h1v1h1v3h-1V4h-1V3H6v1H3v2H2V3h1V2h1V1ZM2 8h1v3h1v1h3v1H2V8ZM12 12H9v1h5V8h-1v3h-1v1Z" fill="#612616"/></g></svg>
`

// Mendefinisikan custom elemen
class MrfAvatar extends HTMLElement {
    static get observedAttributes() {
        return ['size'];
    }

    constructor() {
        super();
        // Membuat shadow DOM dan menambahkan template yang dibuat tadi kedalamnya
        this.attachShadow({mode : 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.updateSize();
        this.setSvg(defaultSvg)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'size') {
            this.updateSize();
        }
    }

    // Memperbarui ukuran elemen berdasarkan atribut 'size'
    updateSize() {
        const size = this.getAttribute('size') || '100';
        const div = this.shadowRoot.querySelector('div');
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
    }

     // Memasukkan data SVG ke dalam div
    setSvg(svgContent) {
        const div = this.shadowRoot.querySelector('#avatar-container');
        div.innerHTML = svgContent;
    }

}

customElements.define('mrf-avatar', MrfAvatar);