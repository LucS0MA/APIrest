import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";

function RecentAds() {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState([] as AdCardProps[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/ad");
        console.log(result.data);
        setAds(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);

  console.log(ads);

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
        {ads.map((ad) => (
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
