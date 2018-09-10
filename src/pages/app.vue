<template>
    <div class="main">
        <p>.我来了{{name}}</p>
        <div class="parent">
            <div class="child"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            name:"vue + webpack"
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
.main>p{
    color: #000;
}

.parent{
    display: flex;
    width: 20px;
    height: 20px;
}

.parent .child{
    flex: 0 0 20px;
}

</style>