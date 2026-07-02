// Static copy for the Add Item flow (mirrors the Figma content).
export const captureContent = {
  selectTitle: "Save new item",
  selectHeading: "Choose what you want to save to Recall.",
  headerTitles: {
    screenshot: "Add Screenshot",
    link: "Add Link",
    note: "Add Note",
    file: "Add File"
  },
  fields: {
    title: { label: "Title", placeholder: "Give it a name" },
    url: { label: "URL", placeholder: "https://recall.com" },
    description: { label: "Description", placeholder: "Add a description for revisiting" },
    collection: { label: "Collection", placeholder: "Choose a collection" },
    linkPreview: { label: "Link Preview" }
  },
  screenshotUpload: { title: "Upload your image here" },
  fileUpload: { title: "Upload your file here", subtitle: "Save PDFs and Docs up to 20MB" },
  uploadingLabel: (progress: number) => `${progress}% uploading`,
  saveLabel: "Save",
  success: {
    title: "Saved to Recall",
    subtitle: "Your item is organized and ready to find later",
    viewItem: "View Item",
    saveAnother: "Save Another"
  }
} as const;
