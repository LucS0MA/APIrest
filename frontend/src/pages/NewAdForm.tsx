import {
  useCreateAdMutation,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";
import CreateOrUpdateAdForm from "../components/CreateOrUpdateAdForm";

const NewAdFormPage = () => {
  const [createNewAd] = useCreateAdMutation({
    refetchQueries: [GET_ALL_ADS],
  });
  return (
    <CreateOrUpdateAdForm defaultValues={{}} submitToBackend={createNewAd} />
  );
};


export default NewAdFormPage;
