import { Song, Category } from './types'

// Define categories with their songs
const CATEGORY_DATA = [
  {
    id: 'cat-1',
    name: 'De Absolute Kerstklassiekers',
    songs: [
      {
        original: "All I want for Christmas is you",
        gibberish: "Ollie wan tvoor krust mus is shoe"
      },
      {
        original: "Last Christmas",
        gibberish: "Laa stkris mis"
      },
      {
        original: "Jingle Bells",
        gibberish: "Djin kuhlb els"
      },
      {
        original: "We wish you a merry Christmas",
        gibberish: "Wie wies joe, uh mer rie kris mus"
      },
      {
        original: "Feliz Navidad",
        gibberish: "Fiel ies, nah wie dat"
      },
      {
        original: "Let it snow",
        gibberish: "Leddits nou"
      },
      {
        original: "Santa Claus is coming to town",
        gibberish: "Sen tak loz, is kom in toe touw n"
      },
      {
        original: "Driving home for Christmas",
        gibberish: "Draai vink, hoo mvoor kris mus"
      }
    ]
  },
  {
    id: 'cat-2',
    name: 'Vlaamse Cultuur & TV',
    songs: [
      {
        original: "F.C. De Kampioenen",
        gibberish: "Ef seed uk amp pioe nun"
      },
      {
        original: "Samson en Gert",
        gibberish: "Sah mso neng errt"
      },
      {
        original: "Een bakske vol met stro",
        gibberish: "Emba kskuh, vollm ets trow"
      },
      {
        original: "K3",
        gibberish: "Kaa drie"
      },
      {
        original: "Kabouter Plop",
        gibberish: "Kabb ou turr plopp"
      },
      {
        original: "De Slimste Mens ter Wereld",
        gibberish: "Dus limm stum ens, terr weer ut"
      },
      {
        original: "Thuis",
        gibberish: "Tu ys"
      },
      {
        original: "Het Journaal",
        gibberish: "Hetch oor na al"
      },
      {
        original: "Studio 100",
        gibberish: "Stuu die joo, honn durt"
      }
    ]
  },
  {
    id: 'cat-3',
    name: 'Het Kerstdiner',
    songs: [
      {
        original: "Aardappelkroketten",
        gibberish: "Aar dap pull, crow ket tun"
      },
      {
        original: "Kalkoen met champignons",
        gibberish: "Call coon, met sjam pie njon s"
      },
      {
        original: "Gourmetten",
        gibberish: "Goer met tun"
      },
      {
        original: "Flesje wijn",
        gibberish: "Fless jew ayn"
      },
      {
        original: "Tomatensoep met balletjes",
        gibberish: "Toe maat uns oep, meed bal let juss"
      },
      {
        original: "IJstaart",
        gibberish: "Ice staar t"
      },
      {
        original: "Koffie met taart",
        gibberish: "Coff iem et aar t"
      },
      {
        original: "Een pintje bier",
        gibberish: "Ump in tje bie r"
      }
    ]
  },
  {
    id: 'cat-4',
    name: 'Klassieke NL Kerstliedjes',
    songs: [
      {
        original: "Stille Nacht, Heilige Nacht",
        gibberish: "Still un 8, hy lie gun 8"
      },
      {
        original: "O Denneboom",
        gibberish: "Ooh den nuh bown"
      },
      {
        original: "De herdertjes lagen bij nachte",
        gibberish: "Duh herr durr tjes, laa gun bye nag tuh"
      },
      {
        original: "Kling klokje klingelingeling",
        gibberish: "Klink lochk juh, klinge ling uh link"
      },
      {
        original: "Er is een kindeke geboren",
        gibberish: "Err issun, kin duk uh, guh bo run"
      }
    ]
  },
  {
    id: 'cat-5',
    name: 'Bekende Figuren & Begrippen',
    songs: [
      {
        original: "De Kerstman",
        gibberish: "Duk errs tmah n"
      },
      {
        original: "Home Alone",
        gibberish: "Hoo mah lown"
      },
      {
        original: "Mariah Carey",
        gibberish: "Ma ry ah, care ree"
      },
      {
        original: "Nieuwjaarsbrief",
        gibberish: "Niel jar sbrif"
      },
      {
        original: "Drie Koningen",
        gibberish: "Driek oon ink un"
      },
      {
        original: "Cadeautjes",
        gibberish: "Kaa doot juss"
      },
      {
        original: "Vuurwerk",
        gibberish: "Vuur werr k"
      },
      {
        original: "Koning Filip",
        gibberish: "Koon ink fee lip"
      }
    ]
  }
]

export function createCategories(): Category[] {
  return CATEGORY_DATA.map((cat, catIndex) => ({
    id: cat.id,
    name: cat.name,
    songs: cat.songs.map((song, songIndex) => ({
      id: `${cat.id}-song-${songIndex}`,
      original: song.original,
      gibberish: song.gibberish,
      used: false,
      categoryId: cat.id
    }))
  }))
}

export function createSongsList(): Song[] {
  const categories = createCategories()
  return categories.flatMap(cat => cat.songs)
}

export function getRandomUnusedSong(songs: Song[]): Song | null {
  const unused = songs.filter(s => !s.used)
  if (unused.length === 0) return null
  return unused[Math.floor(Math.random() * unused.length)]
}

export function getRandomUnusedSongFromCategory(categoryId: string, songs: Song[]): Song | null {
  const unused = songs.filter(s => !s.used && s.categoryId === categoryId)
  if (unused.length === 0) return null
  return unused[Math.floor(Math.random() * unused.length)]
}
