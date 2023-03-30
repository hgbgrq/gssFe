<script setup lang="ts">
const router = useRouter()
interface IChildren {
  menuId: string
  menuPath: string
  menuName: string
}
interface IMenuList {
  menuId: string
  menuPath: string
  menuName: string
  children: IChildren[]
}
interface IPageList {
  id: string
  name: string
  menuList: IMenuList[]
}
const pageList: IPageList = reactive({
  id: 'adminPage',
  name: '관리자 페이지',
  menuList: [
    {
      menuId: 'page',
      menuPath: '/admin/org',
      menuName: '페이지',
      children: [
        {
          menuId: 'uploadFile',
          menuPath: '/admin/org',
          menuName: '파일 업로드',
        },
        {
          menuId: 'fileList',
          menuPath: '/admin/org',
          menuName: '파일 목록 조회',
        },
        {
          menuId: 'purchaseOrders',
          menuPath: '/admin/org',
          menuName: '발주서 조회',
        },
      ],
    },
    {
      menuId: 'admin',
      menuPath: '/admin/org',
      menuName: '관리자',
      children: [
        {
          menuId: 'companyManagement',
          menuPath: '/admin/org',
          menuName: '회사 관리',
        },
        {
          menuId: 'employeeManagement',
          menuPath: '/admin/org',
          menuName: '사원 관리',
        },
      ],
    },
  ],
})

const activeMenu = (menuPath: string) => {
  router.push(menuPath)
}
</script>

<template>
  <nav class="sidebar">
    <el-row class="tac">
      <el-col>
        <p class="title">
          MENU
        </p>
        <el-menu
          text-color="#ffffff"
          background-color="#484d5b"
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-sub-menu v-for="page in pageList.menuList" :key="page.menuId" :index="page.menuId">
            <template #title>
              <span>{{ page.menuName }}</span>
            </template>
            <el-menu-item v-for="childrenMenu in page.children" :key="`childrenMenu-${childrenMenu.menuId}`" :index="`${page.menuId}-${childrenMenu.menuId}`" @click="activeMenu(childrenMenu.menuPath)">
              {{ childrenMenu.menuName }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </nav>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  z-index: 600;
  width: 220px;
  background-color: #484d5b;
  text-align: center;
}
.title {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}
.font__subtitle {
    padding: 8px 0;
    color: white;
    font-weight: 500;
    cursor: default;
}
</style>
