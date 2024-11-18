import { useState } from "react";
import AdCard from "./AdCard";
import { useGetAllAdsQuery } from "../generated/graphql-types";

function RecentAds() {
  const { loading, error, data } = useGetAllAdsQuery();
  const [total, setTotal] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data?.getAllAds)

  if (data) {
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
          {data.getAllAds.map((el) => (
            <div key={el.id}>
              <AdCard
                id={el.id}
                pictures={el.pictures}
                title={el.title}
                description={el.description}
                location={el.location}
                createdAt={el.createdAt}
                owner={el.owner}
                category={el.category}
                tag={el.tag}
                price={el.price}
              />
              <button
                onClick={() => {
                  setTotal(total + el.price);
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
}

export default RecentAds;
