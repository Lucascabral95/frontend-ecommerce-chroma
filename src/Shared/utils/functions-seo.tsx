export const getOptimizedKeywords = (category: string) => {
  const baseKeywords =
    "indumentaria masculina, ropa hombre, moda masculina, Chroma";

  const categoryKeywords = {
    "1a2b3c4d-5e6f-4789-a012-123456789abc": `${baseKeywords}, sweaters, pullovers, jerseys, buzos de lana, suéteres, sweaters hombre, sweaters mujer, sweaters unisex, sweaters invierno, pullover lana, jersey tejido, buzo cerrado, sweater cuello redondo, sweater cuello V, sweater oversize, sweater slim fit, ropa de abrigo, tejidos invierno`,

    "2b3c4d5e-6f7a-4890-b123-23456789abcd": `${baseKeywords}, camperas, chaquetas, jackets, cazadoras, camperas hombre, camperas mujer, camperas invierno, campera de cuero, campera jean, campera bomber, campera deportiva, chaqueta casual, jacket denim, cazadora urbana, abrigos livianos, campera entretiempo, outerwear`,

    "3c4d5e6f-7a8b-4901-c234-3456789abcde": `${baseKeywords}, remeras manga larga, camisetas manga larga, playeras manga larga, remeras básicas, long sleeve, remeras algodón, camisetas largas, remeras casual, remeras hombre, remeras mujer, basic tees, remeras lisas, remeras estampadas, tops manga larga`,

    "5e6f7a8b-9c0d-4123-e456-56789abcdef0": `${baseKeywords}, sobretodos, abrigos largos, tapados, coats, sobretodo hombre, sobretodo mujer, abrigo formal, tapado invierno, coat largo, sobretodo lana, abrigo elegante, outerwear formal, ropa de abrigo, sobretodo clásico, gabardinas largas`,

    "6fddfssdf-0d1e-4234-f567-6789abcdef01": `${baseKeywords}, sacos, blazers, americanas, chaquetas formales, saco hombre, saco mujer, blazer formal, saco sport, americana casual, chaqueta elegante, saco traje, blazer trabajo, sacos oficina, formal wear, ropa ejecutiva`,

    "6f7a8b9c-0d1e-32432-f567-6789abcdef01": `${baseKeywords}, jeans, vaqueros, pantalones de mezclilla, denim, jeans hombre, jeans mujer, pantalones jean, vaqueros azules, denim pants, jeans slim, jeans regular, jeans skinny, jeans boyfriend, pantalones casuales, ropa denim`,

    "6f7a8b9c-0d1e-4234-f567-6789abcdef01": `${baseKeywords}, pantalones de vestir, pantalones formales, dress pants, pantalones elegantes, pantalones oficina, pantalones trabajo, formal pants, pantalones clásicos, pantalones ejecutivos, ropa formal, pantalones traje, vestimenta profesional`,

    "6f7a8b9c-0d1e-4234-2222-6789abcdef01": `${baseKeywords}, camisas de vestir, camisas formales, dress shirts, camisas elegantes, camisas oficina, camisas trabajo, formal shirts, camisas clásicas, camisas ejecutivas, camisas blancas, camisas celestes, vestimenta profesional, ropa formal`,

    "6f7a8b9c-0q23d1e-4234-2222-6789abcdef82": `${baseKeywords}, trajes, suits, trajes hombre, trajes formales, conjuntos formales, traje completo, suit formal, trajes oficina, trajes trabajo, formal wear, ropa ejecutiva, vestimenta elegante, trajes clásicos, suits business`,

    "6f7a8b9c-uygw7u83-4234-2222-6789abcdes83": `${baseKeywords}, chombas, polos, camisetas polo, polo shirts, chomba hombre, chomba mujer, polos piqué, camisetas deportivas, polo casual, chomba manga corta, polo clásico, sportswear, ropa sport casual, tops polo`,
  };

  return (
    categoryKeywords[category as keyof typeof categoryKeywords] || baseKeywords
  );
};

export const getOptimizedDescription = (category: string) => {
  const baseDescription =
    "Descubre toda nuestra colección de indumentaria masculina premium en Chroma.";

  const categoryDescription = {
    "1a2b3c4d-5e6f-4789-a012-123456789abc": `${baseDescription} Sweaters elegantes, pullovers, jerseys, buzos de lana, suéteres premium, sweaters hombre, sweaters mujer, sweaters unisex, sweaters invierno, pullover lana merino, jersey tejido, buzo cerrado, sweater cuello redondo, sweater cuello V, sweater oversize, sweater slim fit, ropa de abrigo, tejidos invierno, knitwear, sweaters casuales, sweaters formales`,

    "2b3c4d5e-6f7a-4890-b123-23456789abcd": `${baseDescription} Camperas premium, chaquetas, jackets, cazadoras urbanas, camperas hombre, camperas mujer, camperas invierno, campera de cuero genuino, campera jean, campera bomber, campera deportiva, chaqueta casual, jacket denim, cazadora urbana, abrigos livianos, campera entretiempo, outerwear, camperas impermeables, jackets casuales, chaquetas formales`,

    "3c4d5e6f-7a8b-4901-c234-3456789abcde": `${baseDescription} Remeras manga larga premium, camisetas manga larga, playeras manga larga, remeras básicas, long sleeve shirts, remeras algodón pima, camisetas largas, remeras casual, remeras hombre, remeras mujer, basic tees, remeras lisas, remeras estampadas, tops manga larga, camisetas deportivas, remeras térnicas, long sleeve casual`,

    "5e6f7a8b-9c0d-4123-e456-56789abcdef0": `${baseDescription} Sobretodos elegantes, abrigos largos, tapados premium, coats, sobretodo hombre, sobretodo mujer, abrigo formal, tapado invierno, coat largo, sobretodo lana, abrigo elegante, outerwear formal, ropa de abrigo, sobretodo clásico, gabardinas largas, abrigos ejecutivos, coats formales, sobretodos oficina`,

    "6fddfssdf-0d1e-4234-f567-6789abcdef01": `${baseDescription} Sacos elegantes, blazers premium, americanas, chaquetas formales, saco hombre, saco mujer, blazer formal, saco sport, americana casual, chaqueta elegante, saco traje, blazer trabajo, sacos oficina, formal wear, ropa ejecutiva, blazers casuales, sacos vestir, americanas formales`,

    "6f7a8b9c-0d1e-32432-f567-6789abcdef01": `${baseDescription} Jeans premium, vaqueros, pantalones de mezclilla, denim de calidad, jeans hombre, jeans mujer, pantalones jean, vaqueros azules, denim pants, jeans slim fit, jeans regular, jeans skinny, jeans boyfriend, pantalones casuales, ropa denim, jeans stretch, vaqueros clásicos, denim fashion`,

    "6f7a8b9c-0d1e-4234-f567-6789abcdef01": `${baseDescription} Pantalones de vestir elegantes, pantalones formales, dress pants, pantalones elegantes, pantalones oficina, pantalones trabajo, formal pants, pantalones clásicos, pantalones ejecutivos, ropa formal, pantalones traje, vestimenta profesional, pantalones de lana, formal wear, pantalones business`,

    "6f7a8b9c-0d1e-4234-2222-6789abcdef01": `${baseDescription} Camisas de vestir premium, camisas formales, dress shirts, camisas elegantes, camisas oficina, camisas trabajo, formal shirts, camisas clásicas, camisas ejecutivas, camisas blancas, camisas celestes, vestimenta profesional, ropa formal, camisas business, shirts formales, camisas algodón`,

    "6f7a8b9c-0q23d1e-4234-2222-6789abcdef82": `${baseDescription} Trajes elegantes, suits premium, trajes hombre, trajes formales, conjuntos formales, traje completo, suit formal, trajes oficina, trajes trabajo, formal wear, ropa ejecutiva, vestimenta elegante, trajes clásicos, suits business, trajes de lana, formal suits, trajes ceremonia`,

    "6f7a8b9c-uygw7u83-4234-2222-6789abcdes83": `${baseDescription} Chombas premium, polos elegantes, camisetas polo, polo shirts, chomba hombre, chomba mujer, polos piqué, camisetas deportivas, polo casual, chomba manga corta, polo clásico, sportswear, ropa sport casual, tops polo, chombas algodón, polos formales, polo shirts premium`,
  };

  return (
    categoryDescription[category as keyof typeof categoryDescription] ||
    baseDescription
  );
};

export const getOptimizedTitle = (category: string) => {
  const baseDescription = "Indumentaria Masculina Premium | Chroma.";

  const categoryDescription = {
    "1a2b3c4d-5e6f-4789-a012-123456789abc": ` Los mejores Sweaters para hombre - ${baseDescription}`,

    "2b3c4d5e-6f7a-4890-b123-23456789abcd": ` Los mejores Camperas para hombre - ${baseDescription}`,

    "3c4d5e6f-7a8b-4901-c234-3456789abcde": ` Los mejores Remeras para hombre - ${baseDescription}`,

    "6fddfssdf-0d1e-4234-f567-6789abcdef01": ` Los mejores Sacos para hombre - ${baseDescription}`,

    "6f7a8b9c-0d1e-32432-f567-6789abcdef01": ` Los mejores Jeans para hombre - ${baseDescription}`,

    "6f7a8b9c-0d1e-4234-f567-6789abcdef01": ` Los mejores Pantalones de Vestir para hombre - ${baseDescription}`,

    "6f7a8b9c-0d1e-4234-2222-6789abcdef01": ` Los mejores Camisas de Vestir para hombre - ${baseDescription}`,

    "6f7a8b9c-0q23d1e-4234-2222-6789abcdef82": ` Los mejores Trajes para hombre - ${baseDescription}`,

    "6f7a8b9c-uygw7u83-4234-2222-6789abcdes83": ` Los mejores Chombas para hombre - ${baseDescription}`,
  };

  return (
    categoryDescription[category as keyof typeof categoryDescription] ||
    baseDescription
  );
};
