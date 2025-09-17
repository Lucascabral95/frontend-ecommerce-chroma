"use client";
import { FormEvent, useState, useMemo, useCallback } from "react";
import { z } from "zod";

import { useCartStore } from "@/lib/zustand/CartZustand";
import EstructureCartCheckoutProfile from "@/production/components/EstructureCartCheckoutProfile/EstructureCartCheckoutProfile";
import { createOrder } from "@/lib/OrdersApi";
import { ShippingAddress } from "@/Insfraestructure/Interfaces/Orders/Orders";
import Toast from "@/Shared/Components/Toast";
import DetailCheckoutCart from "@/production/components/Checkout/DetailCheckoutCart/DetailCheckoutCart";
import ProductByIdError from "@/production/ProductById/ProductByIdError";
import "./Checkout.scss";
import { useSEO } from "@/production/Hooks/useSEO";
import SEO from "@/production/components/SEO";

const TOAST_CONFIG = {
  SUCCESS_DURATION: 1800,
  ERROR_DURATION: 3600,
} as const;

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

const shippingAddressSchema = z.object({
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
type ToastState = { message: string; type: "success" | "error" } | null;

const FORM_FIELDS = [
  {
    pairs: [
      {
        key: "street" as const,
        label: "Calle",
        placeholder: "Ingrese su calle",
      },
      {
        key: "city" as const,
        label: "Ciudad",
        placeholder: "Ingrese su ciudad",
      },
    ],
  },
  {
    pairs: [
      {
        key: "state" as const,
        label: "Provincia",
        placeholder: "Ingrese su provincia",
      },
      {
        key: "postalCode" as const,
        label: "Código Postal",
        placeholder: "Ingrese su código postal",
      },
    ],
  },
  {
    pairs: [
      {
        key: "country" as const,
        label: "País",
        placeholder: "Ingrese su país",
      },
      {
        key: "contactName" as const,
        label: "Nombre de contacto",
        placeholder: "Ingrese su nombre de contacto",
      },
    ],
  },
  {
    pairs: [
      {
        key: "phone" as const,
        label: "Teléfono",
        placeholder: "Ingrese su teléfono",
      },
      { key: "taxId" as const, label: "DNI", placeholder: "Ingrese su DNI" },
    ],
  },
];

const useToast = () => {
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
      const duration =
        type === "success"
          ? TOAST_CONFIG.SUCCESS_DURATION
          : TOAST_CONFIG.ERROR_DURATION;
      setTimeout(() => setToast(null), duration);
    },
    []
  );

  const clearToast = useCallback(() => setToast(null), []);

  return { toast, showToast, clearToast };
};

const FormInput = ({
  field,
  label,
  placeholder,
  value,
  error,
  onChange,
}: {
  field: keyof ShippingAddress;
  label: string;
  placeholder: string;
  value: string;
  error?: string[];
  onChange: (field: keyof ShippingAddress, value: string) => void;
}) => (
  <div className="form-group">
    <label htmlFor={field}>{label}</label>
    <input
      type="text"
      id={field}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      required
    />
    {error && (
      <div className="div-errors">
        <div className="span-error">{error[0]}</div>
      </div>
    )}
  </div>
);

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    INITIAL_SHIPPING_ADDRESS
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const useData = useSEO({
    title: "Finalizar Compra - Pago Seguro | Chroma",
    description:
      "Completa tu compra de forma segura en Chroma. Múltiples métodos de pago, envío gratuito desde $25.000 y garantía de devolución. Checkout rápido y protegido.",
    path: "/checkout",
    image: "/img/logo-chroma-ecommerce.png",
    keywords:
      "finalizar compra, pago seguro, checkout Chroma, métodos pago, compra online segura, envío gratis",
    type: "website",
    noIndex: true,
  });

  const { cart } = useCartStore();
  const { toast, showToast } = useToast();

  const orderTotal = useMemo(() => {
    if (!cart?.items?.length) return { subtotal: 0, total: 0 };

    const subtotal = cart.items.reduce(
      (acc, item) => acc + item.unitPriceSnap * item.quantity,
      0
    );
    const total = subtotal;

    return { subtotal, total };
  }, [cart?.items]);

  const clearFieldError = useCallback((field: keyof ShippingAddress) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleInputChange = useCallback(
    (field: keyof ShippingAddress, value: string) => {
      setShippingAddress((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        clearFieldError(field);
      }
    },
    [errors, clearFieldError]
  );

  const processValidationErrors = useCallback((error: z.ZodError) => {
    const errorsZod = error.flatten();
    const newErrors: FormErrors = {};

    Object.entries(errorsZod.fieldErrors).forEach(([key, value]) => {
      newErrors[key as keyof ShippingAddress] = value as string[];
    });

    return newErrors;
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!cart?.userId) {
        showToast("Error: Usuario no identificado", "error");
        return;
      }

      setIsSubmitting(true);

      try {
        const validationResult =
          shippingAddressSchema.safeParse(shippingAddress);

        if (!validationResult.success) {
          const newErrors = processValidationErrors(validationResult.error);
          setErrors(newErrors);
          return;
        }

        setErrors({});

        const orderData = {
          userId: cart.userId,
          subtotal: orderTotal.subtotal,
          total: orderTotal.total,
          shippingAddress: validationResult.data,
        };

        const response = await createOrder(cart.userId, orderData);

        showToast("Orden creada exitosamente", "success");
        setShippingAddress(INITIAL_SHIPPING_ADDRESS);

        if (response?.mpPreferenceId) {
          window.location.href = response.mpPreferenceId;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error al procesar la orden";
        showToast(errorMessage, "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [cart, shippingAddress, orderTotal, processValidationErrors, showToast]
  );

  if (cart?.items?.length === 0 || !cart) {
    return (
      <ProductByIdError
        title="Carrito vacío"
        description="Hay tenés ningún checkout porque no agregaste ningún producto al carrito."
      />
    );
  }

  if (!cart) {
    return (
      <ProductByIdError
        title="Carrito vacío"
        description="Hay tenés ningún checkout porque no agregaste ningún producto al carrito."
      />
    );
  }

  return (
    <EstructureCartCheckoutProfile title="Checkout">
      <SEO {...useData} />
      <div className="aver" style={{ width: "100%" }}>
        <DetailCheckoutCart cart={cart} />
      </div>

      <div className="second-title">
        <h4>Dirección de envío</h4>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {FORM_FIELDS.map((section, sectionIndex) => (
          <div key={sectionIndex} className="form-group-pair">
            {section.pairs.map(({ key, label, placeholder }) => (
              <FormInput
                key={key}
                field={key}
                label={label}
                placeholder={placeholder}
                value={shippingAddress[key] || ""}
                error={errors[key]}
                onChange={handleInputChange}
              />
            ))}
          </div>
        ))}

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
