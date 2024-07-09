import DashboardPage from "../../../components/DashboardPage";
import { MobileCreate } from "../../../components/OtpComponent";
import { getUser } from "../../lib/actions/getUser";

export default async function () {
  const user = await getUser();
  if (!user?.number) {
    return (
      <div>
        <MobileCreate />
      </div>
    );
  }
  return (
    <>
      <DashboardPage user={user} />
    </>
  );
}
