<template>
    <button :class="`btn btn-${actionType}`" @click="onClick">
        <i :class="`fa-solid fa-${faIcon[actionType]}`"></i>
    </button>
</template>

<script>
const props = {
    onClick: {
        type: Function,
        default: () => {},
    },
    actionType: {
        type: String,
        required: true,
    },
};

export default {
    name: 'DeleteButton',
    props,
    data: function () {
        return {
            faIcon: {
                delete: 'trash',
                edit: 'pen',
            },
        };
    },
};
</script>
