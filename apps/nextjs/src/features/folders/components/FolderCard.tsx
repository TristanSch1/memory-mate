import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconWithLabel } from "@/components/ui/icon-with-label";
import { URLPath } from "@/routes";
import dayjs from "dayjs";
import { Book, PenSquare } from "lucide-react";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  folder: RouterOutputs["folder"]["all"][number];
};

export const FolderCard = ({ folder }: Props) => {
  return (
    <Link href={URLPath.folder(folder.id)}>
      <Card>
        <CardHeader>
          <CardTitle>{folder.name}</CardTitle>
        </CardHeader>
        <CardFooter className={"space-x-2"}>
          <IconWithLabel label={folder._count.decks} icon={Book} />
          <IconWithLabel
            label={dayjs(folder.createdAt).fromNow()}
            icon={PenSquare}
          />
        </CardFooter>
      </Card>
    </Link>
  );
};
