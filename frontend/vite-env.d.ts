/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // Puedes agregar más variables si usas otras, por ejemplo:
    // readonly VITE_OTRA_COSA: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  