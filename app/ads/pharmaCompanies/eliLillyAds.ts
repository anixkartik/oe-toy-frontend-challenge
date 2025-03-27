import { StaticImageData } from "next/image";
import eliDiabetes from '../images/eli_diabetes.jpeg';
import eliDiabetes2 from '../images/eli_diabetes2.jpeg';
import eliOncology from '../images/eli_oncology.jpg';
import eliOncology2 from '../images/eli_oncology2.jpg';
import eliNeuro from '../images/eli_neuro.jpg';
import eliNeuro2 from '../images/eli_neuro2.jpg';

export interface EliLillyAd {
  id: string;
  category: "Diabetes" | "Oncology" | "Neuroscience";
  adContent: string;
  imageUrl: StaticImageData;
  link: string;
}

export const eliLillyAds: EliLillyAd[] = [
  {
    id: "EliLillyDiabetes1",
    category: "Diabetes",
    adContent: "Eli Lilly: Diabetes Stats.",
    imageUrl: eliDiabetes,
    link: 'https://www.lilly.com/'
  },
  {
    id: "EliLillyDiabetes2",
    category: "Diabetes",
    adContent: "Eli Lilly: Mounjaro Injections, Leading in Diabetes Care.",
    imageUrl: eliDiabetes2,
    link: 'https://www.lilly.com/'
  },
  {
    id: "EliLillyOncology1",
    category: "Oncology",
    adContent: "Eli Lilly: Advancing Cancer Treatments.",
    imageUrl: eliOncology,
    link: 'https://www.lilly.com/'
  },
  {
    id: "EliLillyOncology2",
    category: "Oncology",
    adContent: "Eli Lilly: Rare Cancer in Oncology.",
    imageUrl: eliOncology2,
    link: 'https://www.lilly.com/'
  },
  {
    id: "EliLillyNeuro1",
    category: "Neuroscience",
    adContent: "Eli Lilly: Better Realities in Neuroscience.",
    imageUrl: eliNeuro,
    link: 'https://www.lilly.com/'
  },
  {
    id: "EliLillyNeuro2",
    category: "Neuroscience",
    adContent: "Eli Lilly: 50 Years in Neuroscience Solutions.",
    imageUrl: eliNeuro2,
    link: 'https://www.lilly.com/'
  }
];