import { useRive } from "@rive-app/react-canvas";

export const Loader = () => {
  const { rive, RiveComponent } = useRive({
    src: "/muscle_brain.riv",
    autoplay: true,
    stateMachines: "State Machine 1",
    artboard: "muscle brain",
  });

  return (
    <div className={"flex h-full w-full items-center justify-center"}>
      <div className={"h-[90px] w-[90px]"}>
        <RiveComponent />
      </div>
    </div>
  );
};
