import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { getIds, getSpecialIds, getProducts } from "../../api/api";
import item from "../../img/item.png";

function Content() {
  const loader = require("../../img/loading.gif");
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchOpt, setSearchOpt] = useState({
    product: "",
    price: "",
    brand: "",
  });
  useEffect(() => {
    getFullProducts(offset);
  }, [offset]);

  useEffect(() => {}, [page]);

  const isFilterSearch = (): boolean => {
    return (
      searchOpt.product !== "" ||
      searchOpt.price !== "" ||
      searchOpt.brand !== ""
    );
  };

  const getProductsOnPage = (products: [], page: number) => {
    let end = page * 50;
    let start = page * 50 - 50;
    return products.slice(start, end);
  };

  const nextPage = () => {
    if (isFilterSearch()) {
      setPage(page + 1);
      getSpecialProducts(page + 1);
      return;
    }

    setPage(page + 1);
    setOffset(offset + 50);
  };

  const prevPage = () => {
    if (isFilterSearch()) {
      setPage(page - 1);
      getSpecialProducts(page - 1);
      return;
    }

    setPage(page - 1);
    setOffset(offset - 50);
  };

  const inputSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOpt({ ...searchOpt, [evt.target.name]: evt.target.value });
  };

  const submitFunc = (evt: React.SyntheticEvent, page: number) => {
    evt.preventDefault();
    getSpecialProducts(1);
  };

  const getFullProducts = async (offset: number) => {
    setLoading(true);
    const uniqIds = await getIds(offset);
    const uniqProducts = await getProducts(uniqIds);
    setProducts(uniqProducts);
    setLoading(false);
  };

  const getSpecialProducts = async (curPage: number) => {
    setLoading(true);
    const specUniq = await getSpecialIds(searchOpt);
    const uniqProducts = await getProducts(specUniq);
    setProducts(getProductsOnPage(uniqProducts, curPage));
    setLoading(false);
  };

  return (
    <main className={styles.baseWrapper}>
      <div className={styles.baseWrapper}>
        <div className={styles.searchWrapper}>
          <p className={styles.searchTitle}>Поиск по :</p>
          <form
            className={styles.searchWrapper}
            onSubmit={(evt) => {
              submitFunc(evt, 1);
            }}
          >
            <ul className={styles.search}>
              <li>
                <input
                  className={styles.input}
                  placeholder="Названию"
                  value={searchOpt.product}
                  name="product"
                  onChange={inputSearch}
                  disabled={
                    searchOpt.brand.length > 0 || searchOpt.price.length > 0
                  }
                />
              </li>
              <li>
                <input
                  className={styles.input}
                  placeholder="Цене"
                  value={searchOpt.price}
                  name="price"
                  onChange={inputSearch}
                  type="number"
                  disabled={
                    searchOpt.brand.length > 0 || searchOpt.product.length > 0
                  }
                />
              </li>
              <li>
                <input
                  className={styles.input}
                  placeholder="Бренду"
                  value={searchOpt.brand}
                  name="brand"
                  onChange={inputSearch}
                  disabled={
                    searchOpt.price.length > 0 || searchOpt.product.length > 0
                  }
                />
              </li>
            </ul>
            <button
              className={styles.button}
              disabled={
                searchOpt.product.length === 0 &&
                searchOpt.price.length === 0 &&
                searchOpt.brand.length === 0
              }
            >
              Поиск
            </button>
          </form>
        </div>
        <div className={styles.pagesWrapper}>
          <button
            className={styles.pageButton}
            disabled={page === 1}
            onClick={prevPage}
          >
            Предыдущая страница
          </button>
          <div>{page}</div>
          <button
            className={styles.pageButton}
            onClick={nextPage}
            disabled={products.length < 50}
          >
            Следующая страница
          </button>
        </div>
        {loading ? (
          <div className={styles.loaderWrapper}>
            <img className={styles.loader} src={loader} />
          </div>
        ) : (
          <div className={styles.productsWrapper}>
            {products?.map((el: any) => (
              <article className={styles.item}>
                <div className={styles.itemInfo}>
                  <img src={item} className={styles.image} />
                  {el.brand && (
                    <p className={styles.itemBrand}>Бренд: {el.brand}</p>
                  )}
                  <p className={styles.itemName}>{el.product}</p>
                  <p className={styles.itemPrice}>{el.price} ₽</p>
                  <p className={styles.itemId}>id: {el.id}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
export default Content;
