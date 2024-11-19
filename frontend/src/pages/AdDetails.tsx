import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteAdMutation, useGetAdByIdQuery } from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";


function AdDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [adDeleted, setAdDeleted] = useState(false);
  const { loading, error, data } = useGetAdByIdQuery({
    variables: { getAdByIdId: Number(id) },
  });
  const [deleteAdMutation] = useDeleteAdMutation({refetchQueries: [GET_ALL_ADS]});

  const deleteAd = async () => {
    try {
      await deleteAdMutation({
        variables: { deleteAdId: Number(id) },
      });
      toast.success("Ad has been deleted");
      navigate("/");
      setAdDeleted(true);
    } catch (err) {
      console.error("Error during ad deletion:", err);
      toast.error("Error has been detected");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const adDetail = data?.getAdById;

  console.log(adDetail)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (adDetail) {
    return (
      <>
        {adDeleted ? (
          <h3>Annonce supprimée</h3>
        ) : (
          <main className="main-content-detail">
            <h2 className="ad-details-title">{adDetail.title}</h2>
            <section className="ad-details">
              <div className="ad-details-image-container">
                {adDetail.pictures && adDetail.pictures.length > 0 ? (
                  adDetail.pictures.map((el) => (
                    <img
                      key={el.id}
                      className="ad-details-image"
                      src={el.url}
                      alt={el.url}
                    />
                  ))
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <div className="ad-details-info">
                <div className="ad-details-price">{adDetail.price} €</div>
                <div className="ad-details-description">
                  {adDetail.description}
                </div>
                <hr className="separator" />
                <div className="ad-details-owner">
                  Annoncée publiée par <b>{adDetail.owner}</b>{" "}
                  {formatDate(adDetail.createdAt)}.
                </div>
                <a
                  href="mailto:serge@serge.com"
                  className="button button-primary link-button"
                >
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                    stroke="currentcolor; stroke-width: 2.5; fill: none"
                  >
                    <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
                  </svg>
                  Envoyer un email
                </a>
              </div>
            </section>
            <div className="detailButtons">
              <button className="button" onClick={deleteAd}>
                Supprimer l'annonce
              </button>
              <Link to={`/ad/modif/${id}`} className="noUnder">
                <a
                  style={{ textDecoration: "none !important" }}
                  className="button"
                >
                  Modifier l'annonce
                </a>
              </Link>
            </div>
          </main>
        )}
      </>
    );
  }
}

export default AdDetails;
