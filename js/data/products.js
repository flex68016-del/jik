/* ============================================================
   JIK — Catalogue produits centralisé
   ------------------------------------------------------------
   Les 7 visuels officiels sont mappés à leurs références.
   Ne jamais remplacer un visuel par un stock photo.
   prices : null = non communiqué (ne pas inventer).
   colors : déduits des visuels officiels uniquement.
   ============================================================ */

const JIK_PRODUCTS = [
  {
    id: 'jik-001',
    ref: 'JIK-001',
    name: { fr: 'Yohanes 14:6', en: 'Yohanes 14:6' },
    image: 'assets/products/jik-001-yohanes.jpg',
    alt: {
      fr: "T-shirt gris JIK — dos imprimé « Yesu Nyutɔ nye Mɔ la, Nyatepe la kple Agbe la » en lettres noires, référence Yohanes 14:6",
      en: 'JIK grey t-shirt — back print in black letters "Yesu Nyutɔ nye Mɔ la, Nyatepe la kple Agbe la", reference Yohanes 14:6',
    },
    bibleRef: { fr: 'Jean 14:6', en: 'John 14:6' },
    bibleVerse: {
      fr: "Jésus lui dit : Je suis le chemin, la vérité, et la vie.",
      en: 'Jesus answered, "I am the way and the truth and the life."',
    },
    ewe: 'AME A ƉEKE MATE ŊU AYI FOFO LA GBƆ O, NEGEE TO DZINYE KO',
    concept: {
      fr: "La foi chrétienne exprimée à travers l'identité culturelle togolaise. Le verset de Jean 14:6 en langue éwé, comme un pont entre la foi et les racines.",
      en: 'Christian faith expressed through Togolese cultural identity. The verse of John 14:6 in the Ewe language, as a bridge between faith and roots.',
    },
    category: 'identity',
    colors: [{ name: { fr: 'Gris chiné', en: 'Heather grey' }, hex: '#9C9C9C' }],
    price: null,
  },
  {
    id: 'jik-002',
    ref: 'JIK-002',
    name: { fr: 'All We Need Is Jesus', en: 'All We Need Is Jesus' },
    image: 'assets/products/jik-002-all-we-need.jpg',
    alt: {
      fr: "T-shirt blanc JIK — dos imprimé « ALL WE NEED IS JESUS » en lettres noires avec le mot « Faith » en rouge manuscrit",
      en: 'JIK white t-shirt — back print "ALL WE NEED IS JESUS" in black letters with "Faith" in red script',
    },
    bibleRef: { fr: 'Hébreux 11:6', en: 'Hebrews 11:6' },
    bibleVerse: {
      fr: "Or sans la foi, il est impossible de lui être agréable.",
      en: 'And without faith it is impossible to please God.',
    },
    concept: {
      fr: "Jésus est le fondement de notre foi. Pas une tendance de plus — une fondation.",
      en: 'Jesus is the foundation of our faith. Not another trend — a foundation.',
    },
    category: 'faith',
    colors: [{ name: { fr: 'Blanc', en: 'White' }, hex: '#FFFFFF' }],
    price: null,
  },
  {
    id: 'jik-003',
    ref: 'JIK-003',
    name: { fr: 'Faith Over Fear', en: 'Faith Over Fear' },
    image: 'assets/products/jik-003-faith-over-fear.jpg',
    alt: {
      fr: "T-shirt noir JIK — dos imprimé « FAITH OVER FEAR » en lettres blanches, « Psalm 56:3 » et la phrase « Rendons grâce à Dieu. Chaque jour est une bénédiction. »",
      en: 'JIK black t-shirt — back print "FAITH OVER FEAR" in white letters, "Psalm 56:3" and "Rendons grâce à Dieu. Chaque jour est une bénédiction."',
    },
    bibleRef: { fr: 'Psaume 56:3', en: 'Psalm 56:3' },
    bibleVerse: {
      fr: "Le jour où j'ai peur, c'est en toi que je me confie.",
      en: 'When I am afraid, I put my trust in you.',
    },
    statement: {
      fr: 'Rendons grâce à Dieu. Chaque jour est une bénédiction.',
      en: 'Rendons grâce à Dieu. Chaque jour est une bénédiction.',
    },
    concept: {
      fr: "Choisir la foi plutôt que la peur. Un rappel porté chaque jour : la gratitude avant l'inquiétude.",
      en: 'Choosing faith over fear. A daily reminder: gratitude before worry.',
    },
    category: 'faith',
    colors: [{ name: { fr: 'Noir', en: 'Black' }, hex: '#090909' }],
    price: null,
  },
  {
    id: 'jik-004',
    ref: 'JIK-004',
    name: { fr: 'Pray More Worry Less', en: 'Pray More Worry Less' },
    image: 'assets/products/jik-004-pray-more.jpg',
    alt: {
      fr: "T-shirt noir JIK — dos imprimé « PRAY MORE WORRY LESS » en lettres blanches avec Philippians 4:6",
      en: 'JIK black t-shirt — back print "PRAY MORE WORRY LESS" in white letters with Philippians 4:6',
    },
    bibleRef: { fr: 'Philippiens 4:6', en: 'Philippians 4:6' },
    bibleVerse: {
      fr: "Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.",
      en: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
    },
    concept: {
      fr: "Remplacer l'anxiété par la prière. Un échange simple : ce qui pèse, contre la paix.",
      en: 'Replacing anxiety with prayer. A simple exchange: what weighs you down, for peace.',
    },
    category: 'faith',
    colors: [{ name: { fr: 'Noir', en: 'Black' }, hex: '#090909' }],
    price: null,
  },
  {
    id: 'jik-005',
    ref: 'JIK-005',
    name: { fr: 'Combat Pas Selon La Chair', en: 'Combat Not According To The Flesh' },
    image: 'assets/products/jik-005-combat.jpg',
    alt: {
      fr: "T-shirt gris JIK — dos imprimé d'une gravure de mains tenant une croix et la phrase « Nous ne combattons pas selon la chair. 2 Corinthiens 10:3 »",
      en: 'JIK grey t-shirt — back print with an engraving of hands holding a cross and "Nous ne combattons pas selon la chair. 2 Corinthians 10:3"',
    },
    bibleRef: { fr: '2 Corinthiens 10:3', en: '2 Corinthians 10:3' },
    bibleVerse: {
      fr: "Nous marchons dans la chair, mais nous ne combattons pas selon la chair.",
      en: 'We live in the world, but we do not wage war as the world does.',
    },
    concept: {
      fr: "La nature spirituelle du combat chrétien. Les armes ne sont pas celles du monde.",
      en: 'The spiritual nature of Christian warfare. The weapons are not the ones of this world.',
    },
    category: 'warfare',
    colors: [{ name: { fr: 'Gris chiné', en: 'Heather grey' }, hex: '#9C9C9C' }],
    price: null,
  },
  {
    id: 'jik-006',
    ref: 'JIK-006',
    name: { fr: 'He Left The 99', en: 'He Left The 99' },
    image: 'assets/products/jik-006-left-99.jpg',
    alt: {
      fr: "T-shirt beige JIK — dos imprimé « He left the 99 to find Me » en vert, avec un berger cherchant la brebis perdue, Luke 15:1-7",
      en: 'JIK cream t-shirt — back print "He left the 99 to find Me" in green, with a shepherd searching for the lost sheep, Luke 15:1-7',
    },
    bibleRef: { fr: 'Luc 15:1-7', en: 'Luke 15:1-7' },
    bibleVerse: {
      fr: "Il y aura plus de joie au sujet d'une seule brebis qui se retrouve, qu'au sujet de quatre-vingt-dix-neuf autres qui ne se sont pas égarées.",
      en: 'There will be more rejoicing over one sinner who repents than over ninety-nine righteous persons who do not need to repent.',
    },
    concept: {
      fr: "La parabole de la brebis perdue et l'amour de Dieu : personne n'est trop perdu pour être retrouvé.",
      en: "The parable of the lost sheep and God's love: no one is too lost to be found.",
    },
    category: 'evangelism',
    colors: [{ name: { fr: 'Sable', en: 'Sand' }, hex: '#E8DFC8' }],
    price: null,
  },
  {
    id: 'jik-007',
    ref: 'JIK-007',
    name: { fr: 'Jésus A Tout Payé', en: 'Jesus Paid It All' },
    image: 'assets/products/jik-007-jesus-a-tout-payé.jpg',
    alt: {
      fr: "T-shirt noir JIK — dos imprimé « JÉSUS A TOUT PAYÉ » en lettres blanches avec une liste de dettes acquittées et Romains 6:23",
      en: 'JIK black t-shirt — back print "JÉSUS A TOUT PAYÉ" in white letters with a list of paid debts and Romans 6:23',
    },
    bibleRef: { fr: 'Romains 6:23', en: 'Romans 6:23' },
    bibleVerse: {
      fr: "Car le salaire du péché, c'est la mort ; mais le don gratuit de Dieu, c'est la vie éternelle en Jésus-Christ notre Seigneur.",
      en: 'For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.',
    },
    concept: {
      fr: "Le prix a été payé. La dette a été effacée. En Jésus-Christ, nous recevons un cadeau que nous ne pouvions pas acheter : la vie éternelle. Ce modèle rappelle que notre identité ne se définit plus par nos erreurs, notre passé ou nos condamnations, mais par l'œuvre accomplie à la croix.",
      en: 'The price has been paid. The debt has been erased. In Jesus Christ, we receive a gift we could not buy: eternal life. This model reminds us that our identity is no longer defined by our mistakes, our past, or our condemnations, but by the work accomplished at the cross.',
    },
    category: 'faith',
    colors: [{ name: { fr: 'Noir', en: 'Black' }, hex: '#090909' }],
    price: null,
  },
];

const JIK_CATEGORIES = [
  { id: 'all', label: { fr: 'Tous les produits', en: 'All products' } },
  { id: 'faith', label: { fr: 'Foi', en: 'Faith' } },
  { id: 'identity', label: { fr: 'Identité', en: 'Identity' } },
  { id: 'warfare', label: { fr: 'Combat spirituel', en: 'Spiritual warfare' } },
  { id: 'evangelism', label: { fr: 'Évangélisation', en: 'Evangelism' } },
];
