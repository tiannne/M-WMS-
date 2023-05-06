import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import { jiaoYanToken } from "../api/user"

const Index = () => import("../views/Index.vue");
const Login = () => import("../views/Login.vue");
// const Home = () => import('../views/Home.vue')
const Home = () => import('../views/UpDataInformation.vue')
const ExamDetail = () => import('../views/ExamDetail.vue')
const ExamUpData = () => import('../views/ExamUpData.vue')
const ExamAddAndUpdata = () => import('../views/ExamAddAndUpdata.vue')
const Tikuguanli = () => import('../views/examManage/tiku/Tikuguanli.vue')
const Tikudetails = () => import('../views/examManage/tiku/Tikudetails.vue')
const Tikuadd = () => import('../views/examManage/tiku/Tikuadd.vue')
const Kaoshiguanli = () => import('../views/Kaoshiguanli.vue')
const Shitiguanli = () => import('../views/examManage/shiti/Shitiguanli.vue')
const ShitiguanliAdd=()=>import('../views/examManage/shiti/ShitiguanliAdd.vue')
const ShitiguanliUpdate=()=>import('../views/examManage/shiti/ShitiguanliUpdate.vue')
const Sys = () => import('../views/Sys.vue')
const Sysconfig = () => import('../views/systemMange/system/Sysconfig.vue')
const Sysdepart = () => import('../views/systemMange/bumen/Sysdepart.vue')
const Sysrole = () => import('../views/userMange/rolemange/Sysrole.vue')
const Sysuser = () => import('../views/userMange/usermange/Sysuser.vue')

const router = createRouter({
  /* 环境变量 */
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      redirect: "/home",
      meta: {
        auth: true,
      },
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
          meta: {
            auth: true,
          },
        },
        {
          path: "tiku/guanli",
          name: "tikuguanli",
          component: Tikuguanli,
          meta: {
            auth: true,
            breadcrumb: ['考试管理','题库管理']
          },
        },
        {
          path: "tiku/guanli/tikuadd",
          name: "tikuadd",
          component: Tikuadd,
          meta: {
            auth: true,
            breadcrumb: ['考试管理','题库管理','添加题库']
          },
        },
        {
          path: "tiku/guanli/tikudetails/:id",
          name: "tikudetails",
          component: Tikudetails,
          meta: {
            auth: true,
          },
        },
        {
          path: "kaoshi/guanli",
          name: "kaoshiguanli",
          component: Kaoshiguanli,
          meta:{
            auth:true,
            breadcrumb: ['考试管理','考试管理']
          },
        },
        {
          path: "kaoshi/guanli/ExamAddAndUpdata/:id?",
          name: "kaoshiguanliExamAddAndUpdata",
          component: ExamAddAndUpdata,
          meta:{
            auth:true
          },
        },
        {
          path: "kaoshi/guanli/ExamDetail/:id?",
          name: "kaoshiguanliExamDetail",
          component: ExamDetail,
          meta:{
            auth:true
          },
        },
        {
          path: "kaoshi/guanli/ExamUpData/:id?",
          name: "kaoshiguanliExamUpData",
          component: ExamUpData,
          meta: {
            auth: true,
          },
        },
        {
          path: "shiti/guanli",
          name: "shitiguanli",
          component: Shitiguanli,
          meta: {
            auth: true,
            breadcrumb: ['考试管理','试题管理']
          },
        },
        {
          path:'shiti/guanli/add',
          name:'ShitiguanliAdd',
          component:ShitiguanliAdd,
          meta: {
            breadcrumb: ['考试管理','试题管理','添加试题']
          },
        },
        {
          path:'shiti/guanli/update/:id',
          name:'ShitiguanliUpdate',
          component:ShitiguanliUpdate
        },
        {
          path: 'sys/config',
          name: 'sysconfig',
          component: Sysconfig,
          meta: {
            auth: true,
            breadcrumb: ['系统设置','系统配置']
          },
        },
        {
          path: "sys/depart",
          name: "sysdepart",
          component: Sysdepart,
          meta: {
            auth: true,
            breadcrumb: ['系统设置','部门管理']
          },
        },
        {
          path: "sys/role",
          name: "sysrole",
          component: Sysrole,
          meta: {
            auth: true,
            breadcrumb: ['用户管理','角色管理']
          },
        },
        {
          path: "sys/user",
          name: "sysuser",
          component: Sysuser,
          meta: {
            auth: true,
            breadcrumb: ['用户管理','用户管理']
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        auth: false,
      },
    },
  ],
});

/* 全局前置守卫 */
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    jiaoYanToken(store.state.userToken.token).then((res)=>{
      console.log(res.data.code)
      if(res.data.code == 0){
        next()
      }else{
        router.push("/login");
      }
    })
  } else {
    next();
  }
});

export default router;
