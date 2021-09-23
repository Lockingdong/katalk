<template>
    <div @click.self="closeNavbar" class="navbar">
        <div class="nav-content">
            <div class="logo-wrapper">
                <img src="@/assets/bar.png" alt="">
                <!-- <div class="title">聊BAR</div> -->
            </div>
            <ul>
                <li>關於聊Bar</li>
                <li>服務條款</li>
                <li>尋人專區</li>
                <li class="mute">
                    通知音效
                    <input v-model="navMuted" type="checkbox" id="switch" /><label for="switch">Toggle</label>
                </li>
                <li><i class="fas fa-donate"></i> 贊助開發APP基金</li>
            </ul>
            <div class="media">
                <a href="https://www.facebook.com/talkbartalk/" target="_blank">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/talkbartalk/" target="_blank">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        muted: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeNavbar() {
            this.$emit('close-navbar', false)
        }
    },
    computed: {
        navMuted: {
            get() {
                return !this.muted
            },
            set(val) {
                this.$emit('toggle-muted')
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/scss/color";

.navbar {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.5);
    top: 0;
    right: 0;
    z-index: 10;
    .nav-content {
        position: absolute;
        min-width: 250px;
        width: 30%;
        height: 100%;
        right: 0;
        top: 0;
        background-color: #333;
        box-shadow: 0 1px 10px rgba(#000, 0.5);
        padding-top: 80px;
        ul {
            color: #fff;
            li {
                padding: 6px 10px;
                border-bottom: 1px solid rgba(#fff, 0.3);
                text-align: center;
                &:first-child {
                    border-top: 1px solid rgba(#fff, 0.3);
                }
            }
            .mute {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

    }

    .logo-wrapper {
        text-align: center;
        margin-bottom: 20px;
        img {
            width: 120px;
        }
        .title {
            text-shadow: 
            0 0 5px $k-light-blue, 
            0 0 10px $k-light-blue, 
            0 0 15px $k-light-blue;
            color: #fff;
            font-size: 16px;
        }
    }

    .media {
        display: flex;
        color: #fff;
        width: 80px;
        margin: 0 auto;
        justify-content: space-between;
        margin-top: 20px;
        a {
            display: inline-block;
            color: #fff;
            font-size: 25px;
        }
    }

    input[type=checkbox]{
        height: 0;
        width: 0;
        visibility: hidden;
        margin-left: 10px;
    }

    label {
        cursor: pointer;
        text-indent: -9999px;
        width: 40px;
        height: 20px;
        background: grey;
        display: block;
        border-radius: 100px;
        position: relative;
    }

    label:after {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 90px;
        transition: 0.3s;
    }

    input:checked + label {
        background: #bada55;
    }

    input:checked + label:after {
        left: calc(100% - 0px);
        transform: translateX(-100%);
    }

    label:active:after {
        width: 30px;
    }
}
</style>