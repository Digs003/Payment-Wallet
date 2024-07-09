import Sidebar from "../../components/ui/Sidebar";
import { getUser } from "../lib/actions/getUser";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const user = await getUser();
  return (
    <div className="w-auto h-auto">
      <Sidebar user={user} />
      <div className="p-6 pt-24 min-h-screen lg:ml-64">{children}</div>
    </div>
  );
}
