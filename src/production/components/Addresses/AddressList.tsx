import React from "react";
import Addresses from "./Addresses";
import { AddressInterface } from "@/Insfraestructure/Interfaces/auth/address.interface";

import "./AddressList.scss";

interface Props {
  addresses: AddressInterface[];
}

function AddressList({ addresses }: Props) {
  return (
    <div className="address-list-container">
      {addresses.map((address, index) => (
        <Addresses key={index} address={address} index={index + 1} />
      ))}
    </div>
  );
}

export default AddressList;
