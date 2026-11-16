/* ————————————————————————————————————————————————
   uncommissioned — site data
   Every page reads from this file. One object per work in WORKS.
   feat:true  → the work gets its own page (work.html?w=ID). Needs a title and imgs.
   otherwise  → it appears as an index card and a map point, and opens as a pop-up.
   Edition 01 records come from the uncommissioned.art artwork map (Nov 2026).
   ———————————————————————————————————————————————— */

const PALETTE = {
  vermilion:{bg:"#ff5a2e",ink:"#111"},
  blue:     {bg:"#2f5bff",ink:"#fff"},
  pink:     {bg:"#f5b3cc",ink:"#111"},
  lime:     {bg:"#cdf35f",ink:"#111"},
  violet:   {bg:"#8a7dff",ink:"#111"},
  green:    {bg:"#16865f",ink:"#fff"},
  bone:     {bg:"#e7e1d1",ink:"#111"},
  oxblood:  {bg:"#8f2a2a",ink:"#fff"},
  sky:      {bg:"#8fd3ff",ink:"#111"},
  stone:    {bg:"#a9a597",ink:"#111"},
  signal:   {bg:"#9fe0c8",ink:"#111"},  /* the project itself: home page and footnotes (set by SIGNALS in site.js) */
};

/* the eight "invisible threads" of Edition 01, each with a colour */
const THREADS = {
  "Soft Resistance":"vermilion","Feminist Body":"pink","Absurd as Method":"lime","You Were Here":"sky",
  "Wild Systems":"green","(Dis)placement":"violet","Bureaucratic Fantasy":"bone","Informal Memorials":"oxblood"
};

const EDITIONS = {
  "01": {
    no:"01", color:"vermilion",
    title:"Playground of the Invisible",
    when:"October 2025", where:"Cities on six continents",
    lede:"A distributed edition about blank spots and erased stories. For thirty days, artists slipped playful, overlooked or quietly defiant gestures into the cracks of everyday life, from a cemetery in Accra to a burnt forest in northern Spain.",
    body:[
      "Each of the three curators set out an area of inquiry and invited artists to answer it in their own city. Works were installed before the first day, without an unveiling and without announced locations. Images were released online, and audiences who found a work in the street added it to the public atlas.",
      "On day thirty each work passed into the public domain. Any sale or patronage went entirely to the artist."
    ],
    people:[["Curators","Sebastián Betancur-Montoya, Mathieu Tremblin, Taylor Bythewood-Porter"],["Programme","Launch, Mexico City, 4 Oct. Glazed Paradise workshop and roundtable, 18th Street Arts Center, Los Angeles, 22 Oct"]],
    notes:[["The works are grouped by eight “invisible threads”, from Soft Resistance to Informal Memorials. The Thread filter in the index below sorts by them.","lede"],["Counted from the mapped works. The 2025 announcement spoke of 41 cities; some artists worked across more than one site.","Cities"]],
    map:"world"
  },
  "02": {
    no:"02", color:"blue",
    title:"Curaçao",
    sub:"An Island Laboratory of Speculative Futures",
    when:"August 2026", where:"Curaçao and Klein Curaçao",
    lede:"The second edition gathered the project onto a single island. It began as a sailing expedition and continued as a residency. Seven artists made eight works in caves, bays, a former plantation house and an offshore lighthouse.",
    body:[
      "Where the first edition was spread thin across the globe, Curaçao asked what happens when the same protocol is concentrated on one island: one coastline, one set of materials, one history of extraction and exchange.",
      "Most of the works were built from what the island already holds: unfired clay, cactus spines, sea stones, egg shell, banana and palm fibre. Several were made to return to the ground."
    ],
    people:[["Curators","Chuman Zhang, Jerry Guo, Sebastián Betancur-Montoya"],["Partner","Initiated by Nōvo Collective, in partnership with SKOR Kòrsou"],["Funders","Mondriaan Fund, Caribbean Culture Fund, CCG, The Netherland-America Foundation"],["Film","uncommissioned: Curaçao, documentary. Trailer, 4:18"]],
    notes:[["The breeze bricks used in Najendra Caldera’s performance were made by Future Organisms during the residency, so two works share one material.","Works"],["Klein Curaçao is uninhabited. Avantia Damberg’s work was installed at its derelict lighthouse.","Islands"]],
    map:"curacao"
  }
};

const CUR = {city:"Curaçao",country:"Curaçao",continent:"North America"};
const WORKS = [
  /* —— Edition 02 —— */
  {id:"02-01",ed:"02",feat:true,...CUR,color:"oxblood",artist:"Cannupa Hanska Luger",from:"Mandan, Hidatsa, Arikara and Lakota; USA",title:"Land Song",year:2026,
   type:"Site-specific, ephemeral installation",materials:"Unfired local clay, banana fibre, recorded audio",site:"Kueba di Indjan, Tera Kora",place:"Curaçao",lat:12.16,lon:-68.90,
   imgs:["05-cannupa-hanska-luger-land-song-2026-kueba-di-indjan-curacao.jpg","06-cannupa-hanska-luger-land-song-2026-kueba-di-indjan-curacao.jpg"],
   note:"tbc:Draft note: the clay was left unfired, so the work is not permanent. Please confirm or rewrite."},
  {id:"02-02",ed:"02",feat:true,...CUR,color:"lime",artist:"Najendra Caldera",from:"Curaçao",title:"Karga (carry, load, charge)",year:2026,
   type:"Performance in two parts",materials:"Cactus (datu) spines, calabash bowl, biomaterial breeze bricks by Future Organisms, cement block",site:"Kueba di Indjan, Tera Kora; Punda, Willemstad",place:"Curaçao",lat:12.106,lon:-68.934,
   imgs:["09-najendra-caldera-karga-2026-curacao.jpg","10-najendra-caldera-karga-2026-curacao.jpg"]},
  {id:"02-03",ed:"02",feat:true,...CUR,color:"green",artist:"Ailsa Anastatia",from:"Curaçao",title:"Terms and Conditions",year:2026,
   type:"Site-responsive installation",materials:"Concrete, welded steel mesh, iron wire, wood, living and existing vegetation, found natural elements",site:"Sint Jorisbaai",place:"Curaçao",lat:12.165,lon:-68.80,
   imgs:["03-ailsa-anastatia-terms-and-conditions-2026-sint-jorisbaai-cur.jpg","04-ailsa-anastatia-terms-and-conditions-2026-sint-jorisbaai-cur.jpg","17-ailsa-anastatia-curacao-2026.jpg"]},
  {id:"02-04",ed:"02",feat:true,...CUR,color:"sky",artist:"Giovanni Abath",from:"Curaçao",title:"Explaining Everything Without Saying Anything…",year:2026,
   type:"Site-responsive installation",materials:"Stainless steel, sea stones",site:"Koredor, John F. Kennedy Boulevard",place:"Curaçao",lat:12.12,lon:-68.96,
   imgs:["11-giovanni-abath-explaining-everything-without-saying-anything.jpg"]},
  {id:"02-05",ed:"02",feat:true,...CUR,color:"blue",artist:"Carolina Aranibar-Fernandez",from:"Bolivia",title:"The Reef of our Future Ancestors",year:2026,
   type:"Site-responsive installation",materials:"tbc:Materials to confirm",site:"Blue Room Cave",place:"Curaçao",lat:12.36,lon:-69.15,
   imgs:["12-carolina-aranibar-fernandez-the-reef-of-our-future-ancestors.jpg","13-carolina-aranibar-fernandez-the-reef-of-our-future-ancestors.jpg","14-carolina-aranibar-fernandez-the-reef-of-our-future-ancestors.jpg","15-carolina-aranibar-fernandez-the-reef-of-our-future-ancestors.jpg"],
   note:"tbc:Draft note: the Blue Room is a sea cave near Westpunt. Please add how visitors reach the work."},
  {id:"02-06",ed:"02",feat:true,...CUR,color:"bone",artist:"Future Organisms",sub:"Pedro Oliveira and Xuedi Chen",from:"Brazil and China",title:"Of Impermanence",year:2026,
   type:"Biomaterial research and breeze bricks (cobogó / 通风砖)",materials:"Locally sourced egg shell, banana fibre, palm fibre, langoustine shell, coffee, clay, natural dyes",site:"Landhuis Brakkeput Ariba, atelier",place:"Curaçao",lat:12.09,lon:-68.85,
   imgs:["01-future-organisms-of-impermanence-2026-landhuis-brakkeput-ari.jpg","02-future-organisms-of-impermanence-2026-landhuis-brakkeput-ari.jpg"],
   note:"Cobogó in Brazil and 通风砖 in southern China are both ventilation bricks for hot climates. The work joins the two traditions in Caribbean materials."},
  {id:"02-07",ed:"02",feat:true,...CUR,color:"violet",artist:"Avantia Damberg",from:"Curaçao",title:"the land’s hexagonised treasures",year:2026,
   type:"Site-specific installation",materials:"Stained-glass suncatcher on chains",site:"Kueba di Indjan, Tera Kora",place:"Curaçao",lat:12.17,lon:-68.89,
   imgs:["07-avantia-damberg-the-lands-hexagonised-treasures-2026-kueba-d.jpg"]},
  {id:"02-08",ed:"02",feat:true,...CUR,color:"pink",artist:"Avantia Damberg",from:"Curaçao",title:"Through Colourful Shades: Inside Out",year:2026,
   type:"Site-specific installation",materials:"Stained glass, stainless steel",site:"Lighthouse, Klein Curaçao",place:"Klein Curaçao",lat:11.99,lon:-68.645,
   imgs:["08-avantia-damberg-through-colourful-shades-inside-out-2026-kle.jpg"]},

  /* —— Edition 01 (50 works) —— */
  {id:"01-01",ed:"01",artist:"Alicia Eggert",title:"Now v. Never",year:2025,site:"Denton, Texas",place:"Denton, Texas, USA",city:"Denton, Texas",country:"USA",continent:"North America",lat:33.2166,lon:-97.133064,medium:["Social Practice", "Conceptual"],thread:["Bureaucratic Fantasy", "Absurd as Method"],color:"bone",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/Alicia_eggert_Thumbnail.jpg.png",src:1},
  {id:"01-02",ed:"01",artist:"Ammar Abo Bakr",title:"Untitled",year:2025,site:"Cairo",place:"Cairo, Egypt",city:"Cairo",country:"Egypt",continent:"Africa",lat:30.0444,lon:31.2357,medium:["Mural", "Mixed Media"],thread:["Wild Systems", "Informal Memorials"],color:"green",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/ammar-abo-bakr-dibbanah.jpg",src:61},
  {id:"01-03",ed:"01",artist:"Arzhel Prioul",title:"Mixing Gender Icon",year:2025,site:"Rennes",place:"Rennes, France",city:"Rennes",country:"France",continent:"Europe",lat:48.1198,lon:-1.6005,medium:["Installation", "Mixed Media"],thread:["(Dis)placement", "Informal Memorials"],color:"violet",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/Arzhel_prioul_thumbnail.jpg.jpg",src:2},
  {id:"01-04",ed:"01",artist:"Azadeh Shladovsky",title:"Sidewalk Sale",year:2025,site:"Los Angeles",place:"Los Angeles, USA",city:"Los Angeles",country:"USA",continent:"North America",lat:34.0522,lon:-118.2437,medium:["Installation", "Social Practice"],thread:["(Dis)placement", "You Were Here"],color:"violet",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/azadeh_shladovsky_thumbnail.JPG",src:3},
  {id:"01-05",ed:"01",feat:true,artist:"Cannupa Hanska Luger",title:"THIS IS NOT OUR LAND, WE ARE ITS PEOPLE",year:2025,site:"Santa Fe, New Mexico",place:"Santa Fe, New Mexico, USA",city:"Santa Fe, New Mexico",country:"USA",continent:"North America",lat:35.687,lon:-105.9378,medium:["Performance"],thread:["You Were Here", "Wild Systems", "Informal Memorials"],color:"oxblood",imgs:["31-cannupa-hanska-luger.jpg"],thumb:"https://uncommissioned-map.vercel.app/artist-photos/cannupa_hanska_luger_thumbnail.jpeg",src:55},
  {id:"01-06",ed:"01",artist:"Catherine Sarah Young",title:"Deep Sea Mining Claw Machine",year:2025,site:"Adelaide",place:"Adelaide, Australia",city:"Adelaide",country:"Australia",continent:"Oceania",lat:-34.9285,lon:138.6007,medium:["Social Practice", "Mixed Media"],thread:["Absurd as Method"],color:"lime",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/catherine_young_thumbnail.png",src:4},
  {id:"01-07",ed:"01",artist:"Chulayarnnon Siriphol",title:"Monument to the Fourth International",year:2025,site:"Bangkok",place:"Bangkok, Thailand",city:"Bangkok",country:"Thailand",continent:"Asia",lat:13.7563,lon:100.5018,medium:["Installation", "Mixed Media"],thread:["(Dis)placement"],color:"violet",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/chulayarnnon_siriphol_thumbnail.jpeg",src:5},
  {id:"01-08",ed:"01",artist:"Danielle Firoozi",title:"Cassius V",year:2025,site:"Mexico City",place:"Mexico City",city:"Mexico City",country:"Mexico",continent:"North America",lat:19.4154,lon:-99.159,medium:["Sculpture", "Mixed Media"],thread:["You Were Here"],color:"sky",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/danielle_firoozi_thumbnail.jpeg",src:7},
  {id:"01-09",ed:"01",artist:"Deana Kolencikova",title:"Room for Chat",year:2025,site:"Strasbourg",place:"Strasbourg, France",city:"Strasbourg",country:"France",continent:"Europe",lat:48.5734,lon:7.7521,medium:["Social Practice"],thread:["Soft Resistance", "Informal Memorials"],color:"vermilion",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/deana_kolencikova_thumbnail.jpeg",src:8},
  {id:"01-10",ed:"01",artist:"Derzu Campos",title:"Untitled",year:2025,site:"Mexico City",place:"Mexico City",city:"Mexico City",country:"Mexico",continent:"North America",lat:19.4326,lon:-99.1332,medium:["Installation", "Mixed Media"],thread:["Wild Systems", "Informal Memorials"],color:"green",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/derzu_campos_thumbnail.JPG",src:10},
  {id:"01-11",ed:"01",artist:"Emmanuel Aggrey Tieku",title:"Cemetery of Belongings-See The Unseen",year:2025,site:"Accra",place:"Accra, Ghana",city:"Accra",country:"Ghana",continent:"Africa",lat:5.6037,lon:-0.187,medium:["Installation"],thread:["Soft Resistance", "(Dis)placement"],color:"vermilion",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/emmanuel-tieku_thumbnail.jpeg",src:62},
  {id:"01-12",ed:"01",artist:"Enno Haar",title:"Urban Rescue",year:2025,site:"Berlin",place:"Berlin, Germany",city:"Berlin",country:"Germany",continent:"Europe",lat:52.52,lon:13.405,medium:["Conceptual"],thread:["Absurd as Method"],color:"lime",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/enno_haar_thumbnail.jpeg",src:11},
  {id:"01-13",ed:"01",feat:true,artist:"Escif",title:"Infinite Still Life",year:2025,site:"Valencia",place:"Valencia, Spain",city:"Valencia",country:"Spain",continent:"Europe",lat:39.4699,lon:-0.3763,medium:["Mural"],thread:["Wild Systems", "Soft Resistance", "Informal Memorials"],color:"vermilion",imgs:["37-escif.jpg"],thumb:"https://uncommissioned-map.vercel.app/artist-photos/escif_thumbnail.jpeg",src:12},
  {id:"01-14",ed:"01",artist:"Fiona Yun-Jui Chang",title:"Note Passing",year:2025,site:"Los Angeles",place:"Los Angeles, USA",city:"Los Angeles",country:"USA",continent:"North America",lat:34.0522,lon:-118.2437,medium:["Social Practice"],thread:["Wild Systems"],color:"green",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/fiona-chang_thumbnail.jpeg",src:15},
  {id:"01-15",ed:"01",artist:"Glazed Paradise",title:"Everything Gold Will Stay",year:2025,site:"Los Angeles",place:"Los Angeles, USA",city:"Los Angeles",country:"USA",continent:"North America",lat:34.0522,lon:-118.2437,medium:["Sculpture", "Mixed Media"],thread:["Absurd as Method", "Bureaucratic Fantasy"],color:"lime",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/glazed-paradise_thumbnail.jpeg",src:65},
  {id:"01-16",ed:"01",artist:"Hana Al-Saadi",title:"Third Skin",year:2025,site:"Doha",place:"Doha, Qatar",city:"Doha",country:"Qatar",continent:"Asia",lat:25.276,lon:51.52,medium:["Installation"],thread:["Feminist Body", "Informal Memorials"],color:"pink",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/han_alsaadi_thumbnail.jpeg",src:16},
  {id:"01-17",ed:"01",artist:"Harmen de Hoop",title:"Public Telephone",year:2025,site:"Obergösgen",place:"Obergösgen, Switzerland",city:"Obergösgen",country:"Switzerland",continent:"Europe",lat:47.3683,lon:7.9104,medium:["Installation"],thread:["Absurd as Method"],color:"lime",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/harmen_de_hoop_thumbnail.jpeg",src:17},
  {id:"01-18",ed:"01",artist:"Heimprofi",title:"Untitled",year:2025,site:"Arnhem",place:"Arnhem, Netherlands",city:"Arnhem",country:"Netherlands",continent:"Europe",lat:51.9801,lon:5.8987,medium:["Installation", "Mixed Media"],thread:["(Dis)placement"],color:"violet",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/heimprofi_thumbnail.jpeg",src:50},
  {id:"01-19",ed:"01",artist:"Iris Buchholz Chocolate",title:"kialuela (kikongo: spiral)",year:2025,site:"Luanda",place:"Luanda, Angola",city:"Luanda",country:"Angola",continent:"Africa",lat:-8.839,lon:13.2894,medium:["Performance"],thread:["Feminist Body"],color:"pink",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/iris_buchholz_chocolate_thumbnail.jpeg",src:46},
  {id:"01-20",ed:"01",artist:"Jason deCaires Taylor",title:"Enshittification",year:2025,site:"Kent",place:"Kent, United Kingdom",city:"Kent",country:"United Kingdom",continent:"Europe",lat:51.3172,lon:0.8919,medium:["Sculpture"],thread:["Soft Resistance", "Informal Memorials"],color:"vermilion",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/jason_taylor_thumbnail.jpeg",src:18},
  {id:"01-21",ed:"01",artist:"Jeffrey Meris",title:"We Once Told Tales By Fire And The Quiet Drop Of Rain",year:2025,site:"New York",place:"New York, USA",city:"New York",country:"USA",continent:"North America",lat:40.7128,lon:-74.006,medium:["Social Practice", "Conceptual"],thread:["(Dis)placement", "Soft Resistance", "Informal Memorials"],color:"violet",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/jeffrey_meris.webp",src:19},
  {id:"01-22",ed:"01",artist:"Jodae",title:"Pieces of Luck",year:2025,site:"Seoul",place:"Seoul, South Korea",city:"Seoul",country:"South Korea",continent:"Asia",lat:37.5665,lon:126.978,medium:["Mural"],thread:["You Were Here"],color:"sky",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/jodae_thumbnail.jpeg",src:21},
  {id:"01-23",ed:"01",artist:"Juan Caicedo",title:"Windward",year:2025,site:"Medellín",place:"Medellín, Colombia",city:"Medellín",country:"Colombia",continent:"South America",lat:6.2476,lon:-75.5658,medium:["Installation", "Mixed Media"],thread:["Soft Resistance"],color:"vermilion",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/juan_caicedo_thumbnail.jpeg",src:58},
  {id:"01-24",ed:"01",artist:"Julian Ties",title:"Cities Under Tension",year:2025,site:"New York",place:"New York, USA",city:"New York",country:"USA",continent:"North America",lat:40.7589,lon:-73.9851,medium:["Installation"],thread:["Wild Systems", "Informal Memorials"],color:"green",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/julian_ties_thumbnail.jpeg",src:22},
  {id:"01-25",ed:"01",feat:true,artist:"Kara Rooney",title:"Todo Estaba Previsto",year:2025,site:"Mexico City",place:"Mexico City",city:"Mexico City",country:"Mexico",continent:"North America",lat:19.4326,lon:-99.1454,medium:["Performance"],thread:["Soft Resistance", "(Dis)placement"],color:"green",imgs:["35-kara-rooney.jpg"],thumb:"https://uncommissioned-map.vercel.app/artist-photos/kara_rooney_thumbnail.jpeg",src:23},
  {id:"01-26",ed:"01",artist:"Kweku Okokroko & Nico Schleicher",title:"The Iron Clad King Sits atop a high horse",year:2025,site:"Vienna",place:"Vienna, Austria",city:"Vienna",country:"Austria",continent:"Europe",lat:48.2003,lon:16.3668,medium:["Performance"],thread:["Soft Resistance"],color:"vermilion",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/kweku-okokroko.jpg",src:25},
  {id:"01-27",ed:"01",feat:true,artist:"Leon Reid IV",title:"Of a Free Will",year:2025,site:"Bedford-Stuyvesant",place:"Brooklyn, New York, USA",city:"New York",country:"USA",continent:"North America",lat:40.6892,lon:-73.9442,medium:["Sculpture"],thread:["Soft Resistance", "Informal Memorials"],color:"pink",imgs:["38-leon-reid-iv.jpg"],thumb:"https://uncommissioned-map.vercel.app/artist-photos/leon_reid_thumbnail.jpeg",src:24},
  {id:"01-28",ed:"01",artist:"Libor Novotný",title:"Stolen Light",year:2025,site:"Ostrava",place:"Ostrava, Czech Republic",city:"Ostrava",country:"Czech Republic",continent:"Europe",lat:49.8209,lon:18.2625,medium:["Installation"],thread:["Bureaucratic Fantasy", "Informal Memorials"],color:"bone",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/libor_novotny_thumbnail.jpeg",src:48},
  {id:"01-29",ed:"01",artist:"Mathieu Tremblin",title:"Inscriptions & Interpretations",year:2025,site:"Strasbourg",place:"Strasbourg, France",city:"Strasbourg",country:"France",continent:"Europe",lat:48.5809,lon:7.7282,medium:["Conceptual"],thread:["You Were Here"],color:"sky",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/matheiu_tremblin_thumbnail.jpeg",src:47},
  {id:"01-30",ed:"01",artist:"Mayela Rodriguez",title:"HyperCare!",year:2025,site:"Pasadena",place:"Pasadena, USA",city:"Pasadena",country:"USA",continent:"North America",lat:34.1478,lon:-118.1445,medium:["Installation", "Social Practice"],thread:["Bureaucratic Fantasy"],color:"bone",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/mayela_rodriguez_thumbnail.jpeg",src:26},
  {id:"01-31",ed:"01",artist:"Mingjing Yu",title:"Enclave Playground",year:2025,site:"Sichuan",place:"Sichuan, China",city:"Sichuan",country:"China",continent:"Asia",lat:28.4594,lon:103.787,medium:["Social Practice"],thread:["(Dis)placement"],color:"violet",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/mingjing_yu_thumbnail.jpeg",src:44},
  {id:"01-32",ed:"01",artist:"Moko Fukuyama & James Beckett",title:"Untitled",year:2025,site:"Brooklyn, New York",place:"Brooklyn, New York, USA",city:"New York",country:"USA",continent:"North America",lat:40.7178,lon:-73.9442,medium:["Installation", "Mixed Media"],thread:["You Were Here"],color:"sky",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/moko_fukuyama.png",src:63},
  {id:"01-33",ed:"01",artist:"Nina Katchadourian",title:"Perfect Shot",year:2025,site:"Brooklyn, New York",place:"Brooklyn, New York, USA",city:"New York",country:"USA",continent:"North America",lat:40.6795,lon:-73.9883,medium:["Installation"],thread:["Absurd as Method"],color:"lime",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/Nina_Thumbnail.jpeg",src:28},
  {id:"01-34",ed:"01",feat:true,artist:"Nomad Studio",title:"Socarrado (Scorched)",year:2025,type:"Land work",materials:"Charred juniper",site:"Parque Natural Sabinares del Arlanza – La Yecla",place:"Castilla y León, Spain",city:"Sabinares del Arlanza, Castilla y León",country:"Spain",continent:"Europe",lat:41.9625,lon:-3.4189,medium:["Installation"],thread:["Bureaucratic Fantasy", "Wild Systems"],color:"stone",imgs:["33-nomad-studio-socarrado-castilla-y-leon.jpg"],thumb:"https://uncommissioned-map.vercel.app/artist-photos/nomad_studio_thumbnail.jpeg",note:"A ring of charred juniper marks the scar left by a wildfire in one of Europe’s oldest juniper forests.",src:53},
  {id:"01-35",ed:"01",artist:"Nung-Hsin Hu",title:"Untitled",year:2025,site:"Taichung",place:"Taichung, Taiwan",city:"Taichung",country:"Taiwan",continent:"Asia",lat:24.1477,lon:120.6736,medium:["Installation"],thread:["Bureaucratic Fantasy", "Informal Memorials"],color:"bone",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/nung-hsinhu_thumbnail.jpg",src:29},
  {id:"01-36",ed:"01",artist:"Pablo Delgado",title:"Telephone Booth Messages",year:2025,site:"Mexico City",place:"Mexico City",city:"Mexico City",country:"Mexico",continent:"North America",lat:19.4326,lon:-99.1332,medium:["Mixed Media"],thread:["Soft Resistance"],color:"vermilion",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/Pablo_Delgado_thumbnail.png",src:60},
  {id:"01-37",ed:"01",artist:"Petra Hudcová",title:"Mapping the Unseen",year:2025,site:"Prague",place:"Prague, Czech Republic",city:"Prague",country:"Czech Republic",continent:"Europe",lat:50.0843,lon:14.4166,medium:["Mixed Media"],thread:["You Were Here"],color:"sky",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/Petra_thumbnail.jpg",src:31},
  {id:"01-38",ed:"01",artist:"Recycle Group",title:"No Way Guide",year:2025,site:"Paris",place:"Paris, France",city:"Paris",country:"France",continent:"Europe",lat:48.8566,lon:2.3522,medium:["Tech-enabled"],thread:["Wild Systems"],color:"green",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/recyclegroup.jpg",src:34},
  {id:"01-39",ed:"01",artist:"Ronald Muchatuta",title:"Borderless Bodies",year:2025,site:"Cape Town",place:"Cape Town, South Africa",city:"Cape Town",country:"South Africa",continent:"Africa",lat:-33.9185,lon:18.4796,medium:["Performance", "Mixed Media"],thread:["(Dis)placement"],color:"violet",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/Roland_thumbnail.png",src:64},
  {id:"01-40",ed:"01",artist:"Sherko Abbas",title:"Phantom Museum",year:2025,site:"Baghdad",place:"Baghdad, Iraq",city:"Baghdad",country:"Iraq",continent:"Asia",lat:33.3152,lon:44.3661,medium:["Video"],thread:["Soft Resistance", "Informal Memorials"],color:"vermilion",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/sherko_abbas_thumbnail.jpeg",src:35},
  {id:"01-41",ed:"01",artist:"Siri Tolander",title:"Måndag 04:28 (Monday 04:28)",year:2025,site:"Stockholm",place:"Stockholm, Sweden",city:"Stockholm",country:"Sweden",continent:"Europe",lat:59.3293,lon:18.0686,medium:["Installation"],thread:["Bureaucratic Fantasy", "Informal Memorials"],color:"bone",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/Siri_tolander_thumbnail.jpg",src:36},
  {id:"01-42",ed:"01",feat:true,artist:"SPURSE et al.",sub:"with EcoArtLab, Processing Collapse and the SUNY New Paltz sculpture programme",title:"Carbon Harvest",year:2025,site:"New Paltz, New York",place:"New Paltz, New York, USA",city:"New Paltz",country:"USA",continent:"North America",lat:41.7406,lon:-74.0833,medium:["Social Practice", "Mural"],thread:["Wild Systems"],color:"lime",imgs:["36-spurse-et-al-carbon-harvest-new-paltz.jpg"],thumb:"https://uncommissioned-map.vercel.app/artist-photos/matthew_friday_thumbnail.jpeg",src:37},
  {id:"01-43",ed:"01",artist:"Stephanie Brown",title:"Swinging Into Reality",year:2025,site:"Atlanta area, Georgia",place:"Atlanta area, Georgia, USA",city:"Atlanta area, Georgia",country:"USA",continent:"North America",lat:33.8059,lon:-84.1557,medium:["Installation"],thread:["Soft Resistance"],color:"vermilion",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/stephanie_brown_thumbnail.jpeg",src:38},
  {id:"01-44",ed:"01",artist:"Strijdom van der Merwe",title:"Shadow Words",year:2025,site:"Stellenbosch",place:"Stellenbosch, South Africa",city:"Stellenbosch",country:"South Africa",continent:"Africa",lat:-33.9321,lon:18.8602,medium:["Installation"],thread:["You Were Here"],color:"sky",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/strijdom_van_der_merwe_thumbnail.jpeg",src:39},
  {id:"01-45",ed:"01",artist:"Valentina Guerrero Marín",title:"Estación Meteorológica de Paso",year:2025,site:"Mexico City",place:"Mexico City",city:"Mexico City",country:"Mexico",continent:"North America",lat:19.4326,lon:-99.1381,medium:["Mixed Media"],thread:["Soft Resistance"],color:"vermilion",imgs:["34-valentina-guerrero-marin.jpg"],thumb:"https://uncommissioned-map.vercel.app/artist-photos/valentina_marin_thumbnail.jpeg",src:54},
  {id:"01-46",ed:"01",artist:"Vhils (Alexandre Farto)",title:"Latency Installation",year:2025,site:"Munich",place:"Munich, Germany",city:"Munich",country:"Germany",continent:"Europe",lat:48.1737,lon:11.5016,medium:["Installation"],thread:["Wild Systems"],color:"green",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/Alexandre_Farto_aka_Vhils_thumbnail.jpeg",src:41},
  {id:"01-47",ed:"01",artist:"Wanzhuo Cheng",title:"/pop/",year:2025,site:"Shenzhen",place:"Shenzhen, China",city:"Shenzhen",country:"China",continent:"Asia",lat:22.5431,lon:114.0579,medium:["Tech-enabled"],thread:["You Were Here"],color:"sky",imgs:["32-wanzhuo-cheng.jpg"],thumb:"https://uncommissioned-map.vercel.app/artist-photos/wanzhuo_cheng_thumbnail.jpg",src:42},
  {id:"01-48",ed:"01",artist:"Yannos Majestikos",title:"Yé",year:2025,site:"Paris",place:"Paris, France",city:"Paris",country:"France",continent:"Europe",lat:48.8619,lon:2.3465,medium:["Performance"],thread:["(Dis)placement", "Absurd as Method"],color:"violet",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/yannos_majestikos_thumbnail.jpeg",src:43},
  {id:"01-49",ed:"01",artist:"Yufeng Deng",title:"Your",year:2025,site:"Beijing",place:"Beijing, China",city:"Beijing",country:"China",continent:"Asia",lat:39.7486,lon:116.5629,medium:["Social Practice"],thread:["Soft Resistance"],color:"vermilion",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/yufeng_deng_thumbnail.jpeg",src:9},
  {id:"01-50",ed:"01",artist:"Zohreh Solati",title:"How We Became Us – A Feminist Intervention in Public Space",year:2025,site:"Tehran",place:"Tehran, Iran",city:"Tehran",country:"Iran",continent:"Asia",lat:35.6892,lon:51.389,medium:["Performance"],thread:["Feminist Body", "Soft Resistance"],color:"pink",imgs:[],thumb:"https://uncommissioned-map.vercel.app/artist-photos/zohreh_solati_thumbnail.png",src:45}

];

const TEXTS = [
  {outlet:"Artnet News",title:"Inside Cannupa Hanska Luger’s Cave of Clay and Sound",by:"",ed:"02",date:"Oct 2026",url:"https://news.artnet.com/art-world/cannupa-hanska-luger-curacao-uncommissioned-2818058",color:"bone",work:"02-01"},
  {outlet:"Elephant",title:"“A Story Without Stakes Stands to Bore”: uncommissioned in Curaçao",by:"Vittoria Benzine",ed:"02",date:"Oct 2026",url:"https://elephant.art/a-story-without-stakes-stands-to-bore-uncommissioned-in-curacao/",color:"violet"},
  {outlet:"Designboom",title:"Nomad Studio’s charred juniper ring marks the scar of a wildfire in northern Spain",by:"",ed:"01",date:"Dec 2025",url:"https://www.designboom.com/architecture/nomad-studio-charred-juniper-ring-scar-wildfire-northern-spain-12-29-2025/",color:"stone",artist:"Nomad Studio"},
  {outlet:"Opinion 51",title:"On how uncommissioned redefines the role of art",by:"Gabriela Andrade Gorab",kind:"Essay",ed:"01",date:"Oct 2025",url:"https://www.opinion51.com/gabriela-gorab-2510-era-arte/",color:"lime"},
  {outlet:"Colossal",title:"This October, a Global Public Art Project Turns 35 Cities into Playgrounds",by:"Grace Ebert",ed:"01",date:"Oct 2025",url:"https://www.thisiscolossal.com/2025/10/novo-collective-uncommissioned/",color:"vermilion",
   quote:"Reimagining how art enters public space and how communities encounter it outside the walls of galleries or institutions."},
  {outlet:"Brooklyn Street Art",title:"Leon Reid’s “Of a Free Will”",by:"",ed:"01",date:"Oct 2025",url:"https://www.brooklynstreetart.com/2025/10/09/leon-reid-of-a-free-will/",color:"pink",artist:"Leon Reid IV"},
  {outlet:"Milenio",title:"Nōvo Collective brings a global public art movement to Mexico",by:"",ed:"01",date:"Oct 2025",url:"https://amp.milenio.com/cultura/vo-collective-trae-mexico-movimiento-global-arte-publico",color:"sky"},
  {outlet:"GameScenes",title:"Catherine Sarah Young’s Deep Sea Mining Claw Machine",by:"",ed:"01",date:"2025",url:"https://www.gamescenes.org/even-catherine-sarah-young-deep-sea-mining-claw-machine/",color:"green",artist:"Catherine Sarah Young"},
];
/* link texts to works by artist (Edition 01 ids are generated alphabetically) */
TEXTS.forEach(x => { if (x.artist && !x.work){ const w = WORKS.find(w => w.ed === "01" && w.artist.startsWith(x.artist.split(" ")[0])); if (w) x.work = w.id; } });

/* support, recorded per edition. Edition 02 from the Curaçao 2026 report. */
const SUPPORTERS = [
  {ed:"02", title:"Edition 02, Curaçao, 2026", rows:[
    ["Funded by", ["Mondriaan Fund", "Caribbean Culture Fund", "CCG", "The Netherland-America Foundation"]],
    ["In partnership with", ["SKOR Kòrsou"]],
    ["Community partners", ["Farm to Table", "Bed & Bike", "Astro Clay Shop"]]
  ]},
  {ed:"01", title:"Edition 01, Playground of the Invisible, 2025", rows:[
    ["Partners and venues", ["Qatar Museums", "UC Berkeley", "MUCA, Museum of Urban and Contemporary Art", "Kunstlabor", "Artists’ Container", "18th Street Arts Center", "Third Born"]]
  ]}
];

/* ——— figures, computed from WORKS ——— */
const uniq = a => [...new Set(a)];
function figures(ed){
  const ws = ed ? WORKS.filter(w => w.ed === ed) : WORKS;
  const artists = uniq(ws.map(w => w.artist.replace(/ \(.*\)$/, "")));
  return {works:ws.length, artists:artists.length, cities:uniq(ws.map(w => w.city)).length, countries:uniq(ws.map(w => w.country)).length, continents:uniq(ws.map(w => w.continent)).length};
}
