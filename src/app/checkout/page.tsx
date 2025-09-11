"use client";
import { FormEvent, useState } from "react";
import { z } from "zod";

import { useCartStore } from "@/lib/zustand/CartZustand";
import EstructureCartCheckoutProfile from "@/production/components/EstructureCartCheckoutProfile/EstructureCartCheckoutProfile";
import { createOrder } from "@/lib/OrdersApi";
import { ShippingAddress } from "@/Insfraestructure/Interfaces/Orders/Orders";
import Toast from "@/Shared/Components/Toast";
import DetailCheckoutCart from "@/production/components/Checkout/DetailCheckoutCart/DetailCheckoutCart";
import "./Checkout.scss";

const TIME_TOAST_SUCCESS = 1800;
const TIME_TOAST_ERROR = 3600;

const INITIAL_SHIPPING_ADDRESS: ShippingAddress = {
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  contactName: "",
  phone: "",
  taxId: "",
};

const schemaCheckout = z.object({
  street: z
    .string()
    .regex(
      /^\w+\s+\d+$/,
      "La dirección debe incluir al menos una palabra seguida de un número"
    ),
  city: z.string().min(3, "La ciudad debe tener al menos 3 caracteres"),
  state: z.string().min(3, "La provincia debe tener al menos 3 caracteres"),
  postalCode: z
    .string()
    .min(2, "El código postal debe tener al menos 2 caracteres"),
  country: z.string().min(2, "El país debe tener al menos 2 caracteres"),
  contactName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(1, "El teléfono es requerido"),
  taxId: z
    .string()
    .min(4, "El número de identificación debe tener al menos 4 caracteres"),
});

type FormErrors = Partial<Record<keyof ShippingAddress, string[]>>;

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    INITIAL_SHIPPING_ADDRESS
  );
  const { cart } = useCartStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const resultSchema = schemaCheckout.safeParse(shippingAddress);

    if (!resultSchema.success) {
      const errorsZod = resultSchema.error.flatten();
      const newErrors: FormErrors = {};
      for (const [key, value] of Object.entries(errorsZod.fieldErrors)) {
        newErrors[key as keyof ShippingAddress] = value;
      }
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    await createOrder(cart!.userId, {
      userId: cart!.userId,
      subtotal: 100,
      total: 100,
      shippingAddress,
    })
      .then((res) => {
        setToast({ message: "Orden creada exitosamente", type: "success" });
        setTimeout(() => setToast(null), TIME_TOAST_SUCCESS);
        setShippingAddress(INITIAL_SHIPPING_ADDRESS);
        setIsSubmitting(false);
        window.location.href = `${res.mpPreferenceId}`;
      })
      .catch((e) => {
        setToast({ message: e.message, type: "error" });
        setTimeout(() => setToast(null), TIME_TOAST_ERROR);
        setIsSubmitting(false);
      });
  };

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <EstructureCartCheckoutProfile title="Checkout">
      <div className="aver" style={{ width: "100%" }}>
        <DetailCheckoutCart cart={cart} />
      </div>

      <div className="second-title">
        <h4> Dirección de envío </h4>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group-pair">
          <div className="form-group">
            <label htmlFor="street">Calle</label>
            <input
              type="text"
              id="street"
              value={shippingAddress.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
              placeholder="Ingrese su calle"
              required
            />
            {errors.street && (
              <div className="div-errors">
                <div className="span-error">{errors.street[0]}</div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              value={shippingAddress.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Ingrese su ciudad"
              required
            />
            {errors.city && (
              <div className="div-errors">
                <div className="span-error">{errors.city[0]}</div>
              </div>
            )}
          </div>
        </div>

        <div className="form-group-pair">
          <div className="form-group">
            <label htmlFor="state">Provincia</label>
            <input
              type="text"
              id="state"
              value={shippingAddress.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              placeholder="Ingrese su provincia"
              required
            />
            {errors.state && (
              <div className="div-errors">
                <div className="span-error">{errors.state[0]}</div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Código Postal</label>
            <input
              type="text"
              id="postalCode"
              value={shippingAddress.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              placeholder="Ingrese su código postal"
              required
            />
            {errors.postalCode && (
              <div className="div-errors">
                <div className="span-error">{errors.postalCode[0]}</div>
              </div>
            )}
          </div>
        </div>

        <div className="form-group-pair">
          <div className="form-group">
            <label htmlFor="country">País</label>
            <input
              type="text"
              id="country"
              value={shippingAddress.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              placeholder="Ingrese su país"
              required
            />
            {errors.country && (
              <div className="div-errors">
                <div className="span-error">{errors.country[0]}</div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="contactName">Nombre de contacto</label>
            <input
              type="text"
              id="contactName"
              value={shippingAddress.contactName}
              onChange={(e) => handleInputChange("contactName", e.target.value)}
              placeholder="Ingrese su nombre de contacto"
              required
            />
            {errors.contactName && (
              <div className="div-errors">
                <div className="span-error">{errors.contactName[0]}</div>
              </div>
            )}
          </div>
        </div>

        <div className="form-group-pair">
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              id="phone"
              value={shippingAddress.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Ingrese su teléfono"
              required
            />
            {errors.phone && (
              <div className="div-errors">
                <div className="span-error">{errors.phone[0]}</div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="taxId">DNI</label>
            <input
              type="text"
              id="taxId"
              value={shippingAddress.taxId}
              onChange={(e) => handleInputChange("taxId", e.target.value)}
              placeholder="Ingrese su DNI"
              required
            />
            {errors.taxId && (
              <div className="div-errors">
                <div className="span-error">{errors.taxId[0]}</div>
              </div>
            )}
          </div>
        </div>

        <div className="form-group-button">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "PROCESANDO..." : "FINALIZAR COMPRA"}
          </button>
        </div>
      </form>
      {toast && (
        <Toast message={toast.message} error={toast.type === "error"} />
      )}
    </EstructureCartCheckoutProfile>
  );
}

export default Checkout;
