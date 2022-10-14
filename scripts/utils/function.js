// mise en place d'une fonction pour recupèrer infos du json
export default async function getData() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  return data;
}
