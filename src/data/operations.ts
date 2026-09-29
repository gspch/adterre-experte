export type Operation = { id: string; nom: string; lieu: string; cadre: string; faits: string[]; source: string }
export const bilanEngagements = [
  { valeur: '29 000', label: 'soldats engagés', note: 'dont environ 3 600 en opérations extérieures' },
  { valeur: '1 800', label: 'en forces de présence', note: 'Côte d\'Ivoire, Gabon, Djibouti, Émirats arabes unis' },
  { valeur: '6 700', label: 'en forces de souveraineté', note: 'outre-mer' },
]
export const operations: Operation[] = [
  { id: 'sentinelle', nom: 'Sentinelle', lieu: 'Territoire national', cadre: 'Protection des Français, en appui des forces de sécurité intérieure',
    faits: ['Lancée en janvier 2015.', 'Environ 2 200 soldats engagés selon la page missions et opérations de l\'armée de Terre.', 'Unité de base : la section de 27 soldats sous un lieutenant.'],
    source: 'https://www.defense.gouv.fr/operations/territoire-national/operation-sentinelle' },
  { id: 'harpie', nom: 'Harpie', lieu: 'Guyane', cadre: 'Plan interministériel contre l\'orpaillage illégal, sous l\'autorité du préfet',
    faits: ['Depuis février 2008.', 'Environ 270 militaires déployés chaque jour.', 'Environ 1 800 patrouilles par an.', 'Le 9e RIMa participe avec la gendarmerie, la police, l\'ONF, les douanes et le Parc amazonien.'],
    source: 'https://www.terre.defense.gouv.fr/9e-rima/operations-du-9e-regiment-dinfanterie-marine/operation-harpie' },
  { id: 'daman', nom: 'Daman', lieu: 'Sud-Liban', cadre: 'Force intérimaire des Nations unies au Liban (FINUL)',
    faits: ['Présence française au Liban depuis 1978.', 'Environ 700 militaires français.', 'Le contingent forme surtout la Force Commander Reserve, force de réaction rapide sur toute la zone de la FINUL.'],
    source: 'https://www.defense.gouv.fr/operations/proche-moyen-orient/operations-militaires-au-proche-moyen-orient/operation-daman' },
  { id: 'aigle', nom: 'Aigle', lieu: 'Roumanie', cadre: 'OTAN, flanc est',
    faits: ['Bataillon « fer de lance » de la force de réaction rapide de l\'OTAN.'],
    source: 'https://www.defense.gouv.fr/terre/troupes-mises-a-lhonneur-mission-reassurance-flanc-est-0' },
  { id: 'lynx', nom: 'Lynx', lieu: 'Estonie', cadre: 'OTAN, présence avancée renforcée',
    faits: ['Sous-groupement d\'infanterie de montagne basé à Tapa.', 'Prolongée après le 24 février 2022.'],
    source: 'https://www.defense.gouv.fr/terre/troupes-mises-a-lhonneur-mission-reassurance-flanc-est-0' },
]
