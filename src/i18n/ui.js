// Internationalization strings for The Uchinaguchi Project.
// The Uchinaaguchi language itself (headwords, kana, rōmaji) is NEVER translated —
// only the surrounding interface and helper text.

export const defaultLang = 'en';

export const languages = {
  en: 'English',
  ja: '日本語',
  es: 'Español',
  'pt-br': 'Português (BR)',
};

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.dictionary': 'Dictionary',
    'nav.videos': 'Videos',
    'nav.phrasebook': 'Phrasebook',
    'lang.label': 'Language',

    'home.title': 'The Uchinaguchi Project — Your language is waiting for you',
    'home.tagline': 'Your language is waiting for you.',
    'home.ichariba': 'Ichariba choodee — once we meet, we are family.',
    'home.lede': 'Uchinaaguchi, the language of Okinawa, is endangered — but it isn’t gone. The Uchinaguchi Project is a community-rooted home for learning it: an honest, speaker-checked dictionary today, and a real way to learn it together, tomorrow.',
    'home.cta': 'Explore the dictionary',
    'home.s1.title': 'Built honestly, with the community',
    'home.s1.body': 'We’re rebuilding from the ground up. Every word is sourced and attributed, and nothing is marked “correct” until a fluent speaker has checked it — {count} entries and growing, each awaiting community review. The language belongs to the Okinawan community; this project is its steward, not its owner.',
    'home.s2.title': 'Why it matters',
    'home.s2.body': 'UNESCO lists Uchinaaguchi as definitely endangered: most fluent speakers are now elderly. Inspired by the revival of ʻŌlelo Hawaiʻi, we believe an accessible, respectful, diaspora-friendly on-ramp can help a new generation reconnect — with the language, and with each other.',

    'footer.tagline': 'preserving Uchinaaguchi, the language of Okinawa, with and for the community.',

    'dict.title': 'Uchinaaguchi Dictionary',
    'dict.intro': '{count} entries of Uchinaaguchi (Central Okinawan). Type an English word (like “water” or “thank you”) to find the Okinawan equivalent — or search in rōmaji or kana.',
    'dict.notice': 'Work in progress — every entry awaits fluent-speaker review. Many entries are sourced from Wiktionary (CC BY-SA 4.0, via Kaikki.org), and their romanization is best-effort until a fluent speaker checks it. Pronunciations show as “audio coming” until we record real Okinawan voices — we never use synthetic Japanese audio. Corrections from speakers are always welcome.',
    'dict.search': 'Search in English (e.g. “water”), rōmaji, or kana…',
    'dict.englishNote': 'Meanings are shown in English for now; localized definitions are coming.',
    'dict.audioComing': 'audio coming',
    'dict.needsValidation': 'needs validation',
    'dict.words': 'words',
    'dict.matchesFor': 'matches for',
    'dict.noResults': 'No matches. Try a different word.',
    'dict.attribution': 'Dictionary data includes material from Wiktionary, used under CC BY-SA 4.0, extracted via Kaikki.org. The Uchinaguchi Project adds, corrects, and validates entries with the Okinawan community; the language belongs to its speakers.',

    'videos.title': 'Video Library',
    'videos.intro': 'A hand-curated selection of Uchinaaguchi videos — lessons, songs, and culture — from creators across YouTube. Click any video to watch it here.',
    'videos.notice': 'Curating in progress. These were selected from a larger collection and still need a human review pass. Credit belongs to each original creator; we link to and embed their work, never re-host it.',
    'videos.search': 'Search titles or channels…',

    'phrase.title': 'Phrasebook',
    'phrase.intro': 'Everyday Uchinaaguchi phrases — greetings, courtesy, and a few sayings — you can actually use with family and friends. Search, or browse by situation.',
    'phrase.notice': 'A small, honest start. Every phrase here is awaiting review by a fluent speaker, and real Okinawan audio is coming. This list grows as speakers and the community contribute.',
    'phrase.search': 'Search phrases or meanings…',

    'common.all': 'All',
  },

  ja: {
    'nav.home': 'ホーム',
    'nav.dictionary': '辞書',
    'nav.videos': '動画',
    'nav.phrasebook': 'フレーズ集',
    'lang.label': '言語',

    'home.title': 'うちなーぐちプロジェクト ― あなたの言葉が待っています',
    'home.tagline': 'あなたの言葉が、あなたを待っています。',
    'home.ichariba': 'いちゃりばちょーでー ― 一度会えば、みな兄弟。',
    'home.lede': 'うちなーぐち（沖縄の言葉）は消滅の危機にありますが、まだ失われてはいません。うちなーぐちプロジェクトは、地域とともに学ぶための場です。今は話者が確認した誠実な辞書を、そしてこれからは、みんなで学べる本物の学習の場を目指します。',
    'home.cta': '辞書を見る',
    'home.s1.title': '地域とともに、誠実に',
    'home.s1.body': 'ゼロから作り直しています。すべての語には出典を明記し、流暢な話者が確認するまでは「正しい」とはしません ― 現在 {count} 語、さらに増えていきます。一つひとつが地域の確認を待っています。この言葉は沖縄の人々のものであり、本プロジェクトはその管理者であって所有者ではありません。',
    'home.s2.title': 'なぜ大切なのか',
    'home.s2.body': 'ユネスコはうちなーぐちを「危機言語」と位置づけています。流暢な話者の多くは高齢です。ハワイ語（ʻŌlelo Hawaiʻi）の復興に着想を得て、誰もが使いやすく、敬意を込めた、ディアスポラに開かれた入口が、新しい世代を言葉と人々に再びつなぐと信じています。',

    'footer.tagline': 'うちなーぐち（沖縄の言葉）を、地域とともに、地域のために守ります。',

    'dict.title': 'うちなーぐち辞書',
    'dict.intro': 'うちなーぐち（沖縄中央方言）{count} 語。英語の単語（例：「water」「thank you」）を入力すると対応する沖縄語が見つかります。ローマ字や仮名でも検索できます。',
    'dict.notice': '作成中です ― すべての項目が流暢な話者による確認を待っています。多くの項目は Wiktionary（CC BY-SA 4.0、Kaikki.org 経由）を出典としており、ローマ字表記は話者の確認まで暫定です。発音は本物の沖縄の声を録音するまで「audio coming」と表示します ― 合成された日本語音声は使いません。話者の方の訂正をいつでも歓迎します。',
    'dict.search': '英語（例：「water」）、ローマ字、仮名で検索…',
    'dict.englishNote': '意味は現在英語で表示しています。各言語への翻訳は準備中です。',
    'dict.audioComing': '音声は準備中',
    'dict.needsValidation': '確認待ち',
    'dict.words': '語',
    'dict.matchesFor': '件の一致：',
    'dict.noResults': '一致する語がありません。別の語をお試しください。',
    'dict.attribution': '辞書データには Wiktionary の内容（CC BY-SA 4.0、Kaikki.org 経由で抽出）を含みます。うちなーぐちプロジェクトは沖縄の地域とともに項目を追加・修正・確認しています。この言葉は話者のものです。',

    'videos.title': '動画ライブラリ',
    'videos.intro': 'うちなーぐちの動画 ― レッスン、歌、文化 ― を厳選しました。YouTube の各クリエイターによるものです。動画をクリックするとここで再生できます。',
    'videos.notice': '選定作業中です。大きなコレクションから選んでおり、人による見直しが必要です。著作権は各オリジナル制作者に帰属します。私たちはリンクと埋め込みのみで、再ホストはしません。',
    'videos.search': 'タイトルやチャンネルを検索…',

    'phrase.title': 'フレーズ集',
    'phrase.intro': '家族や友人と実際に使える、うちなーぐちの日常フレーズ ― あいさつ、礼儀、ことわざなど。検索するか、場面ごとに見られます。',
    'phrase.notice': '小さく、誠実な出発点です。ここにあるすべてのフレーズは流暢な話者の確認を待っており、本物の沖縄の音声も準備中です。話者と地域の協力でこのリストは増えていきます。',
    'phrase.search': 'フレーズや意味を検索…',

    'common.all': 'すべて',
  },

  es: {
    'nav.home': 'Inicio',
    'nav.dictionary': 'Diccionario',
    'nav.videos': 'Videos',
    'nav.phrasebook': 'Frases',
    'lang.label': 'Idioma',

    'home.title': 'El Proyecto Uchinaguchi — Tu idioma te está esperando',
    'home.tagline': 'Tu idioma te está esperando.',
    'home.ichariba': 'Ichariba choodee — una vez que nos encontramos, somos familia.',
    'home.lede': 'El uchinaaguchi, el idioma de Okinawa, está en peligro de desaparecer, pero no se ha perdido. El Proyecto Uchinaguchi es un hogar comunitario para aprenderlo: hoy, un diccionario honesto y revisado por hablantes; mañana, una forma real de aprenderlo juntos.',
    'home.cta': 'Explorar el diccionario',
    'home.s1.title': 'Hecho con honestidad, junto a la comunidad',
    'home.s1.body': 'Estamos reconstruyéndolo desde cero. Cada palabra tiene su fuente y atribución, y nada se marca como “correcto” hasta que un hablante nativo lo revisa: {count} entradas y creciendo, cada una a la espera de revisión comunitaria. El idioma pertenece a la comunidad okinawense; este proyecto es su custodio, no su dueño.',
    'home.s2.title': 'Por qué importa',
    'home.s2.body': 'La UNESCO clasifica al uchinaaguchi como lengua claramente en peligro: la mayoría de los hablantes fluidos son ya mayores. Inspirados por el renacimiento del hawaiano (ʻŌlelo Hawaiʻi), creemos que un punto de partida accesible, respetuoso y abierto a la diáspora puede ayudar a una nueva generación a reconectarse: con el idioma y entre sí.',

    'footer.tagline': 'preservando el uchinaaguchi, el idioma de Okinawa, con y para la comunidad.',

    'dict.title': 'Diccionario de Uchinaaguchi',
    'dict.intro': '{count} entradas de uchinaaguchi (okinawense central). Escribe una palabra en inglés (como “water” o “thank you”) para encontrar su equivalente okinawense, o busca en rōmaji o kana.',
    'dict.notice': 'En construcción: cada entrada espera la revisión de un hablante nativo. Muchas entradas provienen de Wiktionary (CC BY-SA 4.0, vía Kaikki.org), y su romanización es provisional hasta que un hablante la verifique. Las pronunciaciones aparecen como “audio coming” hasta que grabemos voces okinawenses reales; nunca usamos audio japonés sintético. Las correcciones de hablantes siempre son bienvenidas.',
    'dict.search': 'Busca en inglés (p. ej. “water”), rōmaji o kana…',
    'dict.englishNote': 'Por ahora los significados se muestran en inglés; las definiciones traducidas están en camino.',
    'dict.audioComing': 'audio en camino',
    'dict.needsValidation': 'por validar',
    'dict.words': 'palabras',
    'dict.matchesFor': 'resultados para',
    'dict.noResults': 'Sin resultados. Prueba con otra palabra.',
    'dict.attribution': 'Los datos del diccionario incluyen material de Wiktionary, usado bajo CC BY-SA 4.0, extraído mediante Kaikki.org. El Proyecto Uchinaguchi añade, corrige y valida las entradas junto a la comunidad okinawense; el idioma pertenece a sus hablantes.',

    'videos.title': 'Biblioteca de videos',
    'videos.intro': 'Una selección cuidada de videos en uchinaaguchi —lecciones, canciones y cultura— de creadores de YouTube. Haz clic en cualquier video para verlo aquí.',
    'videos.notice': 'Selección en curso. Estos se eligieron de una colección más amplia y aún necesitan una revisión humana. El crédito es de cada creador original; enlazamos e incrustamos su trabajo, nunca lo realojamos.',
    'videos.search': 'Busca títulos o canales…',

    'phrase.title': 'Frases',
    'phrase.intro': 'Frases cotidianas en uchinaaguchi —saludos, cortesía y algunos dichos— que de verdad puedes usar con familia y amigos. Busca o explora por situación.',
    'phrase.notice': 'Un comienzo pequeño y honesto. Cada frase aquí espera la revisión de un hablante nativo, y el audio okinawense real está en camino. Esta lista crece con el aporte de hablantes y de la comunidad.',
    'phrase.search': 'Busca frases o significados…',

    'common.all': 'Todas',
  },

  'pt-br': {
    'nav.home': 'Início',
    'nav.dictionary': 'Dicionário',
    'nav.videos': 'Vídeos',
    'nav.phrasebook': 'Frases',
    'lang.label': 'Idioma',

    'home.title': 'O Projeto Uchinaguchi — Seu idioma está esperando por você',
    'home.tagline': 'Seu idioma está esperando por você.',
    'home.ichariba': 'Ichariba choodee — quando nos encontramos, somos família.',
    'home.lede': 'O uchinaaguchi, o idioma de Okinawa, está em perigo de desaparecer, mas não se perdeu. O Projeto Uchinaguchi é um espaço comunitário para aprendê-lo: hoje, um dicionário honesto e revisado por falantes; amanhã, um jeito real de aprendê-lo juntos.',
    'home.cta': 'Explorar o dicionário',
    'home.s1.title': 'Feito com honestidade, junto da comunidade',
    'home.s1.body': 'Estamos reconstruindo do zero. Cada palavra tem fonte e atribuição, e nada é marcado como “correto” até que um falante nativo verifique: {count} verbetes e crescendo, cada um aguardando revisão da comunidade. O idioma pertence à comunidade okinawana; este projeto é seu guardião, não seu dono.',
    'home.s2.title': 'Por que isso importa',
    'home.s2.body': 'A UNESCO classifica o uchinaaguchi como claramente em perigo: a maioria dos falantes fluentes já é idosa. Inspirados pelo renascimento do havaiano (ʻŌlelo Hawaiʻi), acreditamos que um ponto de partida acessível, respeitoso e aberto à diáspora pode ajudar uma nova geração a se reconectar: com o idioma e entre si.',

    'footer.tagline': 'preservando o uchinaaguchi, o idioma de Okinawa, com e para a comunidade.',

    'dict.title': 'Dicionário de Uchinaaguchi',
    'dict.intro': '{count} verbetes de uchinaaguchi (okinawano central). Digite uma palavra em inglês (como “water” ou “thank you”) para encontrar o equivalente okinawano, ou pesquise em rōmaji ou kana.',
    'dict.notice': 'Em construção: cada verbete aguarda a revisão de um falante nativo. Muitos verbetes vêm do Wiktionary (CC BY-SA 4.0, via Kaikki.org), e a romanização é provisória até que um falante verifique. As pronúncias aparecem como “audio coming” até gravarmos vozes okinawanas reais; nunca usamos áudio japonês sintético. Correções de falantes são sempre bem-vindas.',
    'dict.search': 'Pesquise em inglês (ex.: “water”), rōmaji ou kana…',
    'dict.englishNote': 'Por enquanto os significados aparecem em inglês; as definições traduzidas estão a caminho.',
    'dict.audioComing': 'áudio a caminho',
    'dict.needsValidation': 'a validar',
    'dict.words': 'palavras',
    'dict.matchesFor': 'resultados para',
    'dict.noResults': 'Nenhum resultado. Tente outra palavra.',
    'dict.attribution': 'Os dados do dicionário incluem material do Wiktionary, usado sob CC BY-SA 4.0, extraído via Kaikki.org. O Projeto Uchinaguchi acrescenta, corrige e valida os verbetes junto da comunidade okinawana; o idioma pertence aos seus falantes.',

    'videos.title': 'Biblioteca de vídeos',
    'videos.intro': 'Uma seleção cuidadosa de vídeos em uchinaaguchi — aulas, músicas e cultura — de criadores do YouTube. Clique em qualquer vídeo para assistir aqui.',
    'videos.notice': 'Seleção em andamento. Estes foram escolhidos de uma coleção maior e ainda precisam de revisão humana. O crédito é de cada criador original; nós apenas vinculamos e incorporamos o trabalho deles, nunca o re-hospedamos.',
    'videos.search': 'Pesquise títulos ou canais…',

    'phrase.title': 'Frases',
    'phrase.intro': 'Frases do dia a dia em uchinaaguchi — saudações, cortesia e alguns ditados — que você pode mesmo usar com família e amigos. Pesquise ou explore por situação.',
    'phrase.notice': 'Um começo pequeno e honesto. Cada frase aqui aguarda a revisão de um falante nativo, e o áudio okinawano real está a caminho. Esta lista cresce com a contribuição de falantes e da comunidade.',
    'phrase.search': 'Pesquise frases ou significados…',

    'common.all': 'Todas',
  },
};

// Category display labels per language (the underlying data values stay English for filtering).
export const categoryLabels = {
  en: {},
  ja: { actions: '動作', animals: '動物', basics: '基本', body: '体', culture: '文化', descriptions: '描写', family: '家族', food: '食べ物', general: '一般', grammar: '文法', greetings: 'あいさつ', nature: '自然', numbers: '数', people: '人', places: '場所', time: '時間' },
  es: { actions: 'acciones', animals: 'animales', basics: 'básico', body: 'cuerpo', culture: 'cultura', descriptions: 'descripciones', family: 'familia', food: 'comida', general: 'general', grammar: 'gramática', greetings: 'saludos', nature: 'naturaleza', numbers: 'números', people: 'personas', places: 'lugares', time: 'tiempo' },
  'pt-br': { actions: 'ações', animals: 'animais', basics: 'básico', body: 'corpo', culture: 'cultura', descriptions: 'descrições', family: 'família', food: 'comida', general: 'geral', grammar: 'gramática', greetings: 'saudações', nature: 'natureza', numbers: 'números', people: 'pessoas', places: 'lugares', time: 'tempo' },
};

export function useTranslations(lang) {
  const dict = ui[lang] || ui[defaultLang];
  return function t(key, vars = {}) {
    let s = dict[key] ?? ui[defaultLang][key] ?? key;
    for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
    return s;
  };
}

export function catLabel(lang, cat) {
  return (categoryLabels[lang] && categoryLabels[lang][cat]) || cat;
}

// Build a path for a given locale: en -> "/path", others -> "/lang/path"
export function localizedPath(lang, path = '') {
  const clean = path.replace(/^\/+/, '');
  if (lang === defaultLang) return '/' + clean;
  return `/${lang}/` + clean;
}
