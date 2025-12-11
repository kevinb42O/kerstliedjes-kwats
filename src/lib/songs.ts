import { Song } from './types'

export const CHRISTMAS_SONGS: Omit<Song, 'id' | 'used'>[] = [
  {
    original: "Jingle Bells",
    gibberish: "J'yeng-gull Bih-ell-zz"
  },
  {
    original: "Stille Nacht, Heilige Nacht",
    gibberish: "Stih-luh Nahkt, Hay-lih-guh Nahkt"
  },
  {
    original: "O Dennenboom",
    gibberish: "Oh Deh-nun-bohm"
  },
  {
    original: "Rudolph the Red-Nosed Reindeer",
    gibberish: "Roo-dolf Thuh Rehd-Nohzd Ray-ndeer"
  },
  {
    original: "All I Want for Christmas Is You",
    gibberish: "Ah-lee Vh'aahnt F'ur Krhys-mah-ziz Dj'yoo-eh"
  },
  {
    original: "White Christmas",
    gibberish: "Vhite Krhys-muss"
  },
  {
    original: "Feliz Navidad",
    gibberish: "Feh-leez Nah-vee-dahd"
  },
  {
    original: "Last Christmas",
    gibberish: "Lahst Krhys-muss"
  },
  {
    original: "Driving Home for Christmas",
    gibberish: "Druh-ving Hohm F'ur Krhys-muss"
  },
  {
    original: "Santa Claus Is Coming to Town",
    gibberish: "San-tah Klawz Iz Kuh-ming Tuh Tow-wun"
  },
  {
    original: "Rockin' Around the Christmas Tree",
    gibberish: "Roh-kin Ah-rownd Thuh Krhys-muss Tree-eh"
  },
  {
    original: "Do They Know It's Christmas",
    gibberish: "Duh Thay Noh Its Krhys-muss"
  },
  {
    original: "Happy Xmas (War Is Over)",
    gibberish: "Hah-pee Eks-mus Wor Iz Oh-vur"
  },
  {
    original: "The Little Drummer Boy",
    gibberish: "Thuh Lih-tul Drruh-mur Boy"
  },
  {
    original: "Let It Snow! Let It Snow! Let It Snow!",
    gibberish: "Leh-tit Snoh Leh-tit Snoh Leh-tit Snoh"
  },
  {
    original: "Winter Wonderland",
    gibberish: "Vin-ter Vun-der-lahnd"
  },
  {
    original: "Frosty the Snowman",
    gibberish: "Froh-stee Thuh Snoh-mahn"
  },
  {
    original: "Santa Baby",
    gibberish: "San-tah Bay-bee"
  },
  {
    original: "Fairytale of New York",
    gibberish: "Feh-ree-tayl Ov Nyoo Yorrk"
  },
  {
    original: "It's Beginning to Look a Lot Like Christmas",
    gibberish: "Its Bih-gih-ning Tuh Luhk Ah Lot Layk Krhys-muss"
  },
  {
    original: "Deck the Halls",
    gibberish: "Deh-kuh Thah Hawl-zuh"
  },
  {
    original: "We Wish You a Merry Christmas",
    gibberish: "Wih Vish Yuh-ah Meh-ree Krhys-muss"
  },
  {
    original: "O Holy Night",
    gibberish: "Oh Hoh-lee Nuh-eyete"
  },
  {
    original: "Silent Night",
    gibberish: "Sai-lunt Nuh-eyete"
  },
  {
    original: "O Come All Ye Faithful",
    gibberish: "Oh Kuhm Awl Yee Fayth-full"
  },
  {
    original: "Hark! The Herald Angels Sing",
    gibberish: "Hahrk Thuh Heh-rald Ayn-juls Sing-guh"
  },
  {
    original: "Joy to the World",
    gibberish: "Djoy Tuh Thuh Vorld-duh"
  },
  {
    original: "The First Noel",
    gibberish: "Thuh F'urst Noh-well"
  },
  {
    original: "Away in a Manger",
    gibberish: "Ah-way In Ah Mayn-jur"
  },
  {
    original: "Mary's Boy Child",
    gibberish: "Meh-reez Boy Chaild"
  },
  {
    original: "Silver Bells",
    gibberish: "Sil-ver Beh-ell-zz"
  },
  {
    original: "Have Yourself a Merry Little Christmas",
    gibberish: "Hahv Yur-self Ah Meh-ree Lih-tul Krhys-muss"
  },
  {
    original: "Mistletoe and Wine",
    gibberish: "Mis-sul-toh Uhnd Wain"
  },
  {
    original: "De Herdertjes Lagen Bij Nachte",
    gibberish: "Duh Hehr-dert-yuhs Lah-ghun Bay Nahk-tuh"
  },
  {
    original: "Komt Allen Tezamen",
    gibberish: "Komt Ah-lun Tuh-zah-mun"
  },
  {
    original: "Er Is Een Kindeke Geboren Op Aard",
    gibberish: "Ehr Is Uhn Kin-duh-kuh Ghuh-boh-run Op Ahrd"
  },
  {
    original: "O Kom Er Eens Kijken",
    gibberish: "Oh Kom Ehr Uhns Kay-kun"
  },
  {
    original: "Kling Klokje Klingelingeling",
    gibberish: "Kling Klok-yuh Kling-uh-ling-uh-ling"
  },
  {
    original: "'t Is Geboren Het Goddelijk Kind",
    gibberish: "Tis Ghuh-boh-run Het Ghod-duh-luk Kint"
  },
  {
    original: "Adeste Fideles (O Come All Ye Faithful)",
    gibberish: "Ah-des-tuh Fee-deh-lus"
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
