/**
 * v-auth
 * 按钮权限指令
 */

// import { useUserStore } from "@/store/user";
// import type { Directive, DirectiveBinding } from "vue";

// const { userinfo } = useUserStore();
export default {
  mounted(el, { value }) {
    if (!value.includes("userinfo.role")) el.style.display = "none";
    // document.removeChild(el);
  },
};
// const auth: Directive = {
//   mounted(el: HTMLElement, binding: DirectiveBinding) {
//     const { value } = binding;
//     const authStore = AuthStore();
//     const currentPageRoles =
//       authStore.authButtonListGet[authStore.routeName] ?? [];
//     if (value instanceof Array && value.length) {
//       const hasPermission = value.every((item) =>
//         currentPageRoles.includes(item)
//       );
//       if (!hasPermission) el.remove();
//     } else {
//       if (!currentPageRoles.includes(value)) el.remove();
//     }
//   },
// };

// export default auth;
