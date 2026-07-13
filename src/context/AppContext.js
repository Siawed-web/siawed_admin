// import { DEFAULT_PREVIEW_DATA } from "@/constants/constants";
// import { getData } from "@/utils/firebase";
// import { useRouter } from "next/router";
// import { createContext, useContext, useEffect, useState } from "react";

// const AppContext = createContext();

// export function AppProvider({ children }) {
//   const router = useRouter();
//   const { previewId } = router.query;

//   const [PREVIEW_DATA, setPreviewData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const updateVariables = (variables) => {
//     const vars = variables || DEFAULT_PREVIEW_DATA.css_variables;
//     vars.forEach((v) =>
//       document.documentElement.style.setProperty(v.name, v.value)
//     );
//   };

//   const fetchPreviewData = async () => {
//     setIsLoading(true);

//     try {
//       if (previewId) {
//         const res = await getData("previews", ["id", "==", previewId]);
//         setPreviewData({ ...DEFAULT_PREVIEW_DATA, ...res });
//         updateVariables(res?.css_variables);
//       } else {
//         setPreviewData(DEFAULT_PREVIEW_DATA);
//         updateVariables(DEFAULT_PREVIEW_DATA.css_variables);
//       }
//     } catch (error) {
//       console.log(error);
//       setPreviewData(DEFAULT_PREVIEW_DATA);
//       updateVariables(DEFAULT_PREVIEW_DATA.css_variables);
//     } finally {
//       // Small UX delay
//       setTimeout(() => setIsLoading(false), 1000);
//     }
//   };

//   useEffect(() => {
//     fetchPreviewData();
//   }, [previewId]);

//   return (
//     <AppContext.Provider
//       value={{
//         PREVIEW_DATA,
//         setPreviewData,
//         isLoading,
//         setIsLoading,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useAppContext() {
//   return useContext(AppContext);
// }
