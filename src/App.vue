<template>
    <div id="app">
        <!-- start view -->
        <Adsense
            data-ad-client="ca-pub-5005950761451963"
            data-ad-slot="5777063646"
            data-full-width-responsive="true"
        >
        </Adsense>
        <transition name="fade">
            <navbar
                v-if="navOpen"
                :muted="muted"
                @toggle-muted="toggleMuted"
                @close-navbar="navOpen = false"
            />
        </transition>
        <div @click="navOpen = !navOpen" class="ham">
            <span class="line1"></span>
            <span class="line2"></span>
        </div>
        

        <transition name="fade">
            <landing-page 
                v-if="currentPageStatus === pageStatus.init"
                :show-join-button="showJoinButton"
                @join-room="joinRoom"
            />

            <!-- waiting view -->
            <waiting-page v-if="currentPageStatus === pageStatus.wait" 
            />

            <!-- chat room -->
            <chat-room 
                v-if="currentPageStatus === pageStatus.inroom" 
                :msgs="msgs" 
                :is-other-typing="isOtherTyping"
                @send-msg="sendMsg" 
                @leave-room="leaveRoom" 
                @user-is-typing="userIsTyping"
            />
        </transition>
    </div>
</template>

<script>
import MsgVO from "@/vo/MsgVO";
import ChatRoom from "@/components/ChatRoom";
import LandingPage from "@/components/LandingPage";
import WaitingPage from "@/components/WaitingPage";
import Navbar from "@/components/Navbar"

import uniqid from "uniqid";
import alert from "@/assets/alert.mp3"

export default {
    name: "App",
    components: {
        ChatRoom,
        LandingPage,
        WaitingPage,
        Navbar
    },
    data() {
        return {
            msgs: [],
            pageStatus: {
                init: "INIT",
                wait: "WAIT",
                inroom: "INROOM",
            },
            currentPageStatus: "",
            isOtherTyping: false,
            navOpen: false,
            muted: true,
            notificationCount: 0,
            showJoinButton: false,
            docTitle: ''
        };
    },
    sockets: {
        connect() {
            // 如果有 room id 就重新加入 room
            const roomId = this.$localStorage.get("ri");
            if (roomId === "WAITING_ROOM") {
                this.leaveRoom();
                this.showJoinButton = true;
                // this.$socket.emit("USER_RECONNECT_WAITING_ROOM");
                return;
            }

            if (roomId !== null) {
                this.$socket.emit("USER_RECONNECT_CHAT_ROOM", roomId, this.$localStorage.get("ut"));
                return;
            }

            this.showJoinButton = true;
        },
        USER_CLEAR_ROOM() {
            this.resetToInit();
        },
        JOIN_CHAT_ROOM_SUCCESS(roomId) {
            this.$localStorage.set("ri", roomId);
            this.currentPageStatus = this.pageStatus.inroom;
        },
        JOIN_WAITING_ROOM() {
            this.$localStorage.set("ri", "WAITING_ROOM");
            this.currentPageStatus = this.pageStatus.wait;
        },
        USER_RECONNECT_CHAT_ROOM() {
            this.currentPageStatus = this.pageStatus.inroom;
        },
        USER_RECONNECT_WAITING_ROOM() {
            this.currentPageStatus = this.pageStatus.wait;
        },
        USER_RECV_MSG([userOrder, msg]) {
            this.addNotification();
            this.insertMsgToWindow(userOrder, msg);
            if(userOrder !== 0) {
                this.alertSound();
            }
        },
        USER_SET_HIST_MSGS(historyMsgs) {
            historyMsgs.forEach(msg => {
                // console.log(msg)
                let [userOrder, content] = JSON.parse(msg)
                this.insertMsgToWindow(userOrder, content);
            });
        },
        OTHER_IS_TYPING(bool) {
            this.isOtherTyping = bool;
        }
    },
    computed: {
    },
    watch: {
        notificationCount(nv, ov) {
            if(nv === 1) {
                document.title = `(🔔) ${this.docTitle}`;
            } else {
                document.title = this.docTitle;
            }
        }
    },
    methods: {
        getUserOrder() {
            let userToken = this.$localStorage.get("ut");
            let roomId = this.$localStorage.get("ri");

            let roomIdArr = roomId.split(":");

            return userToken === roomIdArr[0] ? 1 : 2;

        },
        joinRoom() {
            this.$socket.emit("USER_CLICK_JOIN_ROOM", this.$localStorage.get("ut"));
        },
        leaveRoom() {
            this.$socket.emit("USER_CLICK_LEAVE_ROOM", this.$localStorage.get("ri"), this.$localStorage.get("ut"));
            this.resetToInit();
        },
        sendMsg(content) {
            let userOrder = this.getUserOrder();
            this.insertMsgToWindow(userOrder, content);
            this.emitUserMsg(userOrder, content);
        },
        emitUserMsg(userOrder, content) {
            this.$socket.emit("USER_SEND_MSG", this.$localStorage.get("ri"), userOrder, content);
        },
        insertMsgToWindow(userOrder, content) {
            let localUserOrder = this.getUserOrder();
            let className;
            if (userOrder === localUserOrder) {
                className = "mine";
            } else if (userOrder === 0) {
                className = "admin";
            } else if (userOrder !== localUserOrder) {
                className = "other";
            } else {
                console.log("user order not found");
            }

            let msg = new MsgVO(className, content);

            this.msgs.push(msg);
        },
        resetToInit() {
            this.$localStorage.remove("ri");
            this.currentPageStatus = this.pageStatus.init;
            this.msgs = [];
            this.isOtherTyping = false;
            this.showJoinButton = true;
        },
        userIsTyping(bool) {
            this.resetNotification()
            this.$socket.emit('USER_IS_TYPING', this.$localStorage.get("ri"), bool)
        },
        toggleMuted() {
            this.muted = !this.muted;
        },
        addNotification() {
            this.notificationCount = 1;
        },
        resetNotification() {
            this.notificationCount = 0;
        },
        alertSound() {
            if(!this.muted) {
                const sound = new Audio(alert);
                sound.play();
            }
        }
    },
    mounted() {
        this.currentPageStatus = this.pageStatus.init;
        this.docTitle = document.title;

        let windowsVH = window.innerHeight / 100;
        document.querySelector('#app').style.setProperty('--vh', windowsVH + 'px');
        window.addEventListener('resize', function() {
            document.querySelector('#app').style.setProperty('--vh', windowsVH + 'px');
        });
    },
};
</script>
<style lang="scss">
@import './scss/color.scss';

html, body, ul, li {
    padding: 0;
    margin: 0;
}
ul {
    list-style: none;
}

body, html {
    // background: #232526;  /* fallback for old browsers */
    // background: linear-gradient(to bottom, $k-blue, darken($k-blue, 10%)) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background-image: url(assets/bar-bg.png);
    background-position: center center;
    background-size: cover;
}

#app {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    position: relative;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}



.ham {
    height: 30px;
    width: 30px;
    position: absolute;
    right: 15px;
    top: 8px;
    text-align: right;
    cursor: pointer;
    z-index: 11;
    &:hover {
        .line2 {
            width: 100%;
        }
    }
    span {
        width: 100%;
        height: 2px;
        background-color: #fff;
        display: block;
        border-radius: 5px;
        transition: .3s;
    }

    .line1 {
        margin-top: 10px;
    }
    .line2 {
        margin-top: 10px;
        width: 80%;
    }
}


</style>
