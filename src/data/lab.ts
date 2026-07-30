/**
 * Content for the lobby direction prototype (/lab).
 *
 * The homepage opens as one locked screen — wordmark, one line of
 * description, and the work itself — then continues past the rail into
 * a short services block and the contact close. Work first, copy last;
 * the argument is made by what is on screen, not by what is written
 * about it.
 *
 * Deliberately a separate content layer from data/hero.ts, data/services.ts
 * and friends: those are written for the shipped "connected growth system"
 * positioning, which this direction removes from the centre.
 *
 * Honesty rules carried over from the rest of the project: no invented
 * clients, no invented metrics, no fabricated testimonials. Projects Ali
 * has actually done are listed by name; the ones whose cover art does not
 * exist yet say so rather than borrowing an image from somewhere else.
 */

export interface LabAsset {
  src: string;
  alt: string;
  /**
   * How this asset wants to be composed. The library is a mix of
   * photographic mockups and portrait poster artefacts, and the two do
   * not survive the same treatment — posters carry their own typography,
   * so bleeding them full-width fights the page's own type.
   *
   * "bleed"  — photographic, wide, safe to run edge to edge.
   * "plate"  — a designed artefact; framed as an object on the ground.
   */
  form: "bleed" | "plate";
}

/** An image bold enough to read inside letterforms. */
export interface ApertureAsset {
  src: string;
  /**
   * Focal point for the masked fill, as a CSS background-position. Type
   * crops hard, so the interesting part of the image has to be aimed at
   * the letterforms deliberately.
   */
  position: string;
}

export interface LabSpread {
  id: string;
  /** Mono discipline label — the system register. */
  label: string;
  /**
   * The word cut out of imagery for this spread. Single words only:
   * at display scale a space is a wrap opportunity, and a wrapped
   * spread title breaks its own mask.
   */
  title: string;
  /** Commercial context. Describes the work, never claims a result. */
  note: string;
  /**
   * How this spread composes its assets. Explicit rather than inferred
   * from the asset forms: each spread is art-directed, and "work out the
   * layout from the data" is exactly how a portfolio ends up looking
   * like a grid again.
   */
  layout: "bleed-plate" | "plates" | "bleeds";
  aperture: ApertureAsset;
  assets: LabAsset[];
}

/**
 * Which field colour a project owns. Colour is identity here, not
 * decoration: the same value marks the project on the lobby mosaic and
 * anywhere else it appears, so a visitor learns the projects by colour
 * before they have read a single name.
 */
export type LabPalette = "orange" | "blue" | "lime" | "violet" | "cream";

export interface LabProject {
  slug: string;
  name: string;
  palette: LabPalette;
  /**
   * Real disciplines only. Empty means "Ali hasn't confirmed these yet" —
   * the card renders without tags rather than guessing at them.
   */
  disciplines: string[];
  year: string;
  /** Portrait cover for the rail. Absent until real cover art exists. */
  cover?: LabAsset;
  /** One line of context, shown on the card. */
  summary?: string;
  sector?: string;
  /** Present only when a case study has actually been built. */
  spreads?: LabSpread[];
}

export interface LabService {
  index: string;
  name: string;
  /** Each service owns a field colour too, carrying the mosaic downward. */
  palette: LabPalette;
  /** The business outcome, in the client's own words — not the deliverable. */
  outcome: string;
  scope: string[];
}

export interface LabContent {
  identity: string;
  /** The single line that says what this is. Nothing more on the lobby. */
  descriptor: string;
  navLinks: { label: string; href: string }[];

  loader: {
    /** The three words that arrive independently, then align on the rule. */
    words: { text: string; palette: LabPalette }[];
    /** Fragments that flash through the letterforms mid-sequence. */
    fragments: string[];
  };

  lobby: {
    /** Mono cue inviting the visitor onward. */
    scrollLabel: string;
    /** Label beside the live "n / total" counter. */
    counterLabel: string;
    /** Card state for projects whose cover art does not exist yet. */
    pendingLabel: string;
    location: string;
    availability: string;
  };

  projects: LabProject[];

  services: {
    label: string;
    heading: string;
    items: LabService[];
  };

  contact: {
    label: string;
    heading: string;
    email: string;
    body: string;
  };
}

export const labContent: LabContent = {
  identity: "Ali Aljardabi",
  descriptor: "Brand, Web & Product Design",
  /* Absolute, not bare fragments: the same header renders on case-study
     pages, where "#services" would resolve to nothing. */
  navLinks: [
    { label: "Work", href: "/lab#work" },
    { label: "Services", href: "/lab#services" },
    { label: "Contact", href: "/lab#contact" },
  ],

  loader: {
    words: [
      { text: "BRAND", palette: "orange" },
      { text: "WEB", palette: "lime" },
      { text: "PRODUCT", palette: "violet" },
    ],
    fragments: [
      "/hero/petrolas-branding.jpg",
      "/work/petrolas/hoarding-wide.jpg",
      "/work/petrolas/booth.jpg",
    ],
  },

  lobby: {
    scrollLabel: "Scroll",
    counterLabel: "selected works",
    pendingLabel: "Cover in production",
    location: "Manama, Bahrain",
    availability: "Taking on new work",
  },

  /*
   * Five entries. Petrolas is complete — cover, metadata, and a full case
   * study. The rest are real engagements Ali named, listed honestly with
   * their cover art still to come: a designed pending state, never a
   * borrowed image or an invented client. Disciplines and sectors stay
   * empty until Ali confirms them; guessing them would be inventing
   * scope on a real client's behalf.
   */
  projects: [
    {
      slug: "petrolas",
      name: "Petrolas",
      palette: "blue",
      disciplines: ["Branding", "Websites"],
      year: "2026",
      sector: "Energy & sustainability",
      summary:
        "A conventional energy business repositioning toward clean energy — given an identity, campaigns, and a digital presence that match where it is actually headed.",
      cover: {
        src: "/work/petrolas/campaign-plastic.jpg",
        alt: "Petrolas campaign poster: Turning plastic into possibility",
        form: "plate",
      },
      spreads: [
        {
          id: "identity",
          label: "01 — Brand identity",
          title: "IDENTITY",
          note: "Mark, colour, type, and voice — built to hold from a business card to a trade-show hall without losing itself.",
          layout: "bleed-plate",
          aperture: { src: "/hero/petrolas-branding.jpg", position: "50% 45%" },
          assets: [
            {
              src: "/work/petrolas/booth.jpg",
              alt: "Petrolas exhibition booth staffed and busy with visitors, the full identity applied at trade-show scale",
              form: "bleed",
            },
            {
              src: "/work/petrolas/brand-guidelines.jpg",
              alt: "Petrolas brand guidelines page detailing the primary, secondary, and accent colour system",
              form: "plate",
            },
          ],
        },
        {
          id: "campaign",
          label: "02 — Campaign",
          title: "CAMPAIGN",
          note: "One argument, carried across every format the business actually buys — not three unrelated adverts.",
          layout: "plates",
          aperture: { src: "/work/petrolas/campaign-plastic.jpg", position: "70% 50%" },
          assets: [
            {
              src: "/work/petrolas/campaign-plastic.jpg",
              alt: "Petrolas campaign poster: Turning plastic into possibility",
              form: "plate",
            },
            {
              src: "/work/petrolas/campaign-waste-fuel.jpg",
              alt: "Petrolas campaign poster: Waste today. Fuel tomorrow.",
              form: "plate",
            },
            {
              src: "/work/petrolas/refinery.jpg",
              alt: "Petrolas campaign poster: Built for a cleaner future, over the refining facility",
              form: "plate",
            },
          ],
        },
        {
          id: "environment",
          label: "03 — Environmental",
          title: "PLACE",
          note: "The identity had to survive outside a browser — on a hoarding, on a fleet, wherever the business physically shows up.",
          layout: "bleeds",
          assets: [
            {
              src: "/work/petrolas/hoarding-wide.jpg",
              alt: "Petrolas construction hoarding with connected circuit-line graphics reading Powering progress. Fueling tomorrow.",
              form: "bleed",
            },
            {
              src: "/work/petrolas/fleet-systems.jpg",
              alt: "Petrolas-branded tanker truck with a connected circuit graphic along its tank",
              form: "bleed",
            },
            {
              src: "/work/petrolas/ev-charging.jpg",
              alt: "Petrolas-branded EV charging station reading From waste to what moves us forward",
              form: "bleed",
            },
          ],
          aperture: { src: "/work/petrolas/hoarding-wide.jpg", position: "38% 50%" },
        },
        {
          id: "digital",
          label: "04 — Digital",
          title: "SCREEN",
          note: "The same language carried into screens — social, site, and a live operations view built in the identity, not beside it.",
          layout: "bleed-plate",
          aperture: { src: "/hero/petrolas-digital.jpg", position: "55% 45%" },
          assets: [
            {
              src: "/work/petrolas/dashboard.jpg",
              alt: "Petrolas operations dashboard interface showing live production and feedstock data",
              form: "bleed",
            },
            {
              src: "/work/petrolas/loop-diagram.jpg",
              alt: "Petrolas diagram showing the loop from plastic waste through refining to clean fuel",
              form: "plate",
            },
          ],
        },
      ],
    },
    { slug: "delivery-point", name: "Delivery Point", palette: "orange", disciplines: [], year: "—" },
    { slug: "kids-island", name: "Kids Island", palette: "lime", disciplines: [], year: "—" },
    { slug: "qobban", name: "Qobban", palette: "violet", disciplines: [], year: "—" },
  ],

  services: {
    label: "What I do",
    heading: "Three things, done properly.",
    items: [
      {
        index: "01",
        name: "Branding",
        palette: "orange",
        outcome: "Look as credible as you already are.",
        scope: [
          "Brand strategy & positioning",
          "Visual identity & logo systems",
          "Art direction",
          "Guidelines & applications",
          "Campaign direction",
        ],
      },
      {
        index: "02",
        name: "Websites",
        palette: "blue",
        outcome: "Turn attention into enquiries.",
        scope: [
          "Website strategy",
          "UX & UI design",
          "Design & build, end to end",
          "Responsive implementation",
          "Launch support",
        ],
      },
      {
        index: "03",
        name: "Web & app products",
        palette: "lime",
        outcome: "Make the product feel effortless to use.",
        scope: [
          "Web app & dashboard design",
          "Digital product interfaces",
          "Prototypes",
          "Design systems",
          "Front-end implementation",
        ],
      },
    ],
  },

  contact: {
    label: "Contact",
    heading: "Tell me what you're building.",
    email: "alialjardabi@gmail.com",
    body: "A first conversation is a conversation — what the business is, where it's going, and whether the way it looks is keeping up.",
  },
};
