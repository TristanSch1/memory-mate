import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  src?: string | null;
  alt?: string | null;
  fallback?: string | null;
};

export const UserAvatar = ({ src, alt, fallback }: Props) => {
  return (
    <Avatar className={"h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32"}>
      <AvatarImage src={src ?? undefined} alt={alt ?? undefined} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
