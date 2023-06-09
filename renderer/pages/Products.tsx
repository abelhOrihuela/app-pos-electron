import React, { useState } from "react";
import CatalogPage from "../components/Pos/CatalogPage";
import AddProduct from "../components/Pos/Forms/AddProduct";
import TableProducts from "./../components/TableProducts";

function Products() {
  const [reload, setReaload] = useState(false);

  const onAddSuccess = () => {
    setReaload(true);
    setTimeout(() => {
      setReaload(false);
    }, 100);
  };

  return (
    <CatalogPage
      title="Productos"
      AddComponent={AddProduct}
      addLabel={"+ Agregar producto"}
      onAddSuccess={onAddSuccess}
    >
      <TableProducts reload={reload} />
    </CatalogPage>
  );
}

export default Products;
