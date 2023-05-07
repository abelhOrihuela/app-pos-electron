import React, { useState } from "react";
import CatalogPage from "../components/Pos/CatalogPage";
import AddProduct from "../components/Pos/Forms/AddProduct";
import TableUsers from "./../components/TableUsers";

function Users() {
  const [reload, setReaload] = useState(false);

  const onAddSuccess = () => {
    setReaload(true);
    setTimeout(() => {
      setReaload(false);
    }, 100);
  };

  return (
    <CatalogPage
      title="Usuarios"
      AddComponent={AddProduct}
      addLabel={"+ Agregar usuario"}
      onAddSuccess={onAddSuccess}
    >
      <TableUsers reload={reload} />
    </CatalogPage>
  );
}

export default Users;
