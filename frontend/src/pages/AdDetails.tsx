import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AdCardProps } from "../components/AdCard";
import axios from "axios";

function AdDetails() {
  const { id } = useParams();
  const [adDetail, setAdDetail] = useState({} as AdCardProps);
  const [adDeleted, setAdDeleted] = useState(false);

  useEffect(() => {
    const fetchDataDetails = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/ad/${id}`);
        setAdDetail(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchDataDetails();
  }, [id]);

  const deleteAd = async () => {
    try {
      await axios.delete(`http://localhost:3000/ad/${id}`);
      setAdDeleted(!adDeleted);
    } catch (err) {
      console.log("error", err);
    }
  };

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

  return (
    <>
      {adDeleted ? (
        <h3>Annonce supprimée</h3>
      ) : (
        <main className="main-content">
          <h2 className="ad-details-title">{adDetail.title}</h2>
          <section className="ad-details">
            <div className="ad-details-image-container">
              <img className="ad-details-image" src={adDetail.picture} />
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
          <button className="button" onClick={deleteAd}>
            Supprimer l'annonce
          </button>
          <Link to={`/ad/modif/${id}`}>
            <button
              style={{ textDecoration: "none !important" }}
              className="button"
            >
              Modifier l'annonce
            </button>
          </Link>
        </main>
      )}
    </>
  );
}

export default AdDetails;
