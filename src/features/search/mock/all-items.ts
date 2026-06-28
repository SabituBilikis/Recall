import type { SearchItem } from "../types/search.types";
import { mockFiles } from "./mock-files";
import { mockLinks } from "./mock-links";
import { mockNotes } from "./mock-notes";
import { mockScreenshots } from "./mock-screenshots";

// Aggregated searchable corpus. The single mock seam — swap for a service/query later.
export const allSearchItems: SearchItem[] = [...mockScreenshots, ...mockLinks, ...mockNotes, ...mockFiles];
