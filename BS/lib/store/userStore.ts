// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export interface UserStore {
//   phone: string;
//   isLoading: boolean;
//   setPhone: (phone: string) => void;
//   setLoading: (isLoading: boolean) => void;
// }

// export const useUserStore = create<UserStore>()(
//   persist(
//     (set) => ({ 
//       phone: '', 
//       isLoading: true,
//       setPhone: (phone) => set({ phone }),
//       setLoading: (isLoading) => set({ isLoading }),
//     }),
//     { 
//       name: 'user-storage',
//       storage: { 
//         getItem: async (name) => {
//           const value = localStorage.getItem(name);
//           const parsed = value ? JSON.parse(value) : { phone: '' };
//           await new Promise(resolve => setTimeout(resolve, 0));
//           return parsed;
//         },
//         setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
//         removeItem: (name) => localStorage.removeItem(name),
//       },
//       version: 1,
//       migrate: async (persistedState, version) => {
//         // 显式处理persistedState为null的情况
//         if (persistedState === null || typeof persistedState !== 'object' || !('phone' in persistedState)) {
//           // 返回包含所有接口属性的默认对象
//           return { 
//             phone: '', 
//             isLoading: true, 
//             setPhone: () => {}, 
//             setLoading: () => {}
//           };
//         }
//         // 确保返回对象包含所有必要属性
//         return {
//           ...persistedState,
//           isLoading: true, // 保持加载状态直到存储完成
//           setPhone: () => {},
//           setLoading: () => {}
//         } as UserStore;
//       },
//       onRehydrateStorage: (state) => {
//         return (state, error) => {
//           if (!error) {
//             state?.setLoading(false);
//           }
//         };
//       }
//     }
//   )
// )