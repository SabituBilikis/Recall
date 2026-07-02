// Privacy policy copy. Kept out of components (no hardcoded literals) and ready
// for localization. Wording reflects the PRD: privacy-first, row-level security,
// file-ownership validation, encrypted-at-rest, and the analytics events list.
export const privacyContent = {
  title: "Privacy",
  heading: "Privacy Policy",
  updated: "Last updated: June 2026",
  intro:
    "Recall is a personal knowledge workspace. We are privacy-first: your saved content belongs to you, is protected by per-user access controls, and is never sold or shared.",
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Account details you provide at sign-up: your name and email address.",
        "Content you choose to save: notes, links, screenshots, files, collections, tags, and their titles and descriptions.",
        "Basic usage events to improve the product (e.g. item saved, collection created, search used, file uploaded). These describe actions, not the content of what you save."
      ]
    },
    {
      heading: "How we use your information",
      body: [
        "To provide the core service — saving, organizing, syncing, and retrieving your content across your devices.",
        "To keep your account secure and to operate, maintain, and improve the app.",
        "We do not use your saved content for advertising, and we do not sell your data."
      ]
    },
    {
      heading: "Storage & security",
      body: [
        "Your data is protected by row-level security: every record is owner-scoped, so only your account can read or write it. File access is validated against ownership.",
        "Your session is encrypted at rest on your device, and your local cache is protected using your device keystore.",
        "Data is transmitted over encrypted connections (HTTPS)."
      ]
    },
    {
      heading: "Your controls",
      body: [
        "You can edit or delete any saved item, collection, or tag at any time.",
        "Deleted items move to Trash and can be restored before they are permanently removed.",
        "You can update your profile, or sign out to clear cached data on the device."
      ]
    },
    {
      heading: "Data retention & deletion",
      body: [
        "Items you delete are kept in Trash for 30 days, then permanently removed.",
        "You can permanently delete your account and all associated data at any time from Profile → Delete Account. Account deletion is immediate and irreversible."
      ]
    },
    {
      heading: "Third-party services",
      body: [
        "We use Supabase for authentication, database, and file storage. Your data is processed by Supabase solely to provide these services on our behalf.",
        "Link previews are fetched server-side from URLs you choose to save."
      ]
    },
    {
      heading: "Children's privacy",
      body: ["Recall is not directed to children under 13, and we do not knowingly collect their data."]
    },
    {
      heading: "Changes to this policy",
      body: ["We may update this policy as the product evolves. Material changes will be reflected here with a new date."]
    },
    {
      heading: "Contact",
      body: ["Questions or requests about your privacy? Reach us at the email below."]
    }
  ],
  contactEmail: "support@recall.app"
} as const;
