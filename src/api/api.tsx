import { getParams, getPass } from "../utils/utils";

const url = "https://api.valantis.store:41000/";

export const getData = async (options: object) => {
  const pass = await getPass();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": pass,
      },
      body: JSON.stringify(options),
    });

    if (!res.ok) {
      console.error(`Ошибка запроса. Статус: ${res.status}`);
    }

    const resData = await res.json();
    return resData.result;
  } catch (err) {
    console.error(err);
  }
};

export const getIds = async (offset: number) => {
  let ids = [];
  ids = await getData({
    action: "get_ids",
    params: { offset: offset, limit: 50 },
  });
  const uniq = Array.from(new Set(ids));
  return uniq;
};

export const getSpecialIds = async (opt: any) => {
  let ids = [];
  const options = getParams(opt);
  ids = await getData({
    action: "filter",
    params: options,
  });
  const uniq = Array.from(new Set(ids));
  return uniq;
};

export const getProducts = async (ids: any) => {
  let productsList = [];
  productsList = await getData({
    action: "get_items",
    params: { ids: ids },
  });
  return productsList;
};
