
const ORS_URL = "https://api.openrouteservice.org";

export default async function handler(request) {
  if (request.method !== "GET") {
    return Response.json({ error: "Méthode non autorisée." }, { status: 405 });
  }

  const cle = process.env.ORS_API_KEY;
  if (!cle) {
    return Response.json({ error: "Service non configuré." }, { status: 503 });
  }

  const url = new URL(request.url);
  const recherche = (url.searchParams.get("q") || "").trim();

  if (recherche.length < 3 || recherche.length > 150) {
    return Response.json({ suggestions: [] });
  }

  try {
    const api = new URL(`${ORS_URL}/geocode/search`);
    api.searchParams.set("text", recherche);
    api.searchParams.set("boundary.country", "FR");
    api.searchParams.set("size", "5");

    const reponse = await fetch(api, {
      headers: { Authorization: cle },
    });

    if (!reponse.ok) {
      throw new Error("Recherche indisponible");
    }

    const donnees = await reponse.json();

    const suggestions = (donnees.features || []).map((lieu) => ({
      adresse: lieu.properties.label,
      coordonnees: lieu.geometry.coordinates,
    }));

    return Response.json({ suggestions });
  } catch (error) {
    console.error("Erreur recherche adresses :", error);
    return Response.json(
      { error: "Impossible de rechercher les adresses." },
      { status: 502 }
    );
  }
}
