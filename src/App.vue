<template>
    <div id="app">
        <!-- start view -->
        <template v-if="currentPageStatus === pageStatus.init">
            <button @click="joinRoom">join room</button>
        </template>

        <!-- waiting view -->
        <template v-if="currentPageStatus === pageStatus.wait">
            waiting ...
        </template>

        <!-- chat room -->
        <chat-room 
            v-if="currentPageStatus === pageStatus.inroom" 
            :msgs="msgs" 
            :is-other-typing="isOtherTyping"
            @send-msg="sendMsg" 
            @leave-room="leaveRoom" 
            @user-is-typing="userIsTyping"
        />
    </div>
</template>

<script>
import MsgVO from "@/vo/MsgVO";
import ChatRoom from "@/components/ChatRoom";
import uniqid from "uniqid";

export default {
    name: "App",
    components: {
        ChatRoom,
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
            isOtherTyping: false
        };
    },
    sockets: {
        connect() {
            // 如果有 room id 就重新加入 room
            const roomId = this.$localStorage.get("ri");
            if (roomId === "WAITING_ROOM") {
                this.$socket.emit("USER_RECONNECT_WAITING_ROOM");
                return;
            }

            if (roomId !== null) {
                this.$socket.emit("USER_RECONNECT_CHAT_ROOM", roomId, this.$localStorage.get("ut"));
            }
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
            this.insertMsgToWindow(userOrder, msg);
        },
        USER_SET_HIST_MSGS(historyMsgs) {
            historyMsgs.forEach(msg => {
                console.log(msg)
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
        },
        userIsTyping(bool) {
            this.$socket.emit('USER_IS_TYPING', this.$localStorage.get("ri"), bool)
        }
    },
    mounted() {
        this.currentPageStatus = this.pageStatus.init;
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
    background: linear-gradient(to bottom, $k-blue, darken($k-blue, 10%)) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
