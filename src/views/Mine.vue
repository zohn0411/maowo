<template>
    <div id="mine">
        <Header title="我的猫窝" />
        <div id="content">
            <router-view />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
    name: 'Mine',
    data() {
        return {}
    },
    components: {
        Header,
        Footer
    }
}
</script>

<style scoped>
    
</style>