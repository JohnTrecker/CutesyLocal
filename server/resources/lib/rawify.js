exports simplify = (geojson) => {
  return geojson.features.map((entry) => {
    return {
      name: entry.name,
      longitude: entry.geometry.coordinates[1],
      latitude: entry.geometry.coordinates[0],
      imageUrl: entry.imageUrl,
      venueType: entry.venueType || (entry.name.includes('Park') ? 'park' : 'restaurant'),
      reviews: entry.reviews.map((review) => review )
    };
  });
};