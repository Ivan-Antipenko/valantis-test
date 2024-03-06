const md5 = require("md5");

export const getPass = (): string => {
  const pass = "Valantis";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const unHashPass = pass + "_" + date;
  const fullpass = md5(unHashPass);
  return fullpass;
};

export const getParams = (options: any) => {
  if (options.product !== "") {
    return {
      product: options.product,
    };
  }
  if (options.price !== "") {
    return {
      price: Number(options.price),
    };
  }
  if (options.brand !== "") {
    return {
      brand: options.brand,
    };
  }
};

export const getProductsOnPage = (arr: any, page: number) => {
  let end = page * 50;
  let start = page * 50 - 50;
  return arr.slice(start, end);
};
