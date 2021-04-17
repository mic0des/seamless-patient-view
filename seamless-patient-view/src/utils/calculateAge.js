export default function calculateAge(dateString) {
    // new Date("2015-02-06") 
    // return Date.now() - new Date(dateString) 
    return Math.floor((Date.now() - new Date("2015-02-06")) / 31536000000)
}