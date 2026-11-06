/* ============================================================
   JIK — Configuration centrale de la marque
   ------------------------------------------------------------
   ⚠️ À COMPLÉTER PAR LE PROPRIÉTAIRE :
   - whatsappNumber : numéro WhatsApp officiel au format international
     SANS "+", SANS espaces. Ex : "22890000000" pour Togo (+228).
   - instagram : URL du profil Instagram officiel.
   - siteUrl : domaine final après déploiement (pour SEO/canonical).
   ============================================================ */

const JIK_CONFIG = {
  // À REMPLACER — numéro officiel non communiqué
  whatsappNumber: 'REPLACE_WITH_OFFICIAL_NUMBER',

  currency: 'XOF',
  defaultLanguage: 'fr',

  // À REMPLACER — lien Instagram officiel non communiqué
  instagramUrl: null,

  // À REMPLACER après achat du domaine — aucun domaine inventé
  siteUrl: null,

  // Tailles proposées (à confirmer par le propriétaire)
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],

  // Couleurs par produit — déduites visuellement des visuels officiels.
  // À confirmer ; ne constituent pas des variantes inventées.
  availability: null, // null = disponibilité non confirmée → gérée via WhatsApp
};
