import csvRaw from "./parcelles.csv?raw";

export interface Parcelle {
  terrain: string;
  ref: string;
  slug?: string;
  dispo: boolean;
  surface: string;
  etat: string;
  sol: boolean;
  irrigation: boolean;
  amendement: boolean;
  equipement: string;
  prixM2: string;
  prixAnnuel: string;
  lat?: number;
  lon?: number;
}

function splitLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

const oui = (v: string) => v.trim().toLowerCase() === "oui";
const num = (v: string) => (v.trim() === "" ? undefined : parseFloat(v));

const lines = csvRaw.trim().split(/\r?\n/);
const headers = splitLine(lines[0]).map((h) => h.trim());

export const parcelles: Parcelle[] = lines.slice(1).map((line) => {
  const c = splitLine(line);
  const row: Record<string, string> = {};
  headers.forEach((h, i) => (row[h] = (c[i] ?? "").trim()));
  return {
    terrain: row.terrain,
    ref: row.ref,
    slug: row.slug || undefined,
    dispo: row.statut.toLowerCase() === "libre",
    surface: row.surface,
    etat: row.etat,
    sol: oui(row.sol),
    irrigation: oui(row.irrigation),
    amendement: oui(row.amendement),
    equipement: row.equipement,
    prixM2: row.prix_m2,
    prixAnnuel: row.prix_annuel,
    lat: num(row.lat),
    lon: num(row.lon),
  };
});

export function parcellesParTerrain(lettre: string): Parcelle[] {
  return parcelles.filter((p) => p.terrain.toUpperCase() === lettre.toUpperCase());
}
