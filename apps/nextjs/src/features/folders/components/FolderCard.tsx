import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconWithLabel } from "@/components/ui/icon-with-label";
import { FolderOptionsDropdown } from "@/features/folders";
import { URLPath } from "@/routes";
import dayjs from "dayjs";
import { Book, MoreVertical, PenSquare } from "lucide-react";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  folder: RouterOutputs["folder"]["all"][number];
};

export const FolderCard = ({ folder }: Props) => {
  return (
    <Card className={"card-hover relative flex items-start justify-between"}>
      <Link href={URLPath.folder(folder.id)} className={"block flex-1"}>
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
      </Link>
      <div className={"absolute right-1 top-2"}>
        <FolderOptionsDropdown folder={folder} className={"mr-2 mt-2"}>
          <MoreVertical
            className={"text-neutral-500 group-hover:text-neutral-950"}
          />
        </FolderOptionsDropdown>
      </div>
    </Card>
  );
};
