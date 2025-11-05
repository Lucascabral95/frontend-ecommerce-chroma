<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React Logo" width="180"/>
</p>

# E-commerce Chroma Frontend

## Descripción general

**E-commerce Chroma Frontend** es una aplicación web avanzada desarrollada en [Next.js](https://nextjs.org/) y TypeScript, diseñada para interactuar con la API de comercio electrónico, gestionar productos, procesar pagos y ofrecer una experiencia de compra moderna, segura y responsiva. Este frontend implementa arquitectura modular, gestión de estado con Zustand, Server-Side Rendering, autenticación robusta y una UI construida con Tailwind CSS y SCSS, siguiendo los más altos estándares de la industria.

---

## ⚙️ Características Principales

- **Autenticación y Autorización:** Inicio de sesión y registro local, gestión de sesiones seguras con JWT, roles de usuario (USER, MANAGER, ADMIN).
- **Gestión de Productos:** Visualización de catálogo, filtrado avanzado, búsqueda, detalles de productos con variantes (tallas, colores) y control de stock.
- **Carrito de Compras:** Funcionalidad completa de carrito con persistencia, sincronización entre dispositivos y gestión optimizada con Zustand.
- **Proceso de Checkout:** Flujo completo de pago con validación de formularios, direcciones de envío y integración con MercadoPago.
- **Sistema de Órdenes:** Creación, seguimiento y gestión de pedidos con estados en tiempo real y notificaciones.
- **Panel de Usuario:** Área personalizada para gestión de perfil, historial de pedidos y configuración de cuenta.
- **Experiencia de Usuario Premium:** UI responsiva, accesible y moderna, animaciones suaves, modo oscuro y componentes reutilizables.
- **Gestión de Errores y Feedback:** Manejo global de errores, notificaciones contextuales y validación de formularios reactivos con mensajes personalizados.
- **Optimización de Performance:** Server-Side Rendering, Image Optimization, lazy loading y caching inteligente con Next.js.
- **Gestión de Productos:** Visualización de catálogo, filtrado avanzado, paginación, búsqueda, detalles de productos con variantes (tallas, colores) y control de stock.
- **Cache Parametrizado Avanzado:** TanStack Query con indexación por query keys únicos, invalidación selectiva y persistencia multi-filtro para optimización de rendimiento empresarial.
- **Seguridad:** Protección avanzada de rutas, validación de datos y sanitización de inputs.
- **Testing Extensivo:** Pruebas unitarias y de integración con alta cobertura, asegurando calidad y estabilidad continua.
- **Integración CI/CD:** Listo para despliegue automatizado en entornos productivos usando Docker y pipelines modernos.
- **Documentación:** Documentación detallada de la API, componentes y funcionalidades.
- **Panel de Dashboard Administrativo:** Área personalizada para gestión avanzada de productos, categorías y usuarios.

---

## ⚙️ Prueba de Pagos con MercadoPago

Para probar la funcionalidad de pagos integrada con MercadoPago en el entorno de desarrollo, sigue estos pasos:

### 🔐 Credenciales de Prueba

**1. Inicio de Sesión en MercadoPago:**

- **Usuario:** `TESTUSER1220788472`
- **Contraseña:** `1afnsm5AAE`

### 💳 Datos de Tarjeta de Prueba

**2. Información de Pago:**

- **Método de Pago:** Seleccionar "Elegir otro medio de pago" => "Nueva tarjeta (Crédito, débito o prepaga)"
- **Número de Tarjeta:** `5031 7557 3453 0604`
- **Fecha de Caducidad:** `11/30`
- **Código de Seguridad:** `123`
- **Nombre del Titular:** `APRO`
- **DNI:** `12345678`

### 📋 Proceso de Prueba

**3. Flujo Completo:**

1. **Iniciar Sesión:** Iniciá sesión en el ecommerce
2. **Navegar al Carrito:** Agregá productos al carrito de compras
3. **Iniciar Sesión en MercadoPago:** Usá las credenciales de prueba
4. **Proceder al Checkout:** Completá la información de envío
5. **Completar Pago:** Ingresá los datos de la tarjeta de prueba
6. **Confirmar Transacción:** Verificá el estado del pago y la creación de la orden

### ✅ Resultados Esperados

- **Estado de Pago:** Aprobado ✅
- **Respuesta del Webhook:** Confirmación automática del pago
- **Actualización de Stock:** Reducción automática del inventario
- **Estado de Orden:** Cambia a "Pagado" en tiempo real y se confirma el descuento de stock de los productos comprados (el stock se guarda al usuario durante 10 minutos para que no se quede sin stock en medio del pago)

### ⚠️ Importante

> **Nota:** Estos son datos de prueba exclusivos para el entorno de desarrollo. En producción, MercadoPago procesará pagos reales con tarjetas y cuentas válidas.

### 🔄 Estados de Prueba Adicionales

Para probar diferentes escenarios, puedes usar estos nombres de titular:

| Nombre | Estado        | Descripción                                |
| ------ | ------------- | ------------------------------------------ |
| `APRO` | ✅ Aprobado   | Pago aprobado exitosamente                 |
| `CONT` | ⏳ Pendiente  | Pago pendiente de procesamiento            |
| `OTHE` | ❌ Rechazado  | Rechazado por error general                |
| `CALL` | 📞 Validación | Rechazado con validación para autorizar    |
| `FUND` | 💰 Fondos     | Rechazado por cantidad insuficiente        |
| `SECU` | 🔒 Seguridad  | Rechazado por código de seguridad inválido |
| `EXPI` | 📅 Expirada   | Rechazado por problema con la fecha        |
| `FORM` | 📝 Formulario | Rechazado por error en formulario          |

### 🎯 Consejos de Prueba

- Mantené la sesión iniciada con la cuenta de prueba durante todo el proceso
- Verificá que el webhook responda correctamente en el backend
- Comprobá que las notificaciones por email se envíen apropiadamente
- Testeá la sincronización del estado de la orden en tiempo real

---

## ⚙️ Prueba de CRUD en panel de administración de Admin

Para probar la funcionalidad de CRUD en el panel de administración de Admin, seguí los siguientes pasos:

### 🔐 Credenciales de Prueba de Admin

- **Usuario:** `lucas@hotmail.com`
- **Contraseña:** `123456`

### 📋 Proceso de Prueba

1. Iniciá sesión en el login con las credencial de Admin
2. Navegá a la ruta /api/dashboard/usuarios
3. Verificá que puedas acceder al panel de administración
4. Verificá que puedas agregar, editar y eliminar categorías
5. Verificá que puedas agregar, editar y eliminar productos y variantes de ellos
6. Verificá que puedas agregar, editar y eliminar usuarios

---

## 🚀 Tecnologías Utilizadas

- **Framework:** [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Gestión de Estado:** [Zustand](https://github.com/pmndrs/zustand), React Query, React Context
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/), [SCSS Modules](https://sass-lang.com/)
- **Formularios:** [React Hook Form](https://react-hook-form.com/), [Zod Validation](https://zod.dev/)
- **UI Components:** [React Icons](https://react-icons.github.io/react-icons/), [React Slick](https://react-slick.neostack.com/)
- **Testing:** [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Linting & Formatting:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Seguridad:** [Cookies HTTP-Only y Secure](https://developer.mozilla.org/es/docs/Web/HTTP/Cookies#seguridad), SameSite
- **Pagos:** [MercadoPago SDK](https://www.mercadopago.com.ar/developers)
- **Contenerización:** [Docker](https://www.docker.com/)
- **CI/CD:** GitHub Actions, Docker Compose
- **Herramientas Dev:** [Husky](https://typicode.github.io/husky/), [Commitlint](https://commitlint.js.org/), [Conventional Commits](https://www.conventionalcommits.org/)

---

## Tabla de contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Instalación

1. **Cloná el repositorio:**

```bash
git clone https://github.com/Lucascabral95/frontend-ecommerce-chroma.git
cd frontend-ecommerce-chroma
```

2. **Instalá las dependencias:**

```bash
npm install
```

3. **Configurá las variables de entorno:**

```bash
cp .env.template
```

4. **Testing avanzado:**

- Ejecutá las pruebas con `npm test` para verificar que todo funciona correctamente.
- Usa `npm run test:watch` para ejecutar pruebas en modo observación.
- Ejecutá `npm run test:coverage` para generar reportes de cobertura.

5. **Configura Tailwind y estilos:**

- Tailwind ya está preconfigurado en `tailwind.config.js` y los estilos globales en `src/styles/globals.css`.

6. **Compilá el proyecto:**

## Uso

### Modo Desarrollo

```bash
npm run dev
```

## La aplicación estará disponible en:

`http://localhost:3000`

### Modo Producción

```bash
npm run build
npm run start
```

## Estructura del proyecto

```bash
├── src/
│   ├── app/
│   │   ├── api/                     # Rutas de API para el dashboard
│   │   │   └── dashboard/           # Rutas del dashboard
│   │   │       ├── categorias/      # Rutas para gestión de categorías
│   │   │       ├── productos/       # Rutas para gestión de productos
│   │   │       │   └── variantes/   # Gestión de variantes de productos
│   │   │       │       └── [productid]/  # Rutas dinámicas por ID de producto
│   │   │       └── usuarios/        # Endpoints para gestión de usuarios
│   │   ├── checkout/                # Flujo de pago
│   │   │   ├── cart/                # Página del carrito
│   │   │   └── page.tsx             # Página principal de checkout
│   │   ├── customer/                # Área de cliente
│   │   ├── orders/                  # Gestión de pedidos
│   │   │   ├── detail/              # Detalle de pedidos
│   │   │   │   └── [id]/            # Rutas dinámicas por ID de pedido
│   │   │   │       └── page.tsx     # Página de detalle de pedido por ID
│   │   │   └── record/              # Registro de pedidos
│   │   ├── product/                 # Páginas de productos
│   │   │   ├── [id]/                # Rutas dinámicas por ID de producto
│   │   │   └── page.tsx             # Página principal de productos
│   │   ├── section/                 # Secciones de la página
│   │   │   ├── product/             # Secciones de productos
│   │   │   │   └── [category]/      # Rutas dinámicas por categoría
│   │   │   └── page.tsx             # Página principal de secciones
│   │   ├── globals.css              # Estilos globales
│   │   ├── layout.tsx               # Layout principal
│   │   └── page.tsx                 # Página de inicio
│   │
│   ├── Infrastructure/              # Estructura de infraestructura
│   │                               # Interfaces, enums, configuración de TanStack Query, axios, etc
│   ├── production/                  # Componentes reutilizables
│   ├── providers/                   # Proveedores de contexto globales
│   ├── shared/                      # Componentes estructurales y reutilizables globales
│   ├── lib/                         # Utilidades y configuraciones
│   │   ├── api/                     # Clientes de API
│   │   └── zustand/                 # Stores de estado global
│   ├── styles/                      # Estilos globales
│   ├── public/                      # Assets estáticos
│   └── middleware.ts                # Middleware de Next.js para proteger rutas
│
├── .vscode/                         # Configuración de VSCode
├── .eslintrc.js                     # Configuración de ESLint
├── next.config.js                   # Configuración de Next.js
├── package.json                     # Dependencias y scripts
├── tailwind.config.js               # Configuración de Tailwind
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Documentación

```

## Contribuciones

¡Las contribuciones son bienvenidas! Seguí estos pasos:

1. Hacé un fork del repositorio.
2. Creá una rama para tu feature o fix (`git checkout -b feature/nueva-funcionalidad`).
3. Realizá tus cambios y escribí pruebas si es necesario.
4. Hacé commit y push a tu rama (`git commit -m "feat: agrega nueva funcionalidad"`).
5. Abrí un Pull Request describiendo tus cambios.

---

## Licencia

Este proyecto está bajo la licencia **MIT**.

---

## 📬 Contacto

- **Autor:** Lucas Cabral
- **LinkedIn:** [https://www.linkedin.com/in/lucas-gastón-cabral/](https://www.linkedin.com/in/lucas-gastón-cabral/)
- **Portfolio:** [https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/](https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/)
- **Github:** [https://github.com/Lucascabral95](https://github.com/Lucascabral95/)

---
