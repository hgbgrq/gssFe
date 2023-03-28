<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

const mainPage = {

    id: 'mainPage',
    name : '기본',
    menuList: [
    ]


}

const adminPage = {

    id: 'adminPage',
    name: '관리자 페이지',
    menuList :[
        {
            menuId: 'org',
            menuPath: '/admin/org',
            menuName: '조직 관리'
        }
    ]
}

const activeMenu = (targetId: string, menu: string) => {
  router.push(`/${targetId}/${menu}`)
}

</script>

<template>
    <nav class = "sidebar">
        <ul class="flex-1 mb-2 sidebar__wrap">
            <li v-for="menu in adminPage.menuList" :key="menu.menuId"
            @click="activeMenu(menu)">
                <div class="font__subtitle">
                    <div class="menu">
                        {{menu.menu}}
                    </div>
                </div>
            </li>
        </ul>
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
.font__subtitle {
    padding: 8px 0;
    color: white;
    font-weight: 500;
    cursor: default;
}
</style>