import React from "react";
import CatalogPage from "../components/Pos/CatalogPage";
import AddProduct from "../components/Pos/Forms/AddProduct";
import TableProducts from "./../components/TableProducts";

function Products() {
  return (
    <CatalogPage
      title="Productos"
      AddComponent={AddProduct}
      addLabel={"+ Agregar producto"}
    >
      <TableProducts />
    </CatalogPage>
  );
}

export default Products;
