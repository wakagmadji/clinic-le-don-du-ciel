# Clinique Le Don du Ciel — Site Web

Site web professionnel pour la Clinique Le Don du Ciel, construit avec **React + TypeScript + Vite + Lucide React**.

## 🚀 Démarrage rapide

### Prérequis
- Node.js ≥ 18
- Yarn

### Installation

```bash
# 1. Installer les dépendances
yarn install

# 2. Lancer le serveur de développement
yarn dev
```

Le site sera accessible sur **http://localhost:5173**

### Build production

```bash
yarn build
yarn preview   # prévisualiser le build
```

---

## 📁 Structure du projet

```
src/
├── components/
│   ├── Navbar.tsx       — Navigation fixe avec menu mobile
│   ├── Hero.tsx         — Section d'accueil (hero)
│   ├── Services.tsx     — 3 services avec accordéon
│   ├── About.tsx        — À propos et valeurs
│   ├── Team.tsx         — Équipe médicale
│   ├── Rdv.tsx          — Formulaire de rendez-vous
│   ├── Contact.tsx      — Contact et localisation
│   └── Footer.tsx       — Pied de page
├── data.ts              — ✏️  Tout le contenu du site
├── types.ts             — Types TypeScript
├── App.tsx              — Composant racine
├── main.tsx             — Point d'entrée
└── index.css            — Variables CSS globales
```

## ✏️ Personnalisation

Toutes les données du site se trouvent dans **`src/data.ts`** :

- `NAV_ITEMS`    — liens de navigation
- `SERVICES`     — vos 3 services (titre, description, détails)
- `STATS`        — statistiques hero
- `TEAM`         — membres de l'équipe
- `CONTACT_INFO` — adresse, téléphone, email, horaires

### Changer les couleurs

Modifiez les variables CSS dans `src/index.css` :
```css
:root {
  --green:  #2D6147;   /* vert principal */
  --gold:   #C8973A;   /* doré accent    */
  --cream:  #FAF7F2;   /* fond crème     */
}
```

### Intégrer Google Maps

Dans `src/components/Contact.tsx`, remplacez le div `map-placeholder` par :
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=VOTRE_CLE"
  width="100%" height="280"
  style={{ border:0, borderRadius:'var(--radius-lg)' }}
  allowFullScreen loading="lazy"
/>
```

---

## 🔧 Technologies

| Outil          | Version  | Rôle                     |
|----------------|----------|--------------------------|
| React          | 18.x     | UI framework             |
| TypeScript     | 5.x      | Typage statique          |
| Vite           | 5.x      | Build tool & dev server  |
| Lucide React   | 0.417+   | Icônes SVG               |
| Yarn           | —        | Gestionnaire de paquets  |
