import { Input as TamaguiInput, XStack } from "tamagui";

import { SearchIcon } from "@/components/ui/icons";
import { colorValues } from "@/theme/tokens/color";
import { typography } from "@/theme/tokens";

type SearchInputProps = {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

// Controlled white search pill, autofocused on mount.
export function SearchInput({ onChange, placeholder, value }: SearchInputProps) {
  return (
    <XStack
      backgroundColor="$surfacePrimary"
      gap="$3"
      height={48}
      items="center"
      px="$3"
      rounded="$xxl"
      width="100%"
    >
      <SearchIcon color={colorValues.grey400} size={24} />
      <TamaguiInput
        autoFocus
        backgroundColor="$transparent"
        borderWidth={0}
        color="$inputText"
        flex={1}
        fontFamily="$body"
        fontSize={typography.body1.fontSize}
        height="100%"
        numberOfLines={1}
        paddingVertical={0}
        placeholder={placeholder}
        placeholderTextColor="$inputPlaceholder"
        textAlignVertical="center"
        unstyled
        value={value}
        onChangeText={onChange}
      />
    </XStack>
  );
}
