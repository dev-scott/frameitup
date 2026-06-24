'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type Language = 'en' | 'fr';
export const translations = {
    en: {
        nav: {
            design: 'Design Yours',
            myOrders: 'My Orders',
            marketplace: 'Marketplace',
            signIn: 'Sign In',
            myAccount: 'My Account',
            startDesigning: 'Start Designing',
        },
        hero: {
            badge: 'Museum-Quality Framing',
            line1: ['Your', 'memories,'],
            line2: ['perfectly', 'framed.'],
            subtitle: 'Upload any photo. Choose your frame. We craft and deliver a',
            subtitleHighlight: 'museum-quality',
            subtitleEnd: 'framed print to your door in days.',
            cta: 'Start Designing',
            ctaBrowse: 'Browse Frames',
            trustRating: '4.9/5',
            trustReviews: 'from 2,400+ customers',
            scroll: 'Scroll',
        },
        stats: {
            sectionLabel: 'By the numbers',
            title: 'Trusted by thousands of',
            titleHighlight: 'art lovers',
            items: [
                { label: 'Frames Crafted', description: 'Orders fulfilled with care across 40+ countries.' },
                { label: 'Average Rating', description: 'Based on 8,400+ verified customer reviews.' },
                { label: 'Average Delivery', description: 'From your upload to your door, worldwide.' },
                { label: 'Archival Quality', description: 'Museum-grade materials guaranteed to last a lifetime.' },
            ],
        },
        howItWorks: {
            sectionLabel: 'The Process',
            title: 'Framing made',
            titleHighlight: 'effortless',
            subtitle: 'Three simple steps between you and a museum-quality piece on your wall.',
            steps: [
                {
                    title: 'Upload Your Photo',
                    description: 'Start with any image — a cherished memory, a fine art print, or your favorite snapshot. We support all major formats in full resolution.',
                },
                {
                    title: 'Choose Your Frame',
                    description: 'Browse our curated collection of premium frames — from sleek minimalist wood to ornate gilded designs. Preview in real-time 3D.',
                },
                {
                    title: 'We Craft & Deliver',
                    description: 'Our master craftsmen produce your frame using archival materials. Delivered to your door in 3–5 days, ready to hang.',
                },
            ],
            cta: 'Start your first frame',
        },
        showcase: {
            sectionLabel: 'Our Collection',
            title: 'Find your perfect',
            titleHighlight: 'frame',
            viewAll: 'View all frames →',
            preview: 'Preview',
            badges: {
                bestSeller: 'Best Seller',
                modern: 'Modern',
                premium: 'Premium',
                eco: 'Eco',
                luxury: 'Luxury',
                new: 'New',
            },
        },
        testimonials: {
            sectionLabel: 'Testimonials',
            title: 'What our customers',
            titleHighlight: 'love',
            items: [
                {
                    name: 'Sophie Marceau',
                    role: 'Interior Designer, Paris',
                    text: "I've ordered from FrameItUp three times now. Every single time the quality exceeded my expectations. The oak frame I chose for my living room gets compliments from every guest.",
                    frame: 'Oslo Classic',
                },
                {
                    name: 'Marcus Chen',
                    role: 'Photographer, New York',
                    text: "As a professional photographer, I'm extremely picky about print quality. FrameItUp uses museum-grade archival paper and the color accuracy is stunning. These are the frames I use for my gallery shows.",
                    frame: 'Noir Élégant',
                },
                {
                    name: 'Emma Johansson',
                    role: 'Art Collector, Stockholm',
                    text: "The Galerie Gold frame is absolutely breathtaking. It transformed my artwork into something that belongs in a museum. Delivery was incredibly fast — I ordered on Monday and it arrived Wednesday!",
                    frame: 'Galerie Gold',
                },
                {
                    name: 'Luca Rossi',
                    role: 'Architect, Milan',
                    text: "The Terra Antica frame perfectly complements my apartment's design aesthetic. The craftsmanship is impeccable — you can feel the quality. FrameItUp is the only place I'll ever order frames from.",
                    frame: 'Terra Antica',
                },
            ],
        },
        cta: {
            badge: 'Free shipping on first order',
            title: 'Your wall deserves',
            titleShimmer: 'something',
            titleGradient: 'extraordinary.',
            subtitle: 'Join over 50,000 customers who have transformed their spaces with FrameItUp. Premium quality, crafted with love, delivered to your door.',
            startDesigning: 'Start Designing Now',
            browseCollection: 'Browse Collection',
            guarantees: [
                { icon: '🎨', label: 'Archival quality' },
                { icon: '🚀', label: '3-day delivery' },
                { icon: '♻️', label: 'Eco materials' },
                { icon: '💯', label: '30-day guarantee' },
            ],
        },
        footer: {
            tagline: 'Museum-quality custom frames, crafted with care and delivered to your door. Transform your memories into timeless art.',
            product: 'Product',
            company: 'Company',
            support: 'Support',
            links: {
                browseFrames: 'Browse Frames',
                designYours: 'Design Yours',
                myOrders: 'My Orders',
                marketplace: 'Marketplace',
                aboutUs: 'About Us',
                craftsmanship: 'Craftsmanship',
                sustainability: 'Sustainability',
                blog: 'Blog',
                faq: 'FAQ',
                shipping: 'Shipping & Returns',
                contact: 'Contact Us',
                privacy: 'Privacy Policy',
            },
            newsletter: {
                title: 'Get framing inspiration',
                subtitle: 'New collections, design tips and exclusive offers.',
                placeholder: 'your@email.com',
                subscribe: 'Subscribe',
            },
            copyright: '© 2026 FrameItUp. All rights reserved.',
            paymentsBy: 'Payments secured by',
        },
        framesPage: {
            sectionLabel: 'Artisan Collections',
            title: 'Exquisite Handcrafted Frame Profiles',
            subtitle: 'Select from our premium curation of materials, hand-finished colorways, and sizes to elevate your artwork or photography.',
            perLinearMeter: 'per linear meter',
            width: 'Width',
            height: 'Height',
            depth: 'Depth',
            designWith: 'Design With This Frame',
            profile: 'Profile',
        },
    },
    fr: {
        nav: {
            design: 'Créer le vôtre',
            myOrders: 'Mes commandes',
            marketplace: 'Marketplace',
            signIn: 'Se connecter',
            myAccount: 'Mon compte',
            startDesigning: 'Commencer',
        },
        hero: {
            badge: 'Encadrement qualité muséale',
            line1: ['Vos', 'souvenirs,'],
            line2: ['parfaitement', 'encadrés.'],
            subtitle: 'Importez votre photo. Choisissez votre cadre. Nous fabriquons et livrons un',
            subtitleHighlight: 'encadrement qualité muséale',
            subtitleEnd: 'à votre porte en quelques jours.',
            cta: 'Commencer',
            ctaBrowse: 'Voir les cadres',
            trustRating: '4,9/5',
            trustReviews: 'avis de plus de 2 400 clients',
            scroll: 'Défiler',
        },
        stats: {
            sectionLabel: 'En chiffres',
            title: 'La confiance de milliers',
            titleHighlight: "d'amoureux de l'art",
            items: [
                { label: 'Cadres fabriqués', description: 'Commandes traitées avec soin dans plus de 40 pays.' },
                { label: 'Note moyenne', description: 'Basé sur plus de 8 400 avis clients vérifiés.' },
                { label: 'Livraison moyenne', description: 'De votre téléchargement à votre porte, partout dans le monde.' },
                { label: 'Qualité archivale', description: 'Matériaux de qualité muséale garantis pour durer toute une vie.' },
            ],
        },
        howItWorks: {
            sectionLabel: 'Le processus',
            title: "L'encadrement rendu",
            titleHighlight: 'simple',
            subtitle: 'Trois étapes simples entre vous et une pièce de qualité muséale sur votre mur.',
            steps: [
                {
                    title: 'Importez votre photo',
                    description: 'Commencez avec n\'importe quelle image — un souvenir précieux, une reproduction fine ou votre photo préférée. Nous supportons tous les formats majeurs en pleine résolution.',
                },
                {
                    title: 'Choisissez votre cadre',
                    description: 'Parcourez notre collection de cadres premium — du bois minimaliste aux designs dorés ornés. Aperçu en 3D en temps réel.',
                },
                {
                    title: 'Nous fabriquons & livrons',
                    description: 'Nos artisans maîtres produisent votre cadre avec des matériaux d\'archivage. Livré à votre porte en 3 à 5 jours, prêt à accrocher.',
                },
            ],
            cta: 'Commencez votre premier cadre',
        },
        showcase: {
            sectionLabel: 'Notre collection',
            title: 'Trouvez votre',
            titleHighlight: 'cadre parfait',
            viewAll: 'Voir tous les cadres →',
            preview: 'Aperçu',
            badges: {
                bestSeller: 'Best-seller',
                modern: 'Moderne',
                premium: 'Premium',
                eco: 'Éco',
                luxury: 'Luxe',
                new: 'Nouveau',
            },
        },
        testimonials: {
            sectionLabel: 'Témoignages',
            title: 'Ce que nos clients',
            titleHighlight: 'adorent',
            items: [
                {
                    name: 'Sophie Marceau',
                    role: 'Décoratrice d\'intérieur, Paris',
                    text: "J'ai commandé chez FrameItUp trois fois maintenant. Chaque fois, la qualité a dépassé mes attentes. Le cadre en chêne que j'ai choisi pour mon salon reçoit des compliments de chaque invité.",
                    frame: 'Oslo Classic',
                },
                {
                    name: 'Marcus Chen',
                    role: 'Photographe, New York',
                    text: "En tant que photographe professionnel, je suis très exigeant sur la qualité d'impression. FrameItUp utilise du papier archivistique de qualité muséale et la précision des couleurs est stupéfiante. Ce sont les cadres que j'utilise pour mes expositions.",
                    frame: 'Noir Élégant',
                },
                {
                    name: 'Emma Johansson',
                    role: 'Collectionneuse d\'art, Stockholm',
                    text: "Le cadre Galerie Gold est absolument époustouflant. Il a transformé mon œuvre en quelque chose qui appartient à un musée. La livraison était incroyablement rapide — j'ai commandé lundi et c'est arrivé mercredi !",
                    frame: 'Galerie Gold',
                },
                {
                    name: 'Luca Rossi',
                    role: 'Architecte, Milan',
                    text: "Le cadre Terra Antica s'accorde parfaitement à l'esthétique de mon appartement. L'artisanat est impeccable — on sent la qualité. FrameItUp est le seul endroit où je commanderai des cadres.",
                    frame: 'Terra Antica',
                },
            ],
        },
        cta: {
            badge: 'Livraison offerte pour la 1ère commande',
            title: 'Votre mur mérite',
            titleShimmer: 'quelque chose',
            titleGradient: "d'extraordinaire.",
            subtitle: "Rejoignez plus de 50 000 clients qui ont transformé leurs espaces avec FrameItUp. Qualité premium, fabriqué avec passion, livré à votre porte.",
            startDesigning: 'Commencer maintenant',
            browseCollection: 'Voir la collection',
            guarantees: [
                { icon: '🎨', label: 'Qualité archivale' },
                { icon: '🚀', label: 'Livraison en 3 jours' },
                { icon: '♻️', label: 'Matériaux éco' },
                { icon: '💯', label: 'Garantie 30 jours' },
            ],
        },
        footer: {
            tagline: 'Des cadres personnalisés de qualité muséale, fabriqués avec soin et livrés à votre porte. Transformez vos souvenirs en art intemporel.',
            product: 'Produit',
            company: 'Entreprise',
            support: 'Assistance',
            links: {
                browseFrames: 'Parcourir les cadres',
                designYours: 'Créer le vôtre',
                myOrders: 'Mes commandes',
                marketplace: 'Marketplace',
                aboutUs: 'À propos',
                craftsmanship: 'Savoir-faire',
                sustainability: 'Durabilité',
                blog: 'Blog',
                faq: 'FAQ',
                shipping: 'Livraison & Retours',
                contact: 'Nous contacter',
                privacy: 'Politique de confidentialité',
            },
            newsletter: {
                title: 'Inspirations encadrement',
                subtitle: 'Nouvelles collections, conseils design et offres exclusives.',
                placeholder: 'votre@email.com',
                subscribe: "S'abonner",
            },
            copyright: '© 2026 FrameItUp. Tous droits réservés.',
            paymentsBy: 'Paiements sécurisés par',
        },
        framesPage: {
            sectionLabel: 'Collections artisanales',
            title: 'Profils de cadres artisanaux exquis',
            subtitle: 'Choisissez parmi notre sélection premium de matériaux, coloris finis à la main, et tailles pour sublimer votre art ou photographie.',
            perLinearMeter: 'par mètre linéaire',
            width: 'Largeur',
            height: 'Hauteur',
            depth: 'Profondeur',
            designWith: 'Créer avec ce cadre',
            profile: 'Profil',
        },
    },
} as const;
export type Translations = typeof translations.en;
interface LanguageState {
    language: Language;
    t: Translations;
    setLanguage: (lang: Language) => void;
}
export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: 'fr',
            t: translations.fr as any,
            setLanguage: (lang: Language) =>
                set({ language: lang, t: translations[lang] as any }),
        }),
        {
            name: 'frameitup-language',
        }
    )
);
