import { XStack, YStack } from "tamagui";

import { ACTIVE_EDITOR_ICONS } from "../utils/editor-format";
import {
  EditorGlyph,
  editorToolbarRowOne,
  editorToolbarRowTwoAlign,
  editorToolbarRowTwoLeft,
  type EditorIconId
} from "./editor-icons";

// Working buttons format the text; the rest render but stay inert (dimmed),
// since a plain text field has no equivalent (color/font/align).
function ToolbarButton({ id, onAction }: { id: EditorIconId; onAction: (id: EditorIconId) => void }) {
  const isActive = ACTIVE_EDITOR_ICONS.includes(id);

  return (
    <YStack
      opacity={isActive ? 1 : 0.35}
      p="$1"
      pressStyle={isActive ? { opacity: 0.5 } : undefined}
      rounded="$md"
      onPress={isActive ? () => onAction(id) : undefined}
    >
      <EditorGlyph id={id} size={20} />
    </YStack>
  );
}

export function EditorToolbar({ onAction }: { onAction: (id: EditorIconId) => void }) {
  return (
    <YStack borderBottomWidth={1} borderColor="$borderSubtle" gap="$2" p="$3" width="100%">
      <XStack gap="$1" items="center">
        {editorToolbarRowOne.map((id) => (
          <ToolbarButton id={id} key={id} onAction={onAction} />
        ))}
      </XStack>
      <XStack gap="$2" items="center">
        {editorToolbarRowTwoLeft.map((id) => (
          <ToolbarButton id={id} key={id} onAction={onAction} />
        ))}
        <YStack backgroundColor="$borderSubtle" height={16} mx="$1" width={1} />
        {editorToolbarRowTwoAlign.map((id) => (
          <ToolbarButton id={id} key={id} onAction={onAction} />
        ))}
      </XStack>
    </YStack>
  );
}
