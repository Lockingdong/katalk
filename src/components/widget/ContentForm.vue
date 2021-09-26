<template>
    <modal 
        name="content-form"
        :max-width="720"
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
            <button @click="cancel" class="btn btn-secondary me-3">關閉</button>
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
            this.$modal.hide('content-form');
        },
        beforeOpen({ params }) {
            this.header = params.header || ''
            this.content = params.content || ''
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