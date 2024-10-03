import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "../components/AdCard";
import axios from "axios";
import { useParams } from "react-router-dom";

function SearchCategoryPage() {
  const [total, setTotal] = useState(0);
  const { keyword } = useParams();
  const [ads, setAds] = useState([] as AdCardProps[]);

  useEffect(() => {
    const fetchSearchResultsCat = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/ad?category=${keyword}`
        );
        setAds(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchSearchResultsCat();
  }, [keyword]);

  console.log(keyword);

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
              picture={ad.picture}
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

export default SearchCategoryPage;
