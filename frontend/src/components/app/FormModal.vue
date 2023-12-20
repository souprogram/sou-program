<template>
    <div class="modal d-block" tabindex="-1" role="dialog" @click="close">
        <div class="modal-dialog modal-dialog-centered" @click.stop>
            <form
                class="modal-content"
                autocomplete="off"
                @submit.prevent="onConfirm"
            >
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button
                        type="button"
                        class="btn-close"
                        @click="close"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body d-flex flex-column gap-3">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="disabled"
                    >
                        Potvrdi
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
const props = {
    title: {
        type: String,
        default: 'Modal Title',
    },
    onClose: {
        type: Function,
        default: () => {},
    },
    onConfirm: {
        type: Function,
        default: () => {},
    },
    disabled: {
        type: Boolean,
        default: false,
    },
};

export default {
    name: 'FormModal',
    props,
    created() {
        document.body.style.overflow = 'hidden';
    },
    methods: {
        close() {
            this.onClose();
            document.body.style.overflow = '';
        },
    },
};
</script>

<style scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.45);
}
</style>
