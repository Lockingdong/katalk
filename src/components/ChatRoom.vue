<template>
    <div class="chat-room-wrapper">
        <div ref="msgList" class="msg-list-wrapper">
            <transition-group name="list" tag="ul" class="msg-list">
                <li v-for="(msg, idx) in msgs" :key="`msg${idx}`" class="msg-item" :class="msgItem(msg.className, idx)">
                    <div class="msg-wrapper">
                        {{ msg.content }}
                    </div>
                </li>
                <li v-if="isOtherTyping" class="msg-item other" :key="'other_typing'">
                    <div class="msg-wrapper">
                        對方正在輸入...
                    </div>
                </li>
            </transition-group>
        </div>
        <div class="text-form">
            <div class="form-wrapper">
                <div class="form-btn leave" @click="leaveRoom">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
                <div class="text-wrapper">
                    <input @keyup.enter="sendMsg" class="text-msg" v-model="userMsg" type="text">
                </div>
                <div class="form-btn" @click="sendMsg">
                    <i class="fas fa-paper-plane"></i>
                </div>
            </div>
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
        },
        isOtherTyping: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        userMsgHasValue() {
            return this.userMsg !== ''
        }
    },
    methods: {
        sendMsg() {
            if(this.userMsg.trim() === '') {
                return
            }
            this.$emit('send-msg', this.userMsg);
            this.userMsg = ''
        },
        leaveRoom() {
            this.$emit('leave-room');
        },
        msgItem(className, idx) {
            return {
                [className]: true,
                last: this.msgs[idx + 1] === undefined || this.msgs[idx + 1].className !== className
            }
        },
        msgListScrollDown() {
            this.$nextTick(() => {
                let container = this.$refs.msgList;
                container.scrollTop = container.scrollHeight;
            })
        }
    },
    watch: {
        userMsgHasValue(nv, ov) {
            this.$emit('user-is-typing', nv)
            
        },
        isOtherTyping(nv, ov) {
            if(nv) {
                this.msgListScrollDown();
            }
        },
        msgs() {
            this.msgListScrollDown();
        }
    },
    mounted() {
        this.msgListScrollDown()
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
    max-width: 576px;
    width: 100%;
    margin: 0 auto;
}

.text-form {
    flex: none;
    height: 40px;
    font-size: 0;
    .form-wrapper {
        display: flex;
        height: 100%;
        * {
            outline: none;
        }

        .text-wrapper {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .text-msg {
                appearance: none;
                width: calc(100% - 10px);
                height: 30px;
                box-sizing: border-box;
                border-radius: 50px;
                font-size: 16px;
                padding: 2px 5px;
            }
        }

        .form-btn.leave {
            transform: scaleX(-1);
        }
        .form-btn {
            flex: none;
            width: 40px;
            font-size: 20px;
            appearance: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }

    }
}

.msg-item {
    padding: 1px 5px;
    .msg-wrapper {
        display: inline-block;
        word-break: break-all;
        padding: 5px 8px;
        border-radius: 7px;
        max-width: 200px;
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


.list-enter-active,
.list-leave-active,
.list-move {
    transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    transition-property: opacity, transform;
}
    


.list-enter {
    opacity: 0;
    transform: translateX(-50px) scaleY(0.5);
}
    
.list-enter.mine {
    transform: translateX(50px) scaleY(0.5);
}


.list-enter-to {
    opacity: 1;
    transform: translateX(0) scaleY(1);
}
    

.list-leave-active {
    position: absolute;
}

.list-leave-to {
    transition: .1s;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center top;
}
    
</style>