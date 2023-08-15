import Image from "next/image";

import logo from "/public/logo.svg";

type Props = {};

export const Logo = (props: Props) => {
  return (
    <div className={"relative h-12 w-12"}>
      <Image src={logo} alt={"memory-mate logo"} width={80} height={80} />
    </div>
  );
};
