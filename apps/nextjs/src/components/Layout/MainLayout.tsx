const SideNav = () => {
  return (
    <div className="flex h-screen w-96 flex-col items-center border-r border-solid border-white">
      Side nav
    </div>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div
      className={"flex bg-neutral-950 text-neutral-50"}
    >
      <SideNav />
      <main className={"w-full px-12 py-8"}>{children}</main>
    </div>
  );
};

export default MainLayout;
