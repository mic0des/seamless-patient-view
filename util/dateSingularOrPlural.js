import ageFromDate from './ageFromDate'

export default function dateSinglularOrPlural(age, birthDate) {
    if (age > 0) {
        return age === 1 ? `1 year` : `${age} years`
    } else {
        return ageFromDate(birthDate, 'month') > 0 ? `${ageFromDate(birthDate, 'month')} months` : `1 month`
    }
}