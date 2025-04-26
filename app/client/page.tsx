import { getClients } from "./actions/get";
import { BreadCrumb } from "./components/BreadCrumb";
import { ClientList } from "./components/ClientList";
import { CreateClientModal } from "./components/createClient.modal";

const ClientPage = async () => {
  const clients = await getClients();

  return (
    <div id="client-page">
      {/* <CreateClientModal children={null} /> */}

      <div className="flex justify-between items-center">
        <BreadCrumb />
        <div className="flex gap-4">
          <CreateClientModal children={null} />
        </div>
      </div>

      <ClientList clients={clients} />
    </div>
  );
};

export default ClientPage;
