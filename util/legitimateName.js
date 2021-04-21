export default function legitimateName(string) {
    return !/[^\x00-\x7F]+/.test(string) ? (!/^[a-zA-Z]+$/.test(string) ? 'Unknown' : string) : string.name
}