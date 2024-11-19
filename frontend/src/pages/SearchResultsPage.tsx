import { useState } from "react";
import AdCard from "../components/AdCard";
import { useParams } from "react-router-dom";
import { useGetAdsByKeywordQuery } from "../generated/graphql-types";

function SearchResultPage() {
  const [total, setTotal] = useState(0);
  const { keyword } = useParams();

  if (!keyword) {
    return <p>Veuillez fournir un mot-clé valide.</p>;
  }

  const { loading, error, data } = useGetAdsByKeywordQuery({
    variables: { adTitle: keyword?.toString() },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("data by keyword", data);

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
      <section className="recent-ads-search">
        {data?.getAdsByKeyword.map((ad) => (
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

export default SearchResultPage;
