export interface TypeParcelle {
  titre: string;
  etat: string;
  irrigation: string;
  prixM2: string;
  texte: string[];
}

// La description ne dépend que de l'état (équipée / friche), pas de la surface (350 ou 700 m²).
export const typesParcelle: Record<string, TypeParcelle> = {
  equipee: {
    titre: "Parcelle équipée, prête à cultiver",
    etat: "Sol travaillé et amendé",
    irrigation: "Irriguée (canal + cuve IBC)",
    prixM2: "0,15 €/m²/mois",
    texte: [
      "Sol déjà préparé mécaniquement (labour, rotovator) et amendé : mise en culture immédiate, sans travaux préalables.",
      "Accès à l'eau garanti par le canal d'irrigation et une cuve IBC de 1 000 L intégrée à la cabane.",
      "Cabane de rangement et clôture en place.",
      "Tarif : 0,15 €/m²/mois (soit 630 €/an pour 350 m², 1 260 €/an pour 700 m²).",
    ],
  },
  friche: {
    titre: "Parcelle en friche",
    etat: "Sol non travaillé",
    irrigation: "Irrigation à mettre en place",
    prixM2: "0,10 €/m²/mois",
    texte: [
      "Terrain non encore travaillé, proposé à tarif réduit en contrepartie des travaux de préparation.",
      "Labour, amendement et amenée d'eau organisés collectivement par l'association — chantiers participatifs.",
      "Pour jardiniers motivés souhaitant façonner leur parcelle à moindre coût.",
      "Tarif : 0,10 €/m²/mois (soit 420 €/an pour 350 m², 840 €/an pour 700 m²).",
    ],
  },
};
