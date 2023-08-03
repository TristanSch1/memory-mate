import { Button, type ButtonProps } from "@/components/ui/button";

export const FlipButton = (props: ButtonProps) => {
  return (
    <Button size={"lg"} {...props}>
      Flip
    </Button>
  );
};
