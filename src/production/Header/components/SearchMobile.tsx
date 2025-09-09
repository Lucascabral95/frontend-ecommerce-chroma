import {
  ChangeEvent,
  useState,
  useCallback,
  useMemo,
  KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi";

import { getProducts } from "@/lib/products.api";
import { Product } from "@/Insfraestructure/Interfaces/products/product.interface";
import "./Search.scss";

interface Props {
  close: () => void;
}

const OfferImages = () => (
  <div className="images">
    {[
      { src: "/img/offert-uno.webp", alt: "Imagen de oferta 1" },
      { src: "/img/offert-dos.webp", alt: "Imagen de oferta 2" },
      { src: "/img/offert-tres.webp", alt: "Imagen de oferta 3" },
    ].map((image, index) => (
      <div className="img" key={index}>
        <Link href="/section/product/all">
          <Image
            className="img-img"
            src={image.src}
            width={230}
            height={230}
            alt={image.alt}
          />
        </Link>
      </div>
    ))}
  </div>
);

function SearchMobile({ close }: Props) {
  const [searchState, setSearchState] = useState({
    searchTerms: "",
    products: [] as Product[],
    error: null as string | null,
    isLoading: false,
  });
  const router = useRouter();

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const performSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchState((prev) => ({
        ...prev,
        products: [],
        error: null,
        isLoading: false,
      }));
      return;
    }

    setSearchState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await getProducts({ name: searchTerm, limit: 4 });
      setSearchState((prev) => ({
        ...prev,
        products: res?.products ?? [],
        error: null,
        isLoading: false,
      }));
    } catch (err: any) {
      setSearchState((prev) => ({
        ...prev,
        products: [],
        error: err.message || "Error al buscar productos",
        isLoading: false,
      }));
    }
  }, []);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value;

      setSearchState((prev) => ({ ...prev, searchTerms: newSearchTerm }));

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const newTimer = setTimeout(() => {
        performSearch(newSearchTerm);
      }, 300);

      setDebounceTimer(newTimer);
    },
    [debounceTimer, performSearch]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        router.push(`/section/product?name=${searchState.searchTerms}`);
        close();
      }
    },
    [router, searchState.searchTerms, close]
  );

  const productList = useMemo(() => {
    if (searchState.products.length === 0) return null;

    return (
      <div className="array-products">
        {searchState.products.map((product) => (
          <Link
            className="link-product"
            href={`/product/${product.id}`}
            key={product.id}
            onClick={() => close()}
          >
            <div className="image-array">
              <Image
                className="img-image"
                src={product.images[0]?.url || "/img/placeholder.webp"}
                width={100}
                height={100}
                alt={product.name}
              />
            </div>
            <div className="text-array">
              <div className="text-name">
                <p>{product.name}</p>
              </div>
              <div className="text-price">
                <p>{product.basePrice}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }, [searchState.products, close]);

  const searchContent = useMemo(() => {
    if (searchState.error && !searchState.searchTerms) {
      return (
        <div>
          <p>Error: {searchState.error}</p>
        </div>
      );
    }

    if (searchState.products.length > 0) {
      return (
        <div className="products">
          <div className="search-list">
            <div className="text">
              <p className="search-list-text">
                La búsqueda es: {searchState.searchTerms}
              </p>
            </div>
          </div>
          <div className="search-list">
            <div className="text">
              <p className="search-list-text">Resultados</p>
            </div>
            <div className="text">
              <p className="search-list-text">{searchState.products.length}</p>
            </div>
          </div>
          {productList}
        </div>
      );
    }

    return <OfferImages />;
  }, [
    searchState.error,
    searchState.searchTerms,
    searchState.products,
    productList,
  ]);

  return (
    <div className="search-mobile" onClick={() => close()}>
      <div
        className="search-mobile__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="searcher-icon-input">
          <div className="icono" onClick={() => close()}>
            <HiArrowLeft className="icon" />
          </div>
          <div className="input-search">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              value={searchState.searchTerms}
            />
          </div>
        </div>
        <div className="content-results-search">
          {searchState.isLoading ? (
            <div className="loading">
              <p>Buscando...</p>
            </div>
          ) : (
            searchContent
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchMobile;
