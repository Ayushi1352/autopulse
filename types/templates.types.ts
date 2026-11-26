export interface ThemeFonts {
  primary: string;
  heading: string;
  display: string;
  footer: string;
  quote: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  lang: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface SocialLink extends LinkItem {
  icon: string;
}

/** A phone number, e-mail or address with its icon (shared by the header's top bar and the contact card) */
export interface ContactItem {
  id: string;
  icon: string;
  title: string;
  lines: string[];
  url: string;
  /** shorter text for the header's top bar (the address as just its city); the lines are used without it */
  topbarText?: string;
}

export interface CompanyData {
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  /** the business's phone, e-mail and address, written once for the whole site */
  contactItems: ContactItem[];
  socialLinks: SocialLink[];
}

export interface FooterData {
  /** the footer's own white logo (with "Automotive Services" under it), as in the design */
  logo: string;
  logoWidth: number;
  logoHeight: number;
  logoUrl: string;
  homeLabel: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  navLabel: string;
  links: LinkItem[];
  socialLabel: string;
  copyrightText: string;
}

export interface HeaderData {
  logoUrl: string;
  homeLabel: string;
  topbarLabel: string;
  navLinks: LinkItem[];
  buttonText: string;
  buttonUrl: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

/** A section title: the words before the highlighted (orange) words, the highlighted words, and any words after them */
export interface SplitTitle {
  titleTop: string;
  titleAccent: string;
  titleEnd?: string;
}

export interface HeroData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  image: string;
  imageAlt: string;
}

export interface AboutTab {
  id: string;
  /** icon on the tab button */
  icon: string;
  label: string;
  /** icon in the round badge of the open tab's card */
  contentIcon: string;
  title: string;
  /** "\n" starts a new line (kept from 1024px up) */
  text: string;
}

export interface AboutData {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 1024px up) */
  title: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  image: string;
  imageAlt: string;
  sideImage: string;
  sideImageAlt: string;
  experienceIcon: string;
  experienceValue: string;
  experienceText: string;
  tabsLabel: string;
  tabs: AboutTab[];
}

export interface ServiceListItem {
  id: string;
  icon: string;
  title: string;
}

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  /** "\n" starts a new line (kept from 1024px up) */
  text: string;
  image: string;
  imageAlt: string;
}

export interface ServicesData {
  id: string;
  label: string;
  title: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  /** link of every service in the list (the booking form, with that service chosen) */
  listUrl: string;
  listLabel: string;
  items: ServiceListItem[];
  cards: ServiceCard[];
  /** "Show service {number}" */
  pageLabel: string;
}

export interface WhyPoint {
  id: string;
  icon: string;
  title: string;
  /** "\n" starts a new line (kept from 1024px up) */
  text: string;
}

export interface WhyData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  /** the first half is shown on the left of the photo, the rest on the right */
  points: WhyPoint[];
}

export interface ProcessStep {
  id: string;
  icon: string;
  title: string;
  /** "\n" starts a new line (kept from 1024px up) */
  text: string;
}

export interface StatItem {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export interface ProcessData {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  steps: ProcessStep[];
  statsLabel: string;
  stats: StatItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  /** opening words shown in bold before the quote (optional) */
  highlight?: string;
  /** "\n" starts a new line (kept from 1024px up) */
  quote: string;
  image: string;
  stars: number;
}

export interface TestimonialsData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  ratingLabel: string;
  previousLabel: string;
  nextLabel: string;
  /** "Show testimonial {number}" */
  dotLabel: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  /** "\n" starts a new line (kept from 1024px up) */
  answer: string;
}

export interface FaqData extends SplitTitle {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
  items: FaqItem[];
}

export interface ContactData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  image: string;
  imageAlt: string;
}

export interface FormField {
  placeholder: string;
  icon: string;
}

export interface BookingData extends SplitTitle {
  id: string;
  icon: string;
  description: string;
  fields: {
    name: FormField;
    phone: FormField;
    email: FormField;
    date: FormField;
    service: FormField;
    time: FormField;
    message: FormField;
  };
  /** choices after the service names in the service list */
  extraServices: string[];
  timeOptions: string[];
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

interface Variants<T> {
  variants: Record<string, T>;
}

export interface TemplateComponent {
  key: string;
  component: string;
}

export interface AutoPulseTemplateData {
  common: {
    theme: ThemeData;
    metadata: SiteMetadataData;
    company: CompanyData;
    Footer: FooterData;
  };
  categories: {
    Automotive: {
      sections: {
        Header?: Variants<HeaderData>;
        Hero?: Variants<HeroData>;
        About?: Variants<AboutData>;
        Services?: Variants<ServicesData>;
        Why?: Variants<WhyData>;
        Process?: Variants<ProcessData>;
        Testimonials?: Variants<TestimonialsData>;
        Faq?: Variants<FaqData>;
        Contact?: Variants<ContactData>;
        Booking?: Variants<BookingData>;
      };
      templateComponents: {
        [template: string]: {
          shared: Record<string, string>;
          pages: Record<string, { components: TemplateComponent[] }>;
        };
      };
    };
  };
}
