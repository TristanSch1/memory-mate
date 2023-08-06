import { Loader as Spinner } from "lucide-react";

type Props = {};

export const Loader = (props: Props) => {
  return <Spinner className={"animate-scale"} />;
};
