// The API nests pastor data under `pastor`; the components expect it flattened.
function withPastor(church) {
  const pastor = church.pastor ?? {};
  return {
    ...church,
    firstName: pastor.firstName ?? "",
    lastName: pastor.lastName ?? "",
    gender: pastor.gender ?? "",
    pastorEmail: pastor.emails?.[0] ?? "",
  };
}

export function normalizeChurches(churches) {
  return churches.map(withPastor);
}

export function getChurchesList() {
  return fetch("https://api.adventistas.pt/igrejas")
    .then((data) => data.json())
    .then(normalizeChurches);
}

export function getChurch(id) {
  return fetch(`https://api.adventistas.pt/igrejas?igreja=${id}`)
    .then((data) => data.json())
    .then(normalizeChurches);
}
