export type Axe = "alimentaire" | "energie" | "habitat";

export const AXES: Record<Axe, string> = {
  alimentaire: "Résilience alimentaire",
  energie: "Autonomie énergétique",
  habitat: "Construction bioclimatique",
};

export const VALEURS: Record<string, string> = {
  "bio-vivrier": "Bio & vivrier",
  partage: "Partage",
  autonomie: "Autonomie",
  territoire: "Territoire",
};

export type Projet = {
  id: string;
  titre: string;
  axe: Axe;
  valeurs: string[];
  avancement: number;
  montant: number | null;
  debut: Date | null;
  fin: Date | null;
  blog: string | null;
};

export type Sante =
  | "En avance"
  | "Dans les temps"
  | "En retard"
  | "Réalisé"
  | "Non planifié";

export type ProjetCalcule = Projet & {
  statut: "Idée" | "En cours" | "Réalisé";
  attendu: number | null;
  ecart: number | null;
  sante: Sante;
  symbole: string;
};

const parseDate = (s: string): Date | null => {
  const t = s.trim();
  if (!t) return null;
  const d = new Date(t);
  return Number.isNaN(d.getTime()) ? null : d;
};

export function parseProjets(csv: string): Projet[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const cols = lines[0].split(";").map((c) => c.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(";");
    const get = (name: string) => (cells[cols.indexOf(name)] ?? "").trim();
    return {
      id: get("id"),
      titre: get("titre"),
      axe: get("axe") as Axe,
      valeurs: get("valeurs")
        .split("|")
        .map((v) => v.trim())
        .filter(Boolean),
      avancement: Number(get("avancement")) || 0,
      montant: get("montant") ? Number(get("montant")) : null,
      debut: parseDate(get("date_debut")),
      fin: parseDate(get("date_fin_prevue")),
      blog: get("blog") || null,
    };
  });
}

// Seuil d'écart (points de %) au-delà duquel un projet est dit en avance / en retard.
const SEUIL = 10;

export function calculer(p: Projet, today = new Date()): ProjetCalcule {
  const statut =
    p.avancement >= 100 ? "Réalisé" : p.avancement <= 0 ? "Idée" : "En cours";

  let attendu: number | null = null;
  if (p.debut && p.fin && p.fin.getTime() > p.debut.getTime()) {
    const ratio =
      (today.getTime() - p.debut.getTime()) /
      (p.fin.getTime() - p.debut.getTime());
    attendu = Math.round(Math.min(1, Math.max(0, ratio)) * 100);
  }

  let sante: Sante;
  let symbole: string;
  let ecart: number | null = null;

  if (statut === "Réalisé") {
    sante = "Réalisé";
    symbole = "✓";
  } else if (attendu === null) {
    sante = "Non planifié";
    symbole = "—";
  } else {
    ecart = p.avancement - attendu;
    if (ecart >= SEUIL) {
      sante = "En avance";
      symbole = "▲";
    } else if (ecart <= -SEUIL) {
      sante = "En retard";
      symbole = "▼";
    } else {
      sante = "Dans les temps";
      symbole = "●";
    }
  }

  return { ...p, statut, attendu, ecart, sante, symbole };
}

// Tri : projets les plus en retard d'abord ; réalisés / non planifiés en fin de liste.
export function trierParUrgence(projets: ProjetCalcule[]): ProjetCalcule[] {
  const rang = (p: ProjetCalcule) =>
    p.ecart === null ? Number.POSITIVE_INFINITY : p.ecart;
  return [...projets].sort((a, b) => rang(a) - rang(b));
}
