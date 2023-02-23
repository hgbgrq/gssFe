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