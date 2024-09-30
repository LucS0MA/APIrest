import AdCard, { AdCardProps } from "./AdCard";

function RecentAds() {
  const ads: AdCardProps[] = [
    {
      imgUrl: "/images/table.webp",
      title: "Table",
      link: "/ads/table",
      price: 120,
    },
    {
      imgUrl: "/images/bougie.webp",
      title: "Bougie",
      link: "/ads/bougie",
      price: 8,
    },
    {
      imgUrl: "/images/dame-jeanne.webp",
      title: "Dame-jeanne",
      link: "/ads/dame-jeanne",
      price: 75,
    },
    {
      imgUrl: "/images/porte-magazine.webp",
      title: "Porte-magazine",
      link: "/ads/porte-magazine",
      price: 45,
    },
    {
      imgUrl: "/images/vaisselier.webp",
      title: "Vaisselier",
      link: "/ads/vaisselier",
      price: 900,
    },
    {
      imgUrl: "/images/vide-poche.webp",
      title: "Vide-poche",
      link: "/ads/vide-poche",
      price: 4,
    },
  ];
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <AdCard
            key={ad.title}
            imgUrl={ad.imgUrl}
            title={ad.title}
            link={ad.link}
            price={ad.price}
          />
        ))}
      </section>
    </>
  );
}

export default RecentAds;
