import { useState } from "react";
import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FIELD_LIMITS } from "@/lib/constants/field-limits";

import { profileContent } from "../constants/profile-content";
import type { useAccountForm } from "../hooks/use-account-form";
import { PasswordInput } from "@/features/auth/components/password-input";

type AccountFormProps = { form: ReturnType<typeof useAccountForm> };

// Account edit fields + Save CTA. All state lives in the hook; this is layout.
export function AccountForm({ form }: AccountFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <YStack gap="$6" width="100%">
      <YStack gap="$4" width="100%">
        <Input
          appearance="outline"
          containerWidth="100%"
          label={profileContent.account.firstName.label}
          maxLength={FIELD_LIMITS.name}
          placeholder={profileContent.account.firstName.placeholder}
          rounded="$sm"
          value={form.firstName}
          onChangeText={form.setFirstName}
        />
        <Input
          appearance="outline"
          containerWidth="100%"
          label={profileContent.account.lastName.label}
          maxLength={FIELD_LIMITS.name}
          placeholder={profileContent.account.lastName.placeholder}
          rounded="$sm"
          value={form.lastName}
          onChangeText={form.setLastName}
        />
        <Input
          appearance="outline"
          autoCapitalize="none"
          containerWidth="100%"
          helperText={form.emailError ?? undefined}
          keyboardType="email-address"
          label={profileContent.account.email.label}
          placeholder={profileContent.account.email.placeholder}
          rounded="$sm"
          status={form.emailError ? "error" : "default"}
          value={form.email}
          onChangeText={form.setEmail}
        />
        <PasswordInput
          appearance="outline"
          containerWidth="100%"
          label={profileContent.account.password.label}
          placeholder={profileContent.account.password.placeholder}
          rounded="$sm"
          showPassword={showPassword}
          value={form.password}
          onChangeText={form.setPassword}
          onToggleShowPassword={() => setShowPassword((prev) => !prev)}
        />
      </YStack>

      <Button
        appearance="filled"
        disabled={!form.isValid || form.isSaving}
        rounded="$xxl"
        size="large"
        width="100%"
        onPress={form.handleSave}
      >
        {profileContent.account.save}
      </Button>
    </YStack>
  );
}
