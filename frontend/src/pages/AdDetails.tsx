import { useParams } from "react-router-dom";

function AdDetails() {
  const { id } = useParams();

  return <div>AdDetails {id}</div>;
}

export default AdDetails;
