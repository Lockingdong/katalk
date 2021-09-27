<template>
    <div class="landing-page">
        <div class="logo-wrapper">
            <img src="@/assets/bar.png" alt="">
        </div>
        <h1 class="title">聊BAR</h1>
        <h3 class="subtitle">來聊BAR聊吧</h3>
        <transition name="fade">
            <button v-if="showJoinButton" class="start-btn" @click="joinRoom">進入包廂</button>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttonDisabled: false
        }
    },
    props: {
        showJoinButton: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        joinRoom() {
            if(this.buttonDisabled) {
                return
            }

            this.buttonDisabled = true
            this.$emit('join-room')
        }
    }
}
</script>



<style lang="scss">
@import "@/scss/color";

.landing-page {

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    .logo-wrapper {
        width: 200px;
        img {
            width: 100%;
        }

    }
    
    .title {
        font-size: 50px;
        color: $k-white;
        margin-bottom: 20px;
        text-shadow: 0 0 5px #f562ff, 0 0 15px #f562ff, 0 0 25px #f562ff,
            0 0 20px #f562ff, 0 0 30px #890092, 0 0 80px #890092, 0 0 80px #890092;
        color: #fccaff;
        
        /*   font-family: "Sacramento", cursive; */
        text-align: center;
        animation: blink 12s infinite;
        margin-bottom: 20px;
        font-weight: 500;
        letter-spacing: 1px;
    }

    .subtitle {
        text-shadow: 
            0 0 5px $k-light-blue, 
            0 0 15px $k-light-blue, 
            0 0 25px $k-light-blue;
        color: #fff;
        font-weight: 300;
        font-size: 16px;
        letter-spacing: 2px;
        margin-bottom: 40px;
    }

    .start-btn {
        background-color: transparent;
        border: 2px solid $k-white;
        color: $k-white;
        border-radius: 5px;
        padding: 8px 18px;
        font-size: 20px;
    }

    @keyframes blink {
        20%,
        24%,
        55% {
            color: #111;
            text-shadow: none;
        }

        0%,
        19%,
        21%,
        23%,
        25%,
        54%,
        56%,
        100% {
            color: $k-white;
            text-shadow: 
                0 0 5px lighten($k-purple, 0%), 
                0 0 10px lighten($k-purple, 0%), 
                0 0 20px lighten($k-purple, 0%),
                0 0 40px lighten($k-purple, 0%), 
                0 0 80px lighten($k-purple, 20%), 
                0 0 90px lighten($k-purple, 20%), 
                0 0 100px lighten($k-purple, 20%),
                0 0 150px lighten($k-purple, 20%);
            // text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
            // color: #fff6a9;
        }
    }
}
</style>