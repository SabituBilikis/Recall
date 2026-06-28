import { useState } from "react";
import { Input as TamaguiInput, YStack } from "tamagui";

import { tileBorderWidths, typography } from "@/theme/tokens";

import { applyEditorAction, type TextSelection } from "../utils/editor-format";
import type { EditorIconId } from "./editor-icons";
import { EditorToolbar } from "./editor-toolbar";

type RichTextEditorProps = {
  onChangeText: (value: string) => void;
  placeholder?: string;
  value: string;
};

// Decorative-looking toolbar that applies markdown-style formatting to the
// plain content area, preserving the cursor/selection.
export function RichTextEditor({ onChangeText, placeholder, value }: RichTextEditorProps) {
  const [selection, setSelection] = useState<TextSelection>({ start: 0, end: 0 });

  function handleAction(id: EditorIconId) {
    const next = applyEditorAction(id, { text: value, selection });
    if (!next) {
      return;
    }
    onChangeText(next.text);
    setSelection(next.selection);
  }

  function handleSelectionChange(event: { nativeEvent: { selection: TextSelection } }) {
    setSelection(event.nativeEvent.selection);
  }

  return (
    <YStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      overflow="hidden"
      rounded="$sm"
      width="100%"
    >
      <EditorToolbar onAction={handleAction} />
      <TamaguiInput
        backgroundColor="$transparent"
        borderWidth={0}
        color="$inputText"
        fontFamily="$body"
        fontSize={typography.body3.fontSize}
        height={204}
        multiline
        p="$3.5"
        placeholder={placeholder}
        placeholderTextColor="$inputPlaceholder"
        selection={selection}
        textAlignVertical="top"
        unstyled
        value={value}
        onChangeText={onChangeText}
        onSelectionChange={handleSelectionChange}
      />
    </YStack>
  );
}
