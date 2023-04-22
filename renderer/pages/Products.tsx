// import React, { useContext, useEffect, useState } from "react";
// import Layout from "../components/Pos/Layout";
// import { AppContext } from "./../context/AuthProvider";
// import api from "../lib/api";
// import { AppContextType, IProduct, ResponsePaginated } from "../context/Types";
// import { AxiosResponse } from "axios";

// function DashboardContent() {
//   const { setNotification } = useContext(AppContext) as AppContextType;
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(0);
//   const [limit, setLimit] = useState(10);

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const getProducts = async () => {
//     try {
//       const { data }: AxiosResponse<ResponsePaginated> = await api.get(
//         `/pos/products?page=${page}&size=${limit}`
//       );

//       setItems(data.items);
//     } catch (error) {
//       setNotification(error.message, "error");
//     }
//   };

//   const [product, setProduct] = useState<IProduct>({
//     name: "",
//     description: "",
//     id: 0,
//     price: 0,
//     barcode: "",
//   });

//   return (
//     <Layout>
//       <TableProducts items={items} />
//     </Layout>
//   );
// }

// export default DashboardContent;

import React, { useContext, useEffect, useState } from "react";
import CatalogPage from "../components/Pos/CatalogPage";
import AddProduct from "../components/Pos/Forms/AddProduct";
import TableProducts from "./../components/TableProducts";
import { AppContext } from "../context/AuthProvider";
import { AppContextType, ResponsePaginated } from "../context/Types";
import { AxiosResponse } from "axios";
import api from "../lib/api";

function Products() {
  const { setNotification } = useContext(AppContext) as AppContextType;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data }: AxiosResponse<ResponsePaginated> = await api.get(
        `/pos/products?page=${page}&size=${limit}`
      );

      setItems(data.items);
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  return (
    <CatalogPage
      title="Productos"
      AddComponent={AddProduct}
      addLabel={"+ Agregar producto"}
    >
      <TableProducts items={items} />
    </CatalogPage>
  );
}

export default Products;
