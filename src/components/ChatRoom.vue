<template>
    <div class="chat-room-wrapper">
        <div class="msg-list-wrapper">
            <ul class="msg-list">
                <li v-for="(msg, idx) in msgs" :key="idx" class="msg-item" :class="msgItem(msg.className, idx)">
                    <div class="msg-wrapper">
                        {{ msg.content }}
                    </div>
                </li>
            </ul>
        </div>
        <div class="text-form">
            <input v-model="userMsg" type="text">
            <button @click="sendMsg">submit</button>
            <button @click="leaveRoom">leave</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userMsg: '',
        }
    },
    props: {
        msgs: {
            type: Array,
            required: true
        }
    },
    methods: {
        sendMsg() {
            this.$emit('send-msg', this.userMsg);
        },
        leaveRoom() {
            this.$emit('leave-room');
        },
        msgItem(className, idx) {
            return {
                [className]: true,
                last: this.msgs[idx + 1] === undefined || this.msgs[idx + 1].className !== className
            }
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    border: 1px solid;
}

.chat-room-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.msg-list-wrapper {
    list-style-type: none;
    overflow-y: scroll;
    flex-grow: 1;
}

.text-form {
    flex: none;
}

.msg-item {
    padding: 1px 5px;
    .msg-wrapper {
        display: inline-block;
        padding: 5px 8px;
        border-radius: 7px;
    }

}

.msg-item.mine {
    text-align: right;
}

.msg-item.mine.last {
    .msg-wrapper {
        border-end-end-radius: 0px;
    }
}

.msg-item.other.last {
    .msg-wrapper {
        border-end-start-radius: 0px;
    }
}

.msg-item.admin {
    text-align: center;
}


</style>