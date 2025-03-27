import { StaticImageData } from "next/image";
import genentechBreast from "../images/genentech_breast.jpg";
import genentechBreast2 from "../images/genentech_breast2.jpeg";
import genentechBreast3 from "../images/genentech_breast3.jpg";
import genentechImmunology from "../images/genentech_immunology.jpg";
import genentechOpthamology from "../images/genentech_opthamology.jpeg";

export interface GenentechAd {
  id: string,
  category: "Breast Cancer" | "Immunology" | "Ophthalmology";
  adContent: string;
  imageUrl: StaticImageData;
  link: string;
}

export const genentechAds: GenentechAd[] = [
  {
    id: "GenentechBreastCancer1",
    category: "Breast Cancer",
    adContent: "Genentech: Early Breast Cancer Treatment.",
    imageUrl: genentechBreast,
    link: "https://www.gene.com/"
  },
  {
    id: "GenentechBreastCancer2",
    category: "Breast Cancer",
    adContent: "Genentech: Advancing Breast Cancer Care.",
    imageUrl: genentechBreast2,
    link: "https://www.gene.com/"
  },
  {
    id: "GenentechBreastCancer3",
    category: "Breast Cancer",
    adContent: "Genentech: Itovebi for Breast Cancer.",
    imageUrl: genentechBreast3,
    link: "https://www.gene.com/"
  },
  {
    id: "GenentechImmunology1",
    category: "Immunology",
    adContent: "Genentech: Enza Di Modungo, Immunology.",
    imageUrl: genentechImmunology,
    link: "https://www.gene.com/"
  },
  {
    id: "GenentechOpthamology1",
    category: "Ophthalmology",
    adContent: "Genentech: Improving Eye Health.",
    imageUrl: genentechOpthamology,
    link: "https://www.gene.com/"
  }
];