"use client";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { debounce } from "lodash";
import { HiMagnifyingGlass } from "react-icons/hi2";

import SearchMobile from "./SearchMobile";
import { getProducts } from "@/lib/products.api";
import { Product } from "@/Insfraestructure/Interfaces/products/product.interface";
import "./Search.scss";
import { useRouter } from "next/navigation";

interface Props {
  close: () => void;
}

interface SearchState {
  searchTerms: string;
  products: Product[];
  error: string | null;
  isLoading: boolean;
}

const OffertImages = () => {
  const images = useMemo(
    () => [
      { src: "/img/offert-uno.webp", alt: "Imagen de oferta 1" },
      { src: "/img/offert-dos.webp", alt: "Imagen de oferta 2" },
      { src: "/img/offert-tres.webp", alt: "Imagen de oferta 3" },
    ],
    []
  );

  return (
    <div className="images">
      {images.map((image, index) => (
        <div className="image-search" key={index}>
          <Link href="/section/product/all">
            <Image
              src={image.src}
              width={230}
              height={230}
              quality={100}
              alt={image.alt}
              className="img"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

const ProductItem = ({
  product,
  close,
}: {
  product: Product;
  close: () => void;
}) => (
  <Link
    href={`/product/${product.id}`}
    className="link-product"
    onClick={() => close()}
  >
    <div className="image-img">
      <Image
        src={product.images[0]?.url || "/img/placeholder.webp"}
        width={100}
        height={200}
        alt={product.name}
        className="img"
      />
    </div>
    <div className="content-inside">
      <div className="title-product">
        <p>{product.name}</p>
      </div>
      <div className="price-product">
        <p>$ {product.variants[0]?.price || "N/A"}</p>
      </div>
    </div>
  </Link>
);

function Search({ close }: Props) {
  const [searchState, setSearchState] = useState<SearchState>({
    searchTerms: "",
    products: [],
    error: null,
    isLoading: false,
  });

  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  const searchProducts = useCallback(async (searchTerm: string) => {
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
      const result = await getProducts({ name: searchTerm, limit: 4 });

      setSearchState((prev) => ({
        ...prev,
        products: result?.products ?? [],
        error: null,
        isLoading: false,
      }));
    } catch (error: any) {
      setSearchState((prev) => ({
        ...prev,
        products: [],
        error: error.message || "Error al buscar productos",
        isLoading: false,
      }));
    }
  }, []);

  const debouncedSearch = useMemo(() => {
    if (debounceRef.current) {
      debounceRef.current.cancel();
    }
    debounceRef.current = debounce(searchProducts, 500);
    return debounceRef.current;
  }, [searchProducts]);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setSearchState((prev) => ({
        ...prev,
        searchTerms: value,
      }));

      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchState.searchTerms.trim()) {
        router.push(
          `/section/product?name=${encodeURIComponent(
            searchState.searchTerms.trim()
          )}`
        );
        close();
      }
    },
    [searchState.searchTerms, router, close]
  );

  const cleanupDebounce = useCallback(() => {
    debounceRef.current?.cancel();
  }, []);

  const renderSearchResults = useMemo(() => {
    if (!searchState.searchTerms.trim()) {
      return null;
    }

    if (searchState.isLoading) {
      return <p>Buscando productos...</p>;
    }

    if (searchState.error) {
      return <p>Error: {searchState.error}</p>;
    }

    if (searchState.products.length === 0) {
      return (
        <p>No hay resultados para &quot;{searchState.searchTerms}&quot;</p>
      );
    }

    return (
      <div className="cont-array-products">
        <div className="search-current">
          <div className="text">
            <p>Resultados para: {searchState.searchTerms}</p>
          </div>
        </div>
        <div className="search-current">
          <div className="text">
            <p>Resultados</p>
          </div>
          <div className="text">
            <p>{searchState.products.length}</p>
          </div>
        </div>
        <div className="products">
          {searchState.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              close={() => close()}
            />
          ))}
        </div>
      </div>
    );
  }, [searchState, close]);

  return (
    <>
      <div className="search">
        <div className="search__container">
          <div className="search-inside">
            <div className="input-search">
              <input
                autoFocus
                type="text"
                placeholder="¿Qué estás buscando?"
                value={searchState.searchTerms}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                onBlur={cleanupDebounce}
              />
            </div>
            <div className="icono">
              <HiMagnifyingGlass className="icon" />
            </div>
          </div>

          {renderSearchResults}

          <OffertImages />
        </div>
      </div>
      <SearchMobile close={close} />
    </>
  );
}

export default Search;
