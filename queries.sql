SELECT ads.title, ads.description, category.name AS category
FROM ads
LEFT JOIN category ON category.id = ads.category_id;
