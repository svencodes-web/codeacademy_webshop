const createProductMap = ({
  id,
  name,
  description,
  priceInCents,
  imageUrl,
}) => {
  return {
    id: id,
    name: name,
    description: description,
    price_cents: priceInCents,
    image_url: imageUrl,
  };
};

const updateProductMap = ({
  id,
  name,
  description,
  priceInCents,
  imageUrl,
}) => {
  return {
    id: id,
    name: name,
    description: description,
    price_cents: priceInCents,
    image_url: imageUrl,
  };
};
export { createProductMap, updateProductMap };
