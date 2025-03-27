import { StaticImageData } from 'next/image';
import pfizerArthritisImage from '../images/pfizer_arthritis.jpeg';
import pfizerArthritisImage2 from '../images/pfizer_arthritis2.jpeg';
import pfizerArthritisImage3 from '../images/pfizer_arthritis3.jpg';
import pfizerCardioImage from '../images/pfizer_cardiovascular.jpg';
import pfizerCardioImage2 from '../images/pfizer_cardiovascular2.png';
import pfizerRareImage from '../images/pfizer_raredisease.jpg';

export interface PfizerAd {
  id: string;
  category: "Arthritis" | "Cardiovascular" | "Rare Diseases";
  adContent: string;
  imageUrl: StaticImageData;
  link: string;
}

export const pfizerAds: PfizerAd[] = [
  {
    id: "PfizerArthritis1",
    category: "Arthritis", 
    adContent: "Pfizer: Mountain Ice.",
    imageUrl: pfizerArthritisImage,
    link: "https://www.pfizer.com/"
  },
  {
    id: "PfizerArthritis2",
    category: "Arthritis", 
    adContent: "Pfizer: Relief for Arthritis Pain.",
    imageUrl: pfizerArthritisImage2,
    link: "https://www.pfizer.com/"
  },
  {
    id: "PfizerArthritis3",
    category: "Arthritis", 
    adContent: "Pfizer: Motrin.",
    imageUrl: pfizerArthritisImage3,
    link: "https://www.pfizer.com/"
  },
  {
    id: "PfizerCardiovascular1",
    category: "Cardiovascular",
    adContent: "Pfizer: Heart Health.",
    imageUrl: pfizerCardioImage,
    link: "https://www.pfizer.com/"
  },
  {
    id: "PfizerCardiovascular2",
    category: "Cardiovascular",
    adContent: "Pfizer: Vyndamax.",
    imageUrl: pfizerCardioImage2,
    link: "https://www.pfizer.com/"
  },
  {
    id: "PfizerRareDiseases1",
    category: "Rare Diseases",
    adContent: "Pfizer: Helping those with rare diseases.",
    imageUrl: pfizerRareImage,
    link: "https://www.pfizer.com/"
  }
];