<template>
    <div class="chat-room-wrapper">
        <div ref="msgList" class="msg-list-wrapper">
            <transition-group name="list" tag="ul" class="msg-list">
                <li v-for="(msg, idx) in msgs" :key="`msg${idx}`" class="msg-item" :class="msgItem(msg.className, idx)">
                    <div v-if="msg.className === 'admin'" class="msg-wrapper" v-html="msg.content">
                    </div>
                    <div v-else class="msg-wrapper">
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
            <div class="hist-msg-list">
                <ul>
                    <li v-for="(m, idx) in histMsgArr" :key="idx" @click="triggerInput(m)">{{ m }}</li>
                </ul>
            </div>
            <div class="form-wrapper">
                <div class="form-btn leave" @click="showLeaveRoomForm">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
                <div class="text-wrapper">
                    <input ref="textInput" @keyup.enter="sendMsg" class="text-msg" v-model="userMsg" type="text" :disabled="userMsgFormDisabled">
                </div>
                <div class="form-btn" @click="sendMsg">
                    <i class="fas fa-paper-plane"></i>
                </div>
            </div>
        </div>
        <confirm-form
            @confirm="leaveRoom"
        />
    </div>
</template>
<script>
import ConfirmForm from '@/components/widget/ConfirmForm'

export default {
    data() {
        return {
            userMsg: '',
            userMsgFormDisabled: false,
            histMsgArr: [],
        }
    },
    components: {
        ConfirmForm
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
            
            let trimedMsg = this.userMsg.trim();
            if(trimedMsg === '') {
                return
            }

            if(this.userMsgFormDisabled) {
                return;
            }

            let newMsg = this.filterMsg(trimedMsg, 200);

            this.pushInHistMsg(newMsg);

            this.$emit('send-msg', newMsg);
            this.userMsg = ''
            this.lockUserMsgForm();
        },
        filterMsg(msg, count) {

            let str = msg;
            if(str.length > count) {
                str = str.substring(0,count);
                return str + '...';
            }
            return str
        },
        pushInHistMsg(msg) {
            let histMsg = this.$localStorage.get('hms');
            let histMsgArr = JSON.parse(histMsg);

            if(msg.length <= 5 && !histMsgArr.includes(msg)) {
                histMsgArr.unshift(msg);

                if(histMsgArr.length >= 6) {
                    histMsgArr.pop();
                }
            }
            this.$localStorage.set('hms', JSON.stringify(histMsgArr));
            this.histMsgArr = histMsgArr;
        },
        showLeaveRoomForm() {
            this.$modal.show('confirm-form', {
                header: '確定要離開嗎？',
                content: '離開後訊息將無法還原'
            })
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
        },
        triggerInput(msg) {
            this.userMsg = msg;
            this.$refs.textInput.focus();
        },
        lockUserMsgForm() {
            this.userMsgFormDisabled = true;
            setTimeout(() => {
                this.userMsgFormDisabled = false;
                this.$nextTick(() => {
                    this.$refs.textInput.focus();
                })
            }, 800)
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
        this.histMsgArr = JSON.parse(this.$localStorage.get('hms'))
    }
}
</script>
<style lang="scss">
@import '../scss/color.scss';

.chat-room-wrapper {
    height: 100%;
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
    background-color: rgba(#000, 0.4);
    border-radius: 10px;
    
    .msg-list {
        padding: 20px 0;
        padding-bottom: 45px;
    }
}

/* Hide scrollbar for Chrome, Safari and Opera */
.msg-list-wrapper::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.msg-list-wrapper {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.text-form {
    flex: none;
    height: 50px;
    font-size: 0;
    background-color: darken($k-d-brown, 1%);
    position: relative;
    &:before {
        content: '';
        position: absolute;
        display: inline-block;
        height: 20px;
        width: 100%;
        bottom: 0;
        left: 50%;
        top: 0;
        background: linear-gradient(to bottom, transparent, darken($k-blue, 10%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        transform: translate(-50%, -100%);
        max-width: 576px;
        z-index: 1;
    }
    .hist-msg-list {
        z-index: 2;
        position: absolute;
        max-width: 576px;
        width: 100%;
        bottom: 0;
        left: 50%;
        top: 0;
        transform: translate(-50%, -100%);
        color: black;
        font-size: 13px;
        height: 40px;
        padding: 0 10px;
        ul {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            li {
                display: inline-block;
                color: #333;
                background-color: rgba(lighten($k-white, 10%), 0.8);
                border-radius: 15px;
                padding: 3px 7px;
                margin-right: 8px;
                cursor: pointer;
            }
        }
    }

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
                padding: 2px 10px;
                border: none;
                background-color: darken($k-d-brown, 8%);
                color: lighten($k-white, 5%);
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
            color: lighten($k-white, 5%);
            cursor: pointer;
        }

    }
}

.msg-item {
    padding: 2px 10px;
    .msg-wrapper {
        display: inline-block;
        word-break: break-all;
        padding: 10px 15px;
        border-radius: 10px;
        max-width: 200px;
        a {
            color: lighten($k-white, 5%);
        }
        
    }
}

.msg-item.other {
    .msg-wrapper {
        color: lighten($k-white, 5%);
        // background: #DA22FF;  /* fallback for old browsers */
        background: linear-gradient(to bottom, lighten($k-purple, 10%), darken($k-purple, 0%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
}

.msg-item.mine {
    text-align: right;
    .msg-wrapper {
        text-align: left;
        color: lighten($k-white, 5%);
        background: rgb(83, 83, 83);  /* fallback for old browsers */
    }
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
    .msg-wrapper {
        color: rgba(lighten($k-white, 5%), 0.7);
        font-size: 14px;
        padding: 5px 0;
        
    }
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