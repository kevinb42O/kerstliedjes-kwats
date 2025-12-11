import { Song } from './types'

export const CHRISTMAS_SONGS: Omit<Song, 'id' | 'used'>[] = [
  // Categorie 1: De Klassieke Meezingers (NL)
  {
    original: "Stille Nacht, Heilige Nacht",
    gibberish: "Still hun aacht, haai lieg hun aacht"
  },
  {
    original: "O Denneboom",
    gibberish: "Ode hunne bown"
  },
  {
    original: "Kling klokje klingelingeling",
    gibberish: "Klink lochk juh, klinge ling uh link"
  },
  {
    original: "Midden in de winternacht",
    gibberish: "Mid dunin, duh win turn aagt"
  },
  {
    original: "De herdertjes lagen bij nachte",
    gibberish: "Duh herr durr, tjeslaa gun bye nag tuh"
  },
  {
    original: "Er is een kindeke",
    gibberish: "Eh riezz un, kin duh kuh"
  },
  {
    original: "Gloria in excelsis Deo",
    gibberish: "Gloor riek ja, in nek sell zies day jo"
  },
  {
    original: "Nu zijt wellekome",
    gibberish: "Nuh zijd, well uk oo muhl"
  },
  {
    original: "Komt allen tezamen",
    gibberish: "Komm talleh, ntee zaa muhl"
  },
  {
    original: "Klein klein Jezuke",
    gibberish: "Klaai nkl ayn, jay zuu kuh"
  },
  
  // Categorie 2: Vlaamse Hits & Cultuur
  {
    original: "Een bakske vol met stro",
    gibberish: "Umba kskuh, vollm ets trow"
  },
  {
    original: "Samson en Gert",
    gibberish: "Samm sonn, eng herr t"
  },
  {
    original: "Kerstmis, Kerstmis",
    gibberish: "Kerst miss, kerst miss"
  },
  {
    original: "Kindje Jezus",
    gibberish: "Kinn djee, jey zuus"
  },
  {
    original: "Susa Nina",
    gibberish: "Suu zann ie nah"
  },
  {
    original: "De Drie Koningen",
    gibberish: "Duh driek, oon in gun"
  },
  {
    original: "Nieuwjaarsbrief",
    gibberish: "Niew ya rz brieve"
  },
  {
    original: "Zalig kerstfeest",
    gibberish: "Sah lig kers tveys t"
  },
  {
    original: "Gelukkig nieuwjaar",
    gibberish: "Huh luck ig, knew yar"
  },
  {
    original: "Kerstmarkt",
    gibberish: "Care st marq t"
  },
  
  // Categorie 3: Eten & Drinken
  {
    original: "Aardappelkroketten",
    gibberish: "Aar dap pull, cro keh tun"
  },
  {
    original: "Tomaat garnaal",
    gibberish: "Toe maat, gar nahl"
  },
  {
    original: "Kerststronk",
    gibberish: "Care sts tronk"
  },
  {
    original: "Kalkoen met champignonsaus",
    gibberish: "Call coon, met cham pi non saus"
  },
  {
    original: "Kaasfondue",
    gibberish: "Kazz von dew"
  },
  {
    original: "Gourmetpannetjes",
    gibberish: "Goer meh, pahn net yuhs"
  },
  {
    original: "Champagne",
    gibberish: "Sjam pah nuh"
  },
  {
    original: "Glühwein",
    gibberish: "Gleuw eye n"
  },
  {
    original: "Chocolademousse",
    gibberish: "Show co lah, duh mouss"
  },
  {
    original: "Ijstaart",
    gibberish: "Ice staar t"
  },
  
  // Categorie 4: Internationale Hits
  {
    original: "Jingle Bells",
    gibberish: "Djin kuhlb els"
  },
  {
    original: "We wish you a merry Christmas",
    gibberish: "Wie wies joe, uh mer rie kris mus"
  },
  {
    original: "All I want for Christmas",
    gibberish: "Oll aai wond, fork ris mis"
  },
  {
    original: "Last Christmas",
    gibberish: "Las tkris mis"
  },
  {
    original: "White Christmas",
    gibberish: "Waa iet kris mus"
  },
  {
    original: "Feliz Navidad",
    gibberish: "Fay lies, nah wie dat"
  },
  {
    original: "Driving home for Christmas",
    gibberish: "Dray vin, hoo m fork ris mis"
  },
  {
    original: "Let it snow, let it snow",
    gibberish: "Le ttits no, le ttits no"
  },
  {
    original: "Santa Claus is coming",
    gibberish: "Zen tak loz, is kom ink"
  },
  {
    original: "Merry Christmas everyone",
    gibberish: "Mer riek ris mus, eff riew on"
  },
  
  // Categorie 5: Woorden & Doordenkers
  {
    original: "Piek op de boom",
    gibberish: "Pie koppe boon"
  },
  {
    original: "Sneeuwvlokken",
    gibberish: "Snay uwv lokk un"
  },
  {
    original: "Home Alone",
    gibberish: "Hoe mel own"
  },
  {
    original: "Kerstballen",
    gibberish: "Kers tbal lun"
  },
  {
    original: "Stalletje",
    gibberish: "Stall ut yuh"
  },
  {
    original: "Onder de kerstboom",
    gibberish: "Onn durt, care sts boon"
  },
  {
    original: "Pakjesavond",
    gibberish: "Pak yus, ah vunt"
  },
  {
    original: "Middernachtmis",
    gibberish: "Mid dur, nagt miss"
  },
  {
    original: "Cadeautjes",
    gibberish: "Cah doat yes"
  },
  {
    original: "Kerstman",
    gibberish: "Care st mahn"
  }
]

export function createSongsList(): Song[] {
  return CHRISTMAS_SONGS.map((song, index) => ({
    ...song,
    id: `song-${index}`,
    used: false
  }))
}

export function getRandomUnusedSong(songs: Song[]): Song | null {
  const unused = songs.filter(s => !s.used)
  if (unused.length === 0) return null
  return unused[Math.floor(Math.random() * unused.length)]
}
