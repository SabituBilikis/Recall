import { Surface } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

type StateMessageProps = {
  actionLabel?: string;
  description: string;
  onAction?: () => void;
  title: string;
};

export function StateMessage({
  actionLabel,
  description,
  onAction,
  title
}: StateMessageProps) {
  return (
    <Surface emphasis="subtle" gap="$3" p="$6">
      <Typography variant="h3">
        {title}
      </Typography>
      <Typography tone="secondary" variant="body1">
        {description}
      </Typography>
      {actionLabel && onAction ? (
        <Button onPress={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Surface>
  );
}
