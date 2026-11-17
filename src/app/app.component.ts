import { Component } from '@angular/core';

type Lang = 'fr' | 'en';
type Localized = Record<Lang, string>;

interface Certification {
  name: Localized;
  domain: string;
  image: string;
  /** Plusieurs logos côte à côte. */
  logos?: { src: string; label: string }[];
  kind: 'cert' | 'xp';
}

interface Client {
  name: string;
  logo: string;
}

interface Testimonial {
  name: string;
  role: string;
  source: string;
  sourceUrl: string;
  text: Record<Lang, string[]>;
}

const LANG_KEY = 'guillard-corporation-lang';

/** Début de carrière : janvier 2016. Les années d'expérience se calculent à partir de cette date. */
const CAREER_START = new Date(2016, 0, 1);

function yearsSince(start: Date, now = new Date()): number {
  let years = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())) {
    years--;
  }
  return years;
}

const XP_YEARS = yearsSince(CAREER_START);

/** Libellés de l'interface, en français et en anglais. */
const UI = {
  fr: {
    navExpertise: 'Expertise',
    navReferences: 'Références',
    navContact: 'Contact',
    homeLabel: 'Guillard Corporation – accueil',
    eyebrow: 'Développeur Fullstack Java · Angular · React · Vue',
    title: 'Propulsez vos projets IT au niveau supérieur.',
    lead: 'Des solutions fiables et performantes, conçues avec exigence.',
    cta: 'Me contacter',
    navAbout: 'À propos',
    about: 'À propos',
    aboutText: [
      "Diplômé d'un Master Informatique de l'UPMC (Sorbonne Université), je conçois et développe des applications web depuis 2016 pour des grands comptes de secteurs variés.",
      "Spécialisé en Java/Spring côté back-end et TypeScript côté front-end, j'interviens de bout en bout : de l'analyse du besoin à la mise en production, en passant par les tests et l'accompagnement des équipes."
    ],
    aboutFacts: [
      { value: `${XP_YEARS} ans`, label: "d'expérience en développement fullstack" },
      { value: '6 clients', label: 'satisfaits' },
      { value: '11 projets', label: 'livrés avec succès' }
    ],
    expertise: 'Expertise',
    trusted: "Ils m'ont fait confiance",
    translated: '',
    contactTitle: 'Parlons de votre projet',
    contactSub: 'Une mission, une question ? Écrivez-moi.',
    switchLabel: 'Switch to English',
    verify: 'Vérifier sur Credly',
    footerCompany: 'Guillard Corporation, au capital de 130 500 €',
    legal: 'Mentions légales',
    close: 'Fermer'
  },
  en: {
    navExpertise: 'Expertise',
    navReferences: 'References',
    navContact: 'Contact',
    homeLabel: 'Guillard Corporation – home',
    eyebrow: 'Fullstack Developer · Java · Angular · React · Vue',
    title: 'Take your IT projects to the next level.',
    lead: 'Reliable, high-performance solutions, built to demanding standards.',
    cta: 'Get in touch',
    navAbout: 'About',
    about: 'About',
    aboutText: [
      'With a Master’s degree in Computer Science from UPMC (Sorbonne University), I have been designing and building web applications since 2016 for major companies across a wide range of industries.',
      'Specialising in Java/Spring on the back end and TypeScript on the front end, I work end to end: from requirements analysis to production, including testing and supporting the teams.'
    ],
    aboutFacts: [
      { value: `${XP_YEARS} years`, label: 'of fullstack development experience' },
      { value: '6 clients', label: 'satisfied' },
      { value: '11 projects', label: 'successfully delivered' }
    ],
    expertise: 'Expertise',
    trusted: 'They trusted me',
    translated: 'Translated from French',
    contactTitle: "Let's talk about your project",
    contactSub: 'A mission, a question? Drop me a line.',
    switchLabel: 'Passer en français',
    verify: 'Verify on Credly',
    footerCompany: 'Guillard Corporation, with a share capital of €130,500',
    legal: 'Legal notice',
    close: 'Close'
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly email = 'camille@guillardcorp.com';
  readonly linkedin = 'https://www.linkedin.com/in/camille-guillard-b1071b1b8/';
  readonly credly = 'https://www.credly.com/users/camille-guillard/badges';
  readonly year = new Date().getFullYear();
  legalOpen = false;

  /** Mentions légales obligatoires (LCEN, art. 6). Source : Annuaire des Entreprises. */
  readonly company = {
    name: 'GUILLARD CORPORATION',
    form: 'SAS (société par actions simplifiée)',
    capital: '130 500 €',
    address: '124 Grande Rue, 93250 Villemomble, France',
    rcs: 'RCS Bobigny 103 495 289',
    vat: 'FR34 103 495 289',
    director: 'Camille Guillard, Président',
    host: 'Amazon Web Services EMEA SARL, 38 avenue John F. Kennedy, L-1855 Luxembourg'
  };

  lang: Lang = this.initialLang();

  get t() {
    return UI[this.lang];
  }

  readonly certifications: Certification[] = [
    { name: { fr: 'Oracle Certified Professional', en: 'Oracle Certified Professional' }, domain: 'Java', image: 'assets/images/certifications/Oracle_Professional_Badge__1_-removebg-preview.png', kind: 'cert' },
    { name: { fr: 'Spring Certified Professional', en: 'Spring Certified Professional' }, domain: 'Spring', image: 'assets/images/certifications/broadcom-spring-certified-professional-2024.png', kind: 'cert' },
    { name: { fr: 'Développement front-end', en: 'Front-end development' }, domain: 'Angular · React · Vue', image: 'assets/images/logos/angular-trim.png', logos: [{ src: 'assets/images/logos/react.svg', label: 'React' }, { src: 'assets/images/logos/angular-trim.png', label: 'Angular' }, { src: 'assets/images/logos/vue.svg', label: 'Vue' }], kind: 'xp' },
    { name: { fr: 'AWS Certified', en: 'AWS Certified' }, domain: 'AWS', image: 'assets/images/certifications/aws-certified-cloud-practitioner.png', kind: 'cert' },
    { name: { fr: 'Professional Scrum Master', en: 'Professional Scrum Master' }, domain: 'Scrum', image: 'assets/images/certifications/BADGES_FINAL_PSM-I_600-hover.png', kind: 'cert' },
    { name: { fr: "Développement augmenté par l'IA", en: 'AI-augmented development' }, domain: 'Claude Code', image: 'assets/images/logos/claude.svg', kind: 'xp' }
  ];

  readonly clients: Client[] = [
    { name: 'Accor', logo: 'assets/images/clients/logo_accor.png' },
    { name: 'BNP Paribas', logo: 'assets/images/clients/logo_bnp.png' },
    { name: 'RTE', logo: 'assets/images/clients/logo_rte.png' },
    { name: 'UGC', logo: 'assets/images/clients/logo_ugc.png' },
    { name: 'Société Générale', logo: 'assets/images/clients/logo_sg.svg' },
    { name: 'Disney', logo: 'assets/images/clients/logo_disney.svg' }
  ];

  readonly testimonials: Testimonial[] = [
    {
      name: 'Meriem A.',
      role: 'Technical Lead / Chapter Lead Development – Accor',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/in/camille-guillard-b1071b1b8/details/recommendations/',
      text: {
        fr: [
          "J'ai eu beaucoup de plaisir à travailler avec Camille. C'est un développeur talentueux, professionnel et rigoureux, doté d'une excellente expertise technique.",
          'Un développeur de confiance que je recommande sans hésitation !'
        ],
        en: [
          'I really enjoyed working with Camille. He is a talented, professional and rigorous developer with excellent technical expertise.',
          'A trustworthy developer whom I recommend without hesitation!'
        ]
      }
    },
    {
      name: 'Oumar B.',
      role: 'Tech Lead / Senior Backend & Cloud Engineer – Accor',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/in/camille-guillard-b1071b1b8/details/recommendations/',
      text: {
        fr: [
          "Merci Camille pour ta belle prestation chez Accor. Ton apport à l'équipe a été fructueux et ton efficacité sera certainement utile à n'importe quel projet."
        ],
        en: [
          'Thank you, Camille, for your great work at Accor. Your contribution to the team was very valuable, and your efficiency will certainly be an asset to any project.'
        ]
      }
    },
    {
      name: 'Stéphane B.',
      role: 'Head of AMM FX IT Strategists – BNP Paribas',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/in/camille-guillard-b1071b1b8/details/recommendations/',
      text: {
        fr: [
          'Cela fut un réel plaisir de travailler avec Camille.',
          "Ses compétences techniques et ses capacités à résoudre les problèmes furent des atouts majeurs pour notre projet. C'est en partie grâce à lui et à son implication que nous avons réussi à atteindre les objectifs et à satisfaire pleinement les besoins de nos utilisateurs.",
          'Je remercie Camille pour sa participation à ce succès.'
        ],
        en: [
          'It was a real pleasure working with Camille.',
          'His technical skills and problem-solving abilities were major assets for our project. It is partly thanks to him and his commitment that we achieved our goals and fully met our users’ needs.',
          'I thank Camille for his part in this success.'
        ]
      }
    },
    {
      name: 'Julien F.',
      role: 'IT Project Manager – UGC',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/in/camille-guillard-b1071b1b8/details/recommendations/',
      text: {
        fr: [
          'Ce fut un plaisir de travailler avec Camille au début de sa carrière professionnelle. Il était très compétent techniquement et surmontait facilement de nouvelles problématiques. Je le remercie beaucoup pour le travail accompli à cette époque !'
        ],
        en: [
          'It was a pleasure working with Camille at the start of his career. He was highly skilled technically and easily overcame new challenges. Many thanks to him for the work he did at the time!'
        ]
      }
    },
    {
      name: 'Marie Christine V.',
      role: 'Head of GCR IT – BNP Paribas CIB',
      source: 'LeHibou',
      sourceUrl: 'https://www.lehibou.com/recommandations?status=completed',
      text: {
        fr: [
          'Camille exerçait un vrai poste de développeur fullstack Java/Angular, et nous sommes assez difficiles sur le sujet. Donc il était capable selon les besoins de prendre en charge des développements de bout en bout (le plus souvent) ou bien seulement le front ou seulement le back.',
          "Camille est de très bonne volonté et est capable de fournir une analyse de qualité. S'il est très réservé en groupe, il n'en a pas moins été très bien intégré à l'équipe, et très apprécié de ses collègues.",
          "J'ajoute que par rapport à ce qu'on trouve comme compétence Angular, il est très bien. Souvent les consultants proposés ont des connaissances très superficielles ; Camille a un bon niveau."
        ],
        en: [
          'Camille held a genuine fullstack Java/Angular developer role, and we are quite demanding on that front. Depending on our needs, he could take on end-to-end development (most of the time), or just the front end or just the back end.',
          'Camille is very willing and able to deliver high-quality analysis. Although he is very reserved in a group, he was nonetheless very well integrated into the team and highly appreciated by his colleagues.',
          'I would add that, compared with the Angular skills we usually come across, he is very good. Consultants put forward often have very superficial knowledge; Camille has a solid level.'
        ]
      }
    }
  ];

  setLang(lang: Lang): void {
    this.lang = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* stockage indisponible */ }
  }

  toggleLang(): void {
    this.setLang(this.lang === 'fr' ? 'en' : 'fr');
  }

  initials(name: string): string {
    const parts = name.replace(/\./g, '').split(' ').filter(Boolean);
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /** Langue mémorisée, sinon celle du navigateur (français par défaut). */
  private initialLang(): Lang {
    let lang: Lang = 'fr';
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'fr' || saved === 'en') {
        lang = saved;
      } else if (!(navigator.language || 'fr').toLowerCase().startsWith('fr')) {
        lang = 'en';
      }
    } catch { /* stockage indisponible */ }
    document.documentElement.lang = lang;
    return lang;
  }
}
