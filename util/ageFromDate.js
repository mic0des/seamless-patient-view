export default function ageFromDate(date, format) {
    switch (format) {
        case 'year': 
            return Math.floor((Date.now() - new Date(date)) / 31536000000); 
        case 'month': 
            return Math.floor((Date.now() - new Date(date)) / 2629800000);
        default: 
            return date
    }
}