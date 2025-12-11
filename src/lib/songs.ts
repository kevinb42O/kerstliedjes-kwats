import { Song } from './types'

export const CHRISTMAS_SONGS: Omit<Song, 'id' | 'used'>[] = [
  {
    original: "Jingle Bells",
    gibberish: "J'yeng-gull Bih-ell-zz"
  },
  {
    original: "Silent Night",
    gibberish: "Sigh-lahnt Nuh-eyete"
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
    original: "Rudolph the Red-Nosed Reindeer",
    gibberish: "Roo-dolf Thuh Rehd-Nohzd Ray-ndeer"
  },
  {
    original: "Santa Claus Is Coming to Town",
    gibberish: "San-tah Klawz Iz Kuh-ming Tuh Tow-wun"
  },
  {
    original: "All I Want for Christmas Is You",
    gibberish: "Ah-lee Vh'aahnt F'ur Krhys-mah-ziz Dj'yoo-eh"
  },
  {
    original: "Let It Snow! Let It Snow! Let It Snow!",
    gibberish: "Leh-tit Snoh-wuh! Leh-tit Snoh-wuh!"
  },
  {
    original: "The First Noel",
    gibberish: "Thuh F'urst Noh-well"
  },
  {
    original: "O Holy Night",
    gibberish: "Oh Hoh-lee Nuh-eyete"
  },
  {
    original: "White Christmas",
    gibberish: "Vhite Krhys-muss"
  },
  {
    original: "Winter Wonderland",
    gibberish: "Vin-ter Vun-der-lahnd"
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
    original: "It's the Most Wonderful Time of the Year",
    gibberish: "Its Thuh Mohst Vun-der-full Tuh-eem Ov Thuh Yeer"
  },
  {
    original: "Do They Know It's Christmas?",
    gibberish: "Duh Thay Noh Its Krhys-muss?"
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
    original: "Hark! The Herald Angels Sing",
    gibberish: "Hahrk! Thuh Heh-rald Ayn-juls Sing-guh"
  },
  {
    original: "Frosty the Snowman",
    gibberish: "Froh-stee Thuh Snoh-mahn"
  },
  {
    original: "Rockin' Around the Christmas Tree",
    gibberish: "Roh-kin Ah-rownd Thuh Krhys-muss Tree-eh"
  },
  {
    original: "Joy to the World",
    gibberish: "Djoy Tuh Thuh Vorld-duh"
  },
  {
    original: "Silver Bells",
    gibberish: "Sil-ver Beh-ell-zz"
  },
  {
    original: "Have Yourself a Merry Little Christmas",
    gibberish: "Hahv Yur-self Ah Meh-ree Lih-tul Krhys-muss"
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
