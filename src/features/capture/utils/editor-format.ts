// Markdown-style text transforms for the note editor. Pure functions on a
// { text, selection } state so the editor can apply them and restore the cursor.

import type { EditorIconId } from "../components/editor-icons";

export type TextSelection = { end: number; start: number };
export type EditorState = { selection: TextSelection; text: string };

function clampSelection(text: string, selection: TextSelection): TextSelection {
  const start = Math.max(0, Math.min(selection.start, text.length));
  const end = Math.max(start, Math.min(selection.end, text.length));
  return { start, end };
}

// Wrap the selection in marker tokens (e.g. ** ** for bold). With no selection,
// inserts the markers and places the cursor between them.
export function wrapSelection(state: EditorState, before: string, after: string): EditorState {
  const { end, start } = clampSelection(state.text, state.selection);
  const selected = state.text.slice(start, end);
  const text = state.text.slice(0, start) + before + selected + after + state.text.slice(end);
  const caret = start + before.length;
  return { text, selection: { start: caret, end: caret + selected.length } };
}

function lineBounds(text: string, selection: TextSelection) {
  const lineStart = text.lastIndexOf("\n", selection.start - 1) + 1;
  const nextBreak = text.indexOf("\n", selection.end);
  const lineEnd = nextBreak === -1 ? text.length : nextBreak;
  return { lineEnd, lineStart };
}

// Prefix every line touched by the selection (bullet list, quote).
export function togglePrefixLines(state: EditorState, prefix: string): EditorState {
  const selection = clampSelection(state.text, state.selection);
  const { lineEnd, lineStart } = lineBounds(state.text, selection);
  const block = state.text.slice(lineStart, lineEnd);
  const updated = block
    .split("\n")
    .map((line) => (line.startsWith(prefix) ? line : `${prefix}${line}`))
    .join("\n");
  const text = state.text.slice(0, lineStart) + updated + state.text.slice(lineEnd);
  const caret = lineStart + updated.length;
  return { text, selection: { start: caret, end: caret } };
}

// Number each selected line (ordered list).
export function numberLines(state: EditorState): EditorState {
  const selection = clampSelection(state.text, state.selection);
  const { lineEnd, lineStart } = lineBounds(state.text, selection);
  const block = state.text.slice(lineStart, lineEnd);
  const updated = block
    .split("\n")
    .map((line, index) => `${index + 1}. ${line.replace(/^\d+\.\s/, "")}`)
    .join("\n");
  const text = state.text.slice(0, lineStart) + updated + state.text.slice(lineEnd);
  const caret = lineStart + updated.length;
  return { text, selection: { start: caret, end: caret } };
}

const MARKER_PATTERN = /(\*\*|~~|\*|<\/?u>)/g;

// Strip inline markers from the selection (clear formatting).
export function clearFormatting(state: EditorState): EditorState {
  const { end, start } = clampSelection(state.text, state.selection);
  const selected = state.text.slice(start, end);
  const stripped = selected.replace(MARKER_PATTERN, "");
  const text = state.text.slice(0, start) + stripped + state.text.slice(end);
  return { text, selection: { start, end: start + stripped.length } };
}

// Insert a snippet at the cursor (image placeholder).
export function insertAtCursor(state: EditorState, snippet: string): EditorState {
  const { end, start } = clampSelection(state.text, state.selection);
  const text = state.text.slice(0, start) + snippet + state.text.slice(end);
  const caret = start + snippet.length;
  return { text, selection: { start: caret, end: caret } };
}

// Toolbar buttons that have a plain-text (markdown) equivalent. Others render
// but stay inert (no format in a plain text field).
export const ACTIVE_EDITOR_ICONS: readonly EditorIconId[] = [
  "bold",
  "italic",
  "underline",
  "textUnderline",
  "textSlash",
  "list",
  "orderedList",
  "quote",
  "image"
];

export function applyEditorAction(id: EditorIconId, state: EditorState): EditorState | null {
  switch (id) {
    case "bold":
      return wrapSelection(state, "**", "**");
    case "italic":
      return wrapSelection(state, "*", "*");
    case "underline":
      return wrapSelection(state, "<u>", "</u>");
    case "textUnderline":
      return wrapSelection(state, "~~", "~~");
    case "textSlash":
      return clearFormatting(state);
    case "list":
      return togglePrefixLines(state, "- ");
    case "quote":
      return togglePrefixLines(state, "> ");
    case "orderedList":
      return numberLines(state);
    case "image":
      return insertAtCursor(state, "![image](upload)");
    default:
      return null;
  }
}
