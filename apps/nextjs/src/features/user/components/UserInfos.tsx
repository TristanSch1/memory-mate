import { type Session } from "next-auth";

import { UserAvatar } from "./UserAvatar";

type Props = {
  user: Session["user"];
};

export const UserInfos = ({ user }: Props) => {
  return (
    <div className={"flex flex-col items-center"}>
      <UserAvatar
        src={user.image}
        fallback={user.name?.charAt(0)}
        alt={user.name}
      />
      <div className={"mt-4 flex flex-col items-center"}>
        <h2 className={"text-2xl font-bold sm:text-3xl lg:text-4xl"}>
          {user.name}
        </h2>
        <span
          className={"text-muted-foreground text-base sm:text-lg lg:text-xl"}
        >
          {user.email}
        </span>
      </div>
    </div>
  );
};
