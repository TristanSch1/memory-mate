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

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={"flex"}>
      <SideNav />
      <main className={"w-full px-12 py-8"}>{children}</main>
    </div>
  );
};
