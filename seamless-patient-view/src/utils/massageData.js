import formatCase from './formatCase';

export default function massageData(patientArray) {
    return patientArray.map(patient => {
        let resource = patient.resource;
        return {
          name: resource.name[0].text ? resource.name[0].text : formatCase(resource.name[0].given.reverse()),
          gender: resource.gender,
          birthDate: resource.birthDate
        }
    })
}
