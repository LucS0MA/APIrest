import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";

function RecentAds() {
  // const adsList: AdCardProps[] = [
  //   {
  //     imgUrl: "/images/table.webp",
  //     title: "Table",
  //     link: "/ads/table",
  //     price: 120,
  //   },
  //   {
  //     imgUrl: "/images/bougie.webp",
  //     title: "Bougie",
  //     link: "/ads/bougie",
  //     price: 8,
  //   },
  //   {
  //     imgUrl: "/images/dame-jeanne.webp",
  //     title: "Dame-jeanne",
  //     link: "/ads/dame-jeanne",
  //     price: 75,
  //   },
  //   {
  //     imgUrl: "/images/porte-magazine.webp",
  //     title: "Porte-magazine",
  //     link: "/ads/porte-magazine",
  //     price: 45,
  //   },
  //   {
  //     imgUrl: "/images/vaisselier.webp",
  //     title: "Vaisselier",
  //     link: "/ads/vaisselier",
  //     price: 900,
  //   },
  //   {
  //     imgUrl: "/images/vide-poche.webp",
  //     title: "Vide-poche",
  //     link: "/ads/vide-poche",
  //     price: 4,
  //   },
  // ];

  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          "http://localhost:3000/ad"
        );
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
              imgUrl={ad.imgUrl}
              title={ad.title}
              link={ad.link}
              price={ad.price}
            />
            <button
              onClick={() => {
                setTotal(total + ad.price);
              }}
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
