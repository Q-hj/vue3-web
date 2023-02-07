/*
 * @Date: 2022-09-03 19:37:35
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-05 15:14:26
 * @Description: 用户仓库
 */

const router = useRouter();

type User = any;

let isFresh = true;
let tokenList: any[] = [];

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {
        role: "user",
      },
      hasLogin: false,
    };
  },
  actions: {
    // 获取token
    updateToken(): Promise<any[]> {
      return new Promise<any[]>((resolve, reject) => {});
    },
    getUserInfo() {
      const params = { accessToken: sessionStorage.getItem("Authorization") };
      return new Promise<User>((resolve, reject) => {
        get("/baiYu/getUserInfo", params)
          .then((user: any) => {
            this.userInfo = user;
            console.log(user);
            resolve(user);
          })
          .catch(() => reject())
          .finally(() => (this.hasLogin = true));
      });
    },
    isHasLogin() {
      return this.hasLogin;
    },
  },
});
