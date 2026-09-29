export type Unite = { nom: string; lieu?: string; note?: string }
export type Brigade = {
  id: string; nom: string; type: 'Interarmes' | 'Spécialisée'; division?: string
  resume: string; unites: Unite[]
}

export const chiffres = [
  { valeur: '128 000', label: 'militaires', note: 'Livret chiffres clés 2025' },
  { valeur: '29 000', label: 'réservistes opérationnels', note: 'Livret chiffres clés 2025' },
  { valeur: '8 200', label: 'personnels civils', note: 'Livret chiffres clés 2025' },
  { valeur: '2', label: 'divisions', note: '1re (Besançon) et 3e (Marseille)' },
  { valeur: '90', label: 'régiments', note: '28 infanterie, 15 cavalerie, 9 artillerie, 9 génie, 6 transmissions, 8 train, 6 matériel, 4 ALAT' },
  { valeur: '16 000', label: 'recrues par an', note: '12 % de femmes, âge moyen 32 ans' },
]

export const divisions = [
  { id: '1re-division', nom: '1re division', siege: 'Besançon', brigades: ['7e BB', '9e BIMa', '27e BIM', 'BFA'] },
  { id: '3e-division', nom: '3e division', siege: 'Marseille', brigades: ['6e BLB', '11e BP', '2e BB'] },
]

export const commandements = [
  'COMLE (Commandement de la Légion étrangère)',
  'COMECIA (Commandement des espaces, centres et camps, Mourmelon, créé le 1er juillet 2018)',
  'COMALAT (Commandement de l\'aviation légère de l\'armée de Terre)',
  'CAST (Commandement des actions spéciales Terre)',
  'PFORM (Pôle formation), qui commande les écoles',
  'SMITer, Pôle recrutement jeunesse',
]

export const brigades: Brigade[] = [
  { id: '2bb', nom: '2e brigade blindée', type: 'Interarmes', division: '3e division', resume: 'Brigade blindée de la 3e division.', unites: [
    { nom: '92e RI', lieu: 'Clermont-Ferrand' }, { nom: 'RMT' }, { nom: '12e RC' }, { nom: '501e RCC' }, { nom: '40e RA' },
    { nom: '16e BCP', lieu: 'Bitche' }, { nom: '13e RG' } ] },
  { id: '6blb', nom: '6e brigade légère blindée', type: 'Interarmes', division: '3e division', resume: 'Brigade légère blindée, avec la Légion étrangère.', unites: [
    { nom: '13e DBLE' }, { nom: '1er REG' }, { nom: '1er REC' }, { nom: '3e RAMa' }, { nom: '1er RS' }, { nom: '21e RIMa' } ] },
  { id: '7bb', nom: '7e brigade blindée', type: 'Interarmes', division: '1re division', resume: 'Brigade blindée de la 1re division.', unites: [
    { nom: '1er RCh' }, { nom: '5e RD' }, { nom: '35e RI', lieu: 'Belfort' }, { nom: '68e RAA' }, { nom: '152e RI', lieu: 'Colmar' },
    { nom: '1er RTir', lieu: 'Épinal' }, { nom: '3e RG' } ] },
  { id: '9bima', nom: '9e brigade d\'infanterie de marine', type: 'Interarmes', division: '1re division', resume: 'Brigade d\'infanterie de marine.', unites: [
    { nom: '1er RIMa' }, { nom: '2e RIMa' }, { nom: '3e RIMa' }, { nom: 'RICM' }, { nom: '126e RI' }, { nom: '11e RAMa' }, { nom: '6e RG' }, { nom: '5e RIAOM' } ] },
  { id: '11bp', nom: '11e brigade parachutiste', type: 'Interarmes', division: '3e division', resume: 'Brigade parachutiste.', unites: [
    { nom: '1er RCP' }, { nom: '2e REP' }, { nom: '3e RPIMa' }, { nom: '8e RPIMa' }, { nom: '1er RHP' }, { nom: '35e RAP' }, { nom: '17e RGP' }, { nom: 'ETAP', lieu: 'Pau', note: 'École des troupes aéroportées' } ] },
  { id: '27bim', nom: '27e brigade d\'infanterie de montagne', type: 'Interarmes', division: '1re division', resume: 'Brigade de montagne.', unites: [
    { nom: '7e BCA' }, { nom: '13e BCA' }, { nom: '27e BCA' }, { nom: '4e RCh', lieu: 'Gap' }, { nom: '93e RAM' }, { nom: '2e REG' }, { nom: 'EMHM', note: 'École militaire de haute montagne (Chamonix, Modane)' } ] },
  { id: 'bfa', nom: 'Brigade franco-allemande', type: 'Interarmes', division: '1re division', resume: 'Brigade binationale.', unites: [
    { nom: '1er RI', lieu: 'Sarrebourg' }, { nom: '3e RH', lieu: 'Metz' }, { nom: 'BCS', lieu: 'Müllheim', note: 'Bataillon de commandement et de soutien' } ] },
  { id: '4bac', nom: '4e brigade d\'aérocombat', type: 'Interarmes', resume: 'Hélicoptères de combat. État-major à Clermont-Ferrand, créée le 5 juillet 2016.', unites: [
    { nom: '1er RHC' }, { nom: '3e RHC' }, { nom: '5e RHC' }, { nom: '9e RSAM', lieu: 'Montauban' } ] },
  { id: 'brce', nom: 'Brigade de renseignement cyber-électronique (BRCE)', type: 'Spécialisée', resume: 'Basée à Strasbourg, créée le 1er août 2024.', unites: [
    { nom: '54e RT' }, { nom: '44e RT', lieu: 'Mutzig' }, { nom: '2e RH' }, { nom: 'CFIM', note: 'avec le 151e RI' } ] },
  { id: 'banc', nom: 'Brigade d\'appui numérique et cyber (BANC)', type: 'Spécialisée', resume: 'Transmissions et cyberdéfense.', unites: [
    { nom: '28e RT', lieu: 'Issoire' }, { nom: '40e RT', lieu: 'Thionville' }, { nom: '41e RT' }, { nom: '48e RT', lieu: 'Agen' },
    { nom: '53e RT', lieu: 'Lunéville' }, { nom: 'Régiment de cyberdéfense', lieu: 'Saint-Jacques-de-la-Lande' } ] },
  { id: 'bgen', nom: 'Brigade du génie (BGEN)', type: 'Spécialisée', resume: 'Génie de l\'armée de Terre.', unites: [
    { nom: '2e RD', note: 'NRBC' }, { nom: '31e RG' }, { nom: '19e RG' }, { nom: '28e GG', lieu: 'Haguenau' }, { nom: '132e RIC', lieu: 'Suippes' } ] },
  { id: 'blog', nom: 'Brigade logistique (BLOG)', type: 'Spécialisée', resume: 'Sous le commandement de la CALT.', unites: [
    { nom: '14e RILP', lieu: 'Toulouse' }, { nom: 'RMED' }, { nom: '519e RT', lieu: 'Lille' }, { nom: '516e RT', lieu: 'Toul' },
    { nom: '515e RT', lieu: 'La Braconne' }, { nom: '511e RT', lieu: 'Auxonne' }, { nom: '503e RT' }, { nom: '121e RT', lieu: 'Montlhéry' } ] },
  { id: 'bmaint', nom: 'Brigade de maintenance (BMAINT)', type: 'Spécialisée', resume: 'Environ 5 400 personnels.', unites: [
    { nom: '2e RMAT' }, { nom: '3e RMAT' }, { nom: '4e RMAT' }, { nom: '6e RMAT' }, { nom: '7e RMAT' }, { nom: '8e RMAT' } ] },
  { id: 'brig19', nom: '19e brigade d\'artillerie', type: 'Spécialisée', resume: 'Artillerie et école des drones.', unites: [
    { nom: '54e RA', lieu: 'Hyères' }, { nom: '61e RA', lieu: 'Chaumont' }, { nom: '1er RA' } ] },
  { id: 'bmsc', nom: 'Brigade des unités militaires de la sécurité civile (BMSC)', type: 'Spécialisée', resume: 'Sécurité civile.', unites: [
    { nom: '1er RIISC' }, { nom: '4e RIISC', lieu: 'Libourne' }, { nom: 'UIISC 5' }, { nom: '7e RIISC' } ] },
  { id: 'comecia', nom: 'COMECIA : centres et camps', type: 'Spécialisée', resume: 'Espaces, centres et camps d\'entraînement.', unites: [
    { nom: '1er RCA' }, { nom: 'CENZUB, 94e RI' }, { nom: '17e GA', lieu: 'Biscarrosse' }, { nom: 'DEE Larzac' }, { nom: 'La Courtine' },
    { nom: 'CENTAC, 1er BCP' }, { nom: 'CAPCIA, 51e RI', lieu: 'Mourmelon, Suippes' }, { nom: 'CNEC, 1er choc' }, { nom: 'CECPC', lieu: 'Mailly' } ] },
  { id: 'cast', nom: 'CAST : actions spéciales Terre', type: 'Spécialisée', resume: 'Forces spéciales terrestres.', unites: [
    { nom: '1er RPIMa' }, { nom: '13e RDP' }, { nom: '4e RHFS', lieu: 'Pau' }, { nom: 'CIAE' } ] },
]

export type Regiment = { sigle: string; nom: string; garnison: string; brigade: string; devise?: string; fait: string }
export const regiments: Regiment[] = [
  { sigle: '1er RI', nom: '1er régiment d\'infanterie', garnison: 'Sarrebourg (Moselle)', brigade: 'BFA', devise: 'Fidèle au passé, exemple pour l\'avenir', fait: 'Héritier des Bandes de Picardie. Équipé du FÉLIN, premier régiment déployé en opérations extérieures avec ce système.' },
  { sigle: '1er RTir', nom: '1er régiment de tirailleurs', garnison: 'Épinal (Vosges)', brigade: '7e BB', devise: 'Toujours le premier', fait: 'Recréé le 1er mai 1994, héritier des tirailleurs nord-africains de 1841. Équipé du VBCI.' },
  { sigle: '16e BCP', nom: '16e bataillon de chasseurs à pied', garnison: 'Bitche (Moselle)', brigade: '2e BB', fait: 'Bataillon depuis 1854, surnommé « bataillon d\'Acier » en 1914. Équipé du VBCI et du FÉLIN.' },
  { sigle: '35e RI', nom: '35e régiment d\'infanterie', garnison: 'Belfort (Territoire de Belfort)', brigade: '7e BB', devise: 'Tous Gaillards, pas d\'trainards', fait: 'Régiment de 1604, implanté à Belfort depuis 1873, VBCI depuis 2008, environ 1 200 militaires.' },
  { sigle: '92e RI', nom: '92e régiment d\'infanterie', garnison: 'Clermont-Ferrand (Puy-de-Dôme)', brigade: '2e BB', devise: 'Debout soldats d\'Auvergne, debout ça va barder !', fait: 'Numéro 92 attribué en 1790. Premier régiment VBCI engagé au Mali en 2013 (opération Serval).' },
  { sigle: '152e RI', nom: '152e régiment d\'infanterie', garnison: 'Colmar (Haut-Rhin)', brigade: '7e BB', devise: 'Ne pas subir !', fait: 'Les « Diables Rouges », surnom donné par les Allemands à l\'Hartmannswillerkopf en 1915. Fourragère de la Légion d\'honneur en 1918.' },
  { sigle: '132e RIC', nom: '132e régiment d\'infanterie cynophile', garnison: 'Suippes (Marne)', brigade: 'BGEN', devise: 'Un contre huit', fait: 'Devenu 132e RIC en 2019, spécialisé dans l\'emploi des chiens militaires.' },
  { sigle: '14e RILP', nom: '14e régiment d\'infanterie et de soutien logistique parachutiste', garnison: 'Toulouse (Haute-Garonne)', brigade: 'BLOG', devise: 'Brave 14, unis comme au front', fait: 'Recréé le 1er juillet 2018, logistique opérationnelle.' },
]
