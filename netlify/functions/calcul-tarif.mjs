
const ORS_URL = "https://api.openrouteservice.org";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function rechercherAdresse(adresse, cle) {
  const url = new URL(`${ORS_URL}/geocode/search`);
  url.searchParams.set("text", adresse);
  url.searchParams.set("boundary.country", "FR");
  url.searchParams.set("size", "5");

  const reponse = await fetch(url, {
    headers: { Authorization: cle },
  });

  if (!reponse.ok) {
    throw new Error("Recherche d'adresse indisponible.");
  }

  const donnees = await reponse.json();
  const resultat = donnees.features?.[0];

  if (!resultat) {
    throw new Error(`Adresse introuvable : ${adresse}`);
  }

  return {
    coordonnees: resultat.geometry.coordinates,
    adresse: resultat.properties.label,
  };
}

export default async function handler(request) {
  if (request.method !== "POST") {
    return json({ erreur: "Méthode non autorisée." }, 405);
  }

  const cle = process.env.ORS_API_KEY;

  if (!cle) {
    return json({ erreur: "Service non configuré." }, 503);
  }

  try {
    const donnees = await request.json();
    const depart = donnees.depart?.trim();
    const destination = donnees.destination?.trim();

    if (
      typeof depart !== "string" ||
      typeof destination !== "string" ||
      depart.length < 5 ||
      destination.length < 5 ||
      depart.length > 250 ||
      destination.length > 250
    ) {
      return json({ erreur: "Saisissez deux adresses valides." }, 400);
    }
    if (
  !Array.isArray(donnees.coordonneesDepart) ||
  donnees.coordonneesDepart.length !== 2 ||
  !donnees.coordonneesDepart.every(Number.isFinite) ||
  !Array.isArray(donnees.coordonneesDestination) ||
  donnees.coordonneesDestination.length !== 2 ||
  !donnees.coordonneesDestination.every(Number.isFinite)
) {
  return json(
    { erreur: "Veuillez sélectionner les deux adresses dans les suggestions." },
    400
  );
}

    const origine = {
  coordonnees: donnees.coordonneesDepart,
};

const arrivee = {
  coordonnees: donnees.coordonneesDestination,
};

    const reponse = await fetch(
      `${ORS_URL}/v2/directions/driving-car`,
      {
        method: "POST",
        headers: {
          Authorization: cle,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [
            origine.coordonnees,
            arrivee.coordonnees,
          ],
        }),
      }
    );

    if (!reponse.ok) {
      throw new Error("Impossible de calculer cet itinéraire.");
    }

    const itineraire = await reponse.json();
    const metres = itineraire.routes?.[0]?.summary?.distance;

    if (!Number.isFinite(metres)) {
      throw new Error("Distance indisponible.");
    }

    
const kilometres = Math.floor(metres / 1000);
const tarif = 30 + kilometres * 2.5;


    return json({
      depart: origine.adresse,
      destination: arrivee.adresse,
      kilometres,
      tarif,
    });
  } catch (erreur) {
    console.error("Erreur calcul tarif :", erreur.message);
    return json({
      erreur: "Calcul impossible. Vérifiez les adresses et réessayez.",
    }, 422);
  }
}
