import { StaticImageData } from 'next/image';
import gskPancreatic from '../images/gsk_pancreatic.jpg';
import gskPancreatic2 from '../images/gsk_pancreatic2.jpg';
import gskRespiratory from '../images/gsk_respiratory.jpeg';
import gskRespiratory2 from '../images/gsk_respiratory2.jpeg';
import gskInfectious from '../images/gsk_infectious.jpg';
import gskInfectious2 from '../images/gsk_infectious2.jpeg';

export interface GskAd {
  id: string;
  category: "Pancreatic Cancer" | "Respiratory" | "Infectious Diseases";
  adContent: string;
  imageUrl: StaticImageData;
  link: string;
}

export const gskAds: GskAd[] = [
  {
    id: "GskPancreaticCancer1",
    category: "Pancreatic Cancer",
    adContent: "GSK: Fighting Pancreatic Cancer.",
    imageUrl: gskPancreatic,
    link: 'https://www.gsk.com/en-gb/'
  },
  {
    id: "GskPancreaticCancer2",
    category: "Pancreatic Cancer",
    adContent: "GSK: Understanding Pancreatic Cancer..",
    imageUrl: gskPancreatic2,
    link: 'https://www.gsk.com/en-gb/'
  },
  {
    id: "GskRespiratory1",
    category: "Respiratory",
    adContent: "GSK: Innoviva, Breathe Easier.",
    imageUrl: gskRespiratory,
    link: 'https://www.gsk.com/en-gb/'
  },
  {
    id: "GskRespiratory2",
    category: "Respiratory",
    adContent: "GSK: Otrivin Nesespray for Respiratory Health.",
    imageUrl: gskRespiratory2,
    link: 'https://www.gsk.com/en-gb/'
  },
  {
    id: "GskInfectiousDiseases1",
    category: "Infectious Diseases",
    adContent: "GSK: Combatting Infectious Diseases via Vaccine.",
    imageUrl: gskInfectious,
    link: 'https://www.gsk.com/en-gb/'
  },
  {
    id: "GskInfectiousDiseases2",
    category: "Infectious Diseases",
    adContent: "GSK: Moments Worth Protecting.",
    imageUrl: gskInfectious2,
    link: 'https://www.gsk.com/en-gb/'
  }
];