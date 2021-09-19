<template>
    <modal 
        name="confirm-form"
        :max-width="600"
        width="90%"
        height="auto"
        :adaptive="true"
        @before-open="beforeOpen"
    >
    <div class="card-body">
        <h4 class="mb-3 text-center">{{ header }}</h4>
        <div class="text-center mb-3" v-if="isContentArray">
            <ul>
                <li v-for="(item, idx) in content" :key="idx"> {{item}} </li>
            </ul>
        </div>
        <div class="text-center mb-3" v-else v-html="content">
        </div>
        <div class="text-center">
            <button @click="cancel" class="btn btn-outline-secondary me-3">取消</button>
            <button @click="confirm" class="btn btn-primary">確定</button>
        </div>
    </div>
            
    </modal>
</template>

<script>
export default {
    data() {
        return {
            header: {
                type: String,
                required: true,
            },
            content: {
                required: true,
            }
        }
    },
    computed: {
        isContentArray() {
            return Array.isArray(this.content)
        }
    },
    methods: {
        close() {
            this.$modal.hide('confirm-form');
        },
        beforeOpen({ params }) {
            this.header = params.header || ''
            this.content = params.content || ''
        },
        confirm() {
            this.$emit('confirm');
            this.close();
        },
        cancel() {
            this.$emit('cancel');
            this.close();
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/color.scss';
.card-body {
    .btn.btn-primary {
        background-color: $k-blue;
    }
}
</style>