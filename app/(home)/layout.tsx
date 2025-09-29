
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* <HomeHeader /> */}
        {children}
        {/* <HomeFooter /> */}
      </div>
    </>
  );
}
