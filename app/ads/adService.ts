import { pfizerAds, PfizerAd } from "./pharmaCompanies/pfizerAds";
import { genentechAds, GenentechAd } from "./pharmaCompanies/genentechAds";
import { gskAds, GskAd} from "./pharmaCompanies/gskAds";
import { eliLillyAds, EliLillyAd } from "./pharmaCompanies/eliLillyAds";

interface AdMetrics {
    companyName: string;
    adName: string;
    impressions: number;
    clicks: number;
}

export class AdService {
    private impressionCounts: { [key: string]: number } = {};
    private adRotationIndexes: { [category: string]: number } = {};

    constructor() {
        try {
            this.impressionCounts = JSON.parse(localStorage.getItem('adImpressionCounts') || '{}');
            this.adRotationIndexes = JSON.parse(localStorage.getItem('adRotationIndexes') || '{}');
          }
          catch (error) {
            this.impressionCounts = {};
            this.adRotationIndexes = {};
          }
    }
    
    getAd(category: string): PfizerAd | GenentechAd | GskAd | EliLillyAd | null {
        let availableAds: (PfizerAd | GenentechAd | GskAd | EliLillyAd)[] = [];
    
        // Populates available ads array based on category.
        if (category === "Arthritis" || category === "Cardiovascular" || category === "Rare Diseases") {
            availableAds = pfizerAds.filter((ad) => ad.category === category);
        }
        else if (category === "Breast Cancer" ||  category === "Immunology" || category === "Ophthalmology") {
            availableAds = genentechAds.filter((ad) => ad.category === category);
        }
        else if (category === "Pancreatic Cancer" ||  category === "Respiratory" || category === "Infectious Diseases") {
            availableAds = gskAds.filter((ad) => ad.category === category);
        }
        else if (category === "Diabetes" || category === "Oncology" || category === "Neuroscience") {
            availableAds = eliLillyAds.filter((ad) => ad.category === category);
        }
        else {
            return null;
        }

        if (availableAds.length === 0) {
            return null;
        }
        // Initialize rotation index for this category if not exists
        if (typeof this.adRotationIndexes[category] === 'undefined') {
            this.adRotationIndexes[category] = 0;
        }
        // Set current index and increment for next call to ad category
        const currentIndex = this.adRotationIndexes[category];
        this.adRotationIndexes[category] = (currentIndex + 1) % availableAds.length;
        localStorage.setItem('adRotationIndexes', JSON.stringify(this.adRotationIndexes));

        return availableAds[this.adRotationIndexes[category]];
    }

    trackImpression(ad: PfizerAd | GenentechAd | GskAd | EliLillyAd): void {
        const adKey = ad.id;
        this.impressionCounts[adKey] = (this.impressionCounts[adKey] || 0) + 1;
        localStorage.setItem('adImpressionCounts', JSON.stringify(this.impressionCounts));
    }

    getCompanyName(ad: PfizerAd | GenentechAd | GskAd | EliLillyAd): string {
        if (pfizerAds.some(a => a.id === ad.id)) return 'Pfizer';
        if (genentechAds.some(a => a.id === ad.id)) return 'Genentech';
        if (gskAds.some(a => a.id === ad.id)) return 'GSK';
        if (eliLillyAds.some(a => a.id === ad.id)) return 'Eli Lilly';
        return 'Unknown';
    }

    trackClick(ad: PfizerAd | GenentechAd | GskAd | EliLillyAd): void {
        const adKey = ad.id;
        const clicks = JSON.parse(localStorage.getItem('adClicks') || '{}');
        clicks[adKey] = (clicks[adKey] || 0) + 1;
        localStorage.setItem('adClicks', JSON.stringify(clicks));
    }

    getMetrics(): AdMetrics[] {
        const allAds = [
            ...pfizerAds,
            ...genentechAds,
            ...gskAds,
            ...eliLillyAds
        ];

        const impressions = JSON.parse(localStorage.getItem('adImpressionCounts') || '{}');
        const clicks = JSON.parse(localStorage.getItem('adClicks') || '{}');

        return allAds.map(ad => ({
            companyName: this.getCompanyName(ad),
            adName: ad.id,
            impressions: impressions[ad.id] || 0,
            clicks: clicks[ad.id] || 0
        }));
    }
}

export const AdCategories = [
    "Arthritis",
    "Cardiovascular", 
    "Rare Diseases",
    "Breast Cancer",
    "Immunology",
    "Ophthalmology",
    "Pancreatic Cancer",
    "Respiratory",
    "Infectious Diseases",
    "Diabetes",
    "Oncology",
    "Neuroscience"
]