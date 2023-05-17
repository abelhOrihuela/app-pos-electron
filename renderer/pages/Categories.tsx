import React, { useState } from "react";
import CatalogPage from "../components/Pos/CatalogPage";
import AddCategory from "./../components/Pos/Forms/AddCategory";
import TableCategories from "../components/TableCategories";

function Categories() {
  const [reload, setReaload] = useState(false);

  const onAddSuccess = () => {
    setReaload(true);
    setTimeout(() => {
      setReaload(false);
    }, 100);
  };

  return (
    <CatalogPage
      AddComponent={AddCategory}
      addLabel={"+ Agregar categoria"}
      onAddSuccess={onAddSuccess}
    >
      <TableCategories reload={reload} />
    </CatalogPage>
  );
}

export default Categories;
