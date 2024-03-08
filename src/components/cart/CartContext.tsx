import React, { createContext, useContext } from "react";
import AddressType from "../../extra/types/Address";
import { ShowMapOrChooseAddressType } from "./CartWrapper";

export type GlobalContent = {
  addresses: AddressType[];
  chosenAddress: AddressType | undefined;
  extraInfo: string | undefined;
  mapAddress: ShowMapOrChooseAddressType;
  setMapAddress: React.Dispatch<any>;
  setAddresses: React.Dispatch<any>;
  setExtraInfo: React.Dispatch<any>;
  setChosenAddress: React.Dispatch<any>;

  //   product: ProductCreateType;
  //   articles: ArticleCreateType[];
  //   pictures: File[][];
  //   productDispatch: React.Dispatch<any>;
  //   articleDispatch: React.Dispatch<any>;
  //   picturesDispatch: React.Dispatch<any>;
};

export const MyGlobalContext = createContext<GlobalContent>({
  addresses: [],
  chosenAddress: undefined,
  extraInfo: undefined,
  mapAddress: { showMap: false, showChooseAddress: false },
  setMapAddress: () => null,
  setAddresses: () => null,
  setExtraInfo: () => null,
  setChosenAddress: () => null,
  //   product: emptyProductCreate,
  //   articles: [emptyArticleType],
  //   pictures: [],
  //   productDispatch: () => null,
  //   articleDispatch: () => null,
  //   picturesDispatch: () => null,
});

export const useGlobalContext = () => useContext(MyGlobalContext);

// export type ArticleIndexContentType = {
//   articleIndex: number;
//   setArticleIndex: React.Dispatch<React.SetStateAction<any>>;
// };

// export const ArticleIndexContext = createContext<ArticleIndexContentType>({
//   articleIndex: 0,
//   setArticleIndex: () => null,
// });

// export const useArticleIndexContext = () => useContext(ArticleIndexContext);
