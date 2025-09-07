"use client";
import { FormEvent, useState, useEffect, useMemo } from "react";

import EstructureCartCheckoutProfile from "@/production/components/EstructureCartCheckoutProfile/EstructureCartCheckoutProfile";

import {
  AddressInterface,
  GetAddressByUserIdInterface,
} from "@/Insfraestructure/Interfaces/auth/address.interface";
import useAuthStore from "@/lib/zustand/AuthZustand";
import {
  createAddress,
  getAddressByUserId,
  updateAddressById,
} from "@/lib/auth";

import "./Profile.scss";
import ProductByIdError from "@/production/ProductById/ProductByIdError";

const TIME_TO_CLOSE_TOAST = 1800;

const ProfilePage = () => {
  const { userDataSession } = useAuthStore();
  const myId = String(userDataSession?.id);
  const [errors, setErrors] = useState<{ message: string; status: string }>({
    message: "",
    status: "",
  });

  const initialDataAddres: AddressInterface = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      phone: "",
      street1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    }),
    []
  );

  const [dataAddres, setDataAddres] =
    useState<AddressInterface>(initialDataAddres);
  const [toastMessage, setToastMessage] = useState({
    message: "",
    error: false,
  });

  const saveAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createAddress(myId, {
        userId: myId,
        ...dataAddres,
      });

      if (res) {
        setDataAddres(initialDataAddres);

        setToastMessage({
          message: "Dirección guardada exitosamente",
          error: false,
        });

        setTimeout(() => {
          setToastMessage({ message: "", error: false });
        }, TIME_TO_CLOSE_TOAST);
      }
    } catch (error) {
      setToastMessage({
        message: "Error al guardar la dirección",
        error: true,
      });
      setTimeout(() => {
        setToastMessage({ message: "", error: false });
      }, TIME_TO_CLOSE_TOAST);
    }
  };

  const updateAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const {} = dataAddres;

      const res = await updateAddressById(myId, {
        userId: myId,
        firstName: dataAddres.firstName,
        lastName: dataAddres.lastName,
        phone: dataAddres.phone,
        street1: dataAddres.street1,
        city: dataAddres.city,
        state: dataAddres.state,
        postalCode: dataAddres.postalCode,
        country: dataAddres.country,
      });

      if (res) {
        setToastMessage({
          message: "Dirección guardada exitosamente",
          error: false,
        });

        setTimeout(() => {
          setToastMessage({ message: "", error: false });
        }, TIME_TO_CLOSE_TOAST);
      }
    } catch (error) {
      setToastMessage({
        message: "Error al guardar la dirección",
        error: true,
      });
      setTimeout(() => {
        setToastMessage({ message: "", error: false });
      }, TIME_TO_CLOSE_TOAST);
    }
  };

  useEffect(() => {
    getAddressByUserId(myId)
      .then((res: GetAddressByUserIdInterface) => {
        setDataAddres(res.firstAddress ?? initialDataAddres);
        console.log(res.firstAddress);
      })
      .catch((error) => {
        console.log(error);
        setErrors({ message: error.message, status: error.status });
      });
  }, [myId, initialDataAddres]);

  return (
    <EstructureCartCheckoutProfile
      title="Dirección y datos personales"
      background="#F5F5F5"
      toast={toastMessage}
    >
      {errors.message ? (
        <ProductByIdError
          title={errors.message}
          description={"Algo salió mal. Intentalo de nuevo más tarde."}
        />
      ) : (
        <form
          className="form"
          onSubmit={dataAddres.city ? updateAddress : saveAddress}
        >
          <div className="form-group-pair">
            <div className="form-group">
              <label htmlFor="firstName">Nombre</label>
              <input
                value={dataAddres.firstName}
                type="text"
                id="firstName"
                placeholder="Lucas"
                onChange={(e) =>
                  setDataAddres({ ...dataAddres, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input
                value={dataAddres.lastName}
                type="text"
                id="lastName"
                placeholder="Cabral"
                onChange={(e) =>
                  setDataAddres({ ...dataAddres, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="form-group-pair">
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                value={dataAddres.phone}
                type="text"
                id="phone"
                placeholder="11-****-****"
                onChange={(e) =>
                  setDataAddres({ ...dataAddres, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="street1">Calle</label>
              <input
                value={dataAddres.street1}
                type="text"
                id="street1"
                placeholder="Av. Siempreviva"
                onChange={(e) =>
                  setDataAddres({ ...dataAddres, street1: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="form-group-pair">
            <div className="form-group">
              <label htmlFor="city">Ciudad</label>
              <input
                value={dataAddres.city}
                type="text"
                id="city"
                placeholder="Tigre"
                onChange={(e) =>
                  setDataAddres({ ...dataAddres, city: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">Estado</label>
              <input
                value={dataAddres.state}
                type="text"
                id="state"
                placeholder="Buenos Aires"
                onChange={(e) =>
                  setDataAddres({ ...dataAddres, state: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="form-group-pair">
            <div className="form-group">
              <label htmlFor="postalCode">Código postal</label>
              <input
                value={dataAddres.postalCode}
                type="text"
                id="postalCode"
                placeholder="B2020"
                onChange={(e) =>
                  setDataAddres({ ...dataAddres, postalCode: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">País</label>
              <input
                value={dataAddres.country}
                type="text"
                id="country"
                placeholder="Argentina"
                onChange={(e) =>
                  setDataAddres({ ...dataAddres, country: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="form-group-button">
            <button type="submit">
              {dataAddres.street1 !== "" ? "ACTUALIZAR DATOS" : "GUARDAR DATOS"}
            </button>
          </div>
        </form>
      )}
    </EstructureCartCheckoutProfile>
  );
};

export default ProfilePage;
