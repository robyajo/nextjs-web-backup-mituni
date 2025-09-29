import { Footer } from "./footer";
import { Header } from "./header";

interface ProvidersProps {
  children: React.ReactNode;
}

export const PageProviders = ({ children }: ProvidersProps) => {
  return (
    <div className="size-full py-3">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
