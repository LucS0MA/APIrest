import { useParams } from "react-router-dom";
import {
  useGetAdByIdQuery,
  useUpdateAdMutation,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";
import CreateOrUpdateAdForm from "../components/CreateOrUpdateAdForm";

const AdModification = () => {
  const { id } = useParams();
  const { data, error, loading } = useGetAdByIdQuery({
    variables: { getAdByIdId: parseInt(id as string) },
  });
  const [updateAdById] = useUpdateAdMutation({
    refetchQueries: [GET_ALL_ADS],
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    console.log("data", data);
    return (
      <CreateOrUpdateAdForm
        defaultValues={{
          ...data.getAdById,
          createdAt: data.getAdById.createdAt.slice(0, 10),
          category: data.getAdById?.category?.id,
          tag: data.getAdById?.tag?.map((t: any) => t.id.toString()),
        }}
        submitToBackend={updateAdById}
      />
    );
  }
};

export default AdModification;
