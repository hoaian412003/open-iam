import Header from "./header";
import { Navbar } from "./navbar";

export default async function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-purple-50 min-h-screen flex flex-col" id="app-container">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <div
          className="bg-white w-full p-4 rounded-3xl shadow-md"
          id="page-container"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
