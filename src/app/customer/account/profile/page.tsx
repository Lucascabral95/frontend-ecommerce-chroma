"use client";
import { FormEvent, useState, useEffect, useMemo, useCallback } from "react";

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
import ProductByIdError from "@/production/ProductById/ProductByIdError";
import "./Profile.scss";
import { useSEO } from "@/production/Hooks/useSEO";
import SEO from "@/production/components/SEO";

const TIME_TO_CLOSE_TOAST = 1800;

const ProfilePage = () => {
  const { userDataSession } = useAuthStore();
  const myId = String(userDataSession?.id);

  const [errors, setErrors] = useState<{ message: string; status: string }>({
    message: "",
    status: "",
  });

  const [hasExistingAddress, setHasExistingAddress] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const useData = useSEO({
    title: "Mi Perfil - Gestionar Datos Personales - Chroma",
    description:
      "Actualiza tus datos personales y dirección de envío en tu cuenta de Chroma. Gestiona tu información de contacto de forma segura.",
    path: `/customer/account/profile`,
    image: "/img/logo-chroma-ecommerce.png",
    keywords:
      "perfil usuario, datos personales, dirección envío, cuenta Chroma, actualizar perfil",
    type: "website",
    noIndex: true,
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

  const showToast = useCallback((message: string, isError: boolean = false) => {
    setToastMessage({ message, error: isError });
    setTimeout(() => {
      setToastMessage({ message: "", error: false });
    }, TIME_TO_CLOSE_TOAST);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cleanAddressData = {
        userId: myId,
        firstName: dataAddres.firstName,
        lastName: dataAddres.lastName,
        phone: dataAddres.phone,
        street1: dataAddres.street1,
        city: dataAddres.city,
        state: dataAddres.state,
        postalCode: dataAddres.postalCode,
        country: dataAddres.country,
      };

      let res;
      if (hasExistingAddress) {
        const updateData = {
          firstName: dataAddres.firstName,
          lastName: dataAddres.lastName,
          phone: dataAddres.phone,
          street1: dataAddres.street1,
          city: dataAddres.city,
          state: dataAddres.state,
          postalCode: dataAddres.postalCode,
          country: dataAddres.country,
        };
        res = await updateAddressById(myId, updateData);
        showToast("Dirección actualizada exitosamente", false);
      } else {
        res = await createAddress(myId, cleanAddressData);
        setHasExistingAddress(true);
        showToast("Dirección creada exitosamente", false);
      }

      if (!res) {
        throw new Error("No se recibió respuesta del servidor");
      }
    } catch (error: any) {
      console.error("Error al guardar la dirección:", error);

      if (
        hasExistingAddress &&
        (error.status === 404 || error.status === "404")
      ) {
        try {
          console.log("PATCH falló, intentando POST...");
          const fallbackData = {
            userId: myId,
            firstName: dataAddres.firstName,
            lastName: dataAddres.lastName,
            phone: dataAddres.phone,
            street1: dataAddres.street1,
            city: dataAddres.city,
            state: dataAddres.state,
            postalCode: dataAddres.postalCode,
            country: dataAddres.country,
          };
          const fallbackRes = await createAddress(myId, fallbackData);
          if (fallbackRes) {
            setHasExistingAddress(true);
            showToast("Dirección creada exitosamente", false);
          }
        } catch (fallbackError) {
          console.error("Error en fallback POST:", fallbackError);
          showToast("Error al guardar la dirección", true);
        }
      } else {
        showToast("Error al guardar la dirección", true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserAddress = useCallback(async () => {
    if (!myId) return;

    setIsInitialLoad(true);
    setErrors({ message: "", status: "" });

    try {
      const res: GetAddressByUserIdInterface = await getAddressByUserId(myId);

      if (res.firstAddress && Object.keys(res.firstAddress).length > 0) {
        const hasValidData = Object.values(res.firstAddress).some(
          (value) => value && value.toString().trim() !== ""
        );

        if (hasValidData) {
          setDataAddres(res.firstAddress);
          setHasExistingAddress(true);
        } else {
          setDataAddres(initialDataAddres);
          setHasExistingAddress(false);
        }
      } else {
        setDataAddres(initialDataAddres);
        setHasExistingAddress(false);
      }
    } catch (error: any) {
      console.error("Error al cargar dirección:", error);
      setDataAddres(initialDataAddres);
      setHasExistingAddress(false);

      if (error.status !== 404 && error.status !== "404") {
        setErrors({
          message: error.message || "Error al cargar los datos",
          status: error.status || "500",
        });
      }
    } finally {
      setIsInitialLoad(false);
    }
  }, [myId, initialDataAddres]);

  useEffect(() => {
    loadUserAddress();
  }, [loadUserAddress]);

  const handleInputChange = useCallback(
    (field: keyof AddressInterface, value: string) => {
      setDataAddres((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  return (
    <EstructureCartCheckoutProfile
      title="Dirección y datos personales"
      background="#F5F5F5"
      toast={toastMessage}
    >
      <>
        <SEO {...useData} />
        {errors.message ? (
          <ProductByIdError
            title={errors.message}
            description={"Algo salió mal. Intentalo de nuevo más tarde."}
          />
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group-pair">
              <div className="form-group">
                <label htmlFor="firstName">Nombre</label>
                <input
                  value={dataAddres.firstName}
                  type="text"
                  id="firstName"
                  placeholder="Lucas"
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  disabled={isLoading || isInitialLoad}
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
                    handleInputChange("lastName", e.target.value)
                  }
                  disabled={isLoading || isInitialLoad}
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
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={isLoading || isInitialLoad}
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
                  onChange={(e) => handleInputChange("street1", e.target.value)}
                  disabled={isLoading || isInitialLoad}
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
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  disabled={isLoading || isInitialLoad}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">Provincia</label>
                <input
                  value={dataAddres.state}
                  type="text"
                  id="state"
                  placeholder="Buenos Aires"
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  disabled={isLoading || isInitialLoad}
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
                    handleInputChange("postalCode", e.target.value)
                  }
                  disabled={isLoading || isInitialLoad}
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
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  disabled={isLoading || isInitialLoad}
                  required
                />
              </div>
            </div>
            <div className="form-group-button">
              <button type="submit" disabled={isLoading || isInitialLoad}>
                {isLoading
                  ? "GUARDANDO..."
                  : isInitialLoad
                  ? "CARGANDO..."
                  : hasExistingAddress
                  ? "ACTUALIZAR DATOS"
                  : "GUARDAR DATOS"}
              </button>
            </div>
          </form>
        )}
      </>
    </EstructureCartCheckoutProfile>
  );
};

export default ProfilePage;
