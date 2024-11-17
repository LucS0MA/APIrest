import { useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import { useQuery } from '@apollo/client';
import { GET_ALL_ADS } from "../queries/queries";

function RecentAds() {
  const { loading, error, data } = useQuery(GET_ALL_ADS);
  const [total, setTotal] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total : {total} €</p>
      <button
        onClick={() => {
          setTotal(0);
        }}
      >
        Vider total
      </button>
      <section className="recent-ads">
        {data.getAllAds.map((ad: AdCardProps) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              pictures={ad.pictures}
              title={ad.title}
              description={ad.description}
              location={ad.location}
              createdAt={ad.createdAt}
              owner={ad.owner}
              category={ad.category}
              tag={ad.tag}
              price={ad.price}
            />
            <button
              onClick={() => {
                setTotal(total + ad.price);
              }}
              className="button"
            >
              Add to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default RecentAds;
