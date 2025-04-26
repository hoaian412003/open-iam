import { getCredentialProviders } from "./actions/get";
import { BreadCump } from "./components/BreadCump";
import { CredentialList } from "./components/CredentialList";

const CredentailsPage = async () => {
  const credentials = await getCredentialProviders();

  return (
    <div id="credentails-page">
      <BreadCump />
      <p className="text-2xl font-bold mt-2">Social Sign In</p>
      <p className="text-md font-semibold mt-2 text-gray-500">
        Allow users to sign in using their social accounts. This is a great way
        to simplify the sign-in process and improve user experience.
      </p>
      <CredentialList data={credentials} />
    </div>
  );
};

export default CredentailsPage;
