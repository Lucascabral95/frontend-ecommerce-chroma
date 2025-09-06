import React from "react";
import { AddressInterface } from "@/Insfraestructure/Interfaces/auth/address.interface";

import "./Addresses.scss";

interface Props {
  address: AddressInterface;
  index: number;
}

function Addresses({ address, index }: Props) {
  return (
    <div className="card-address">
      <h4>Dirección {index}</h4>
      <p>
        Nombre y apellido:
        <span>
          {address.firstName} {address.lastName}
        </span>
      </p>
      <p>
        Teléfono: <span>{address.phone}</span>
      </p>
      <p>
        Calle: <span>{address.street1}</span>
      </p>
      <p>
        Ciudad: <span>{address.city}</span>
      </p>
      <p>
        Provincia: <span>{address.state}</span>
      </p>
      <p>
        Código postal: <span>{address.postalCode}</span>
      </p>
      <p>
        País: <span>{address.country}</span>
      </p>
    </div>
  );
}

export default Addresses;
