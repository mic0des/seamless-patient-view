export default function formatCase(str) {
    return str.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')
}
