// Static copy for the Profile flow. Keeps strings out of components (no
// hardcoded repeated literals) and ready for future localization.
export const profileContent = {
  titles: {
    profile: "Profile",
    account: "Account",
    storage: "Storage",
    trash: "Trash"
  },
  stats: {
    storageUsed: "Storage used",
    savedItems: "Saved items",
    collections: "Collections"
  },
  settings: {
    heading: "Settings",
    account: { label: "Account", description: "Name, Email, Password" },
    storage: { label: "Storage", description: "Usage and item breakdown" },
    trash: { label: "Trashed Items", description: "Hidden, but never lost" },
    privacy: { label: "Privacy", description: "Data and permission" },
    offline: { label: "Offline Mode", description: "Cache items for no-signal access" },
    notifications: { label: "Notification", description: "Nudges to capture & revisit" }
  },
  signOut: {
    cta: "Sign Out",
    modalTitle: "Sign out?",
    modalDescription: "You'll need to sign in again to access your saved items.",
    cancel: "Cancel",
    confirm: "Sign Out"
  },
  account: {
    firstName: { label: "First Name", placeholder: "First name" },
    lastName: { label: "Last Name", placeholder: "Last name" },
    email: { label: "Email Address", placeholder: "Email Address" },
    password: { label: "Password", placeholder: "Password" },
    save: "Save Changes"
  },
  storage: {
    cardTitle: "Your Storage",
    usedSuffix: "Used",
    breakdownHeading: "Breakdown",
    savedItemsSuffix: "Saved items"
  },
  trash: {
    searchPlaceholder: "Search trash",
    retentionNotice: "Items in trash will be permanently deleted after 30 days",
    listHeading: "Deleted Items",
    filterAll: "All",
    restore: "Restore",
    deletePermanently: "Delete permanently",
    empty: { title: "Trash is empty", description: "Deleted items will appear here for 30 days." },
    noResults: { title: "No matches", description: "No deleted items match your search." }
  }
} as const;
