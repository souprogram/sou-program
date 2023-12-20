<template>
    <button :class="`btn btn-${actionType}`">
        <i :class="`fa-solid fa-${faIcon[actionType]}`"></i>
    </button>
</template>

<script>
const props = {
    actionType: {
        type: String,
        required: true,
    },
};

export default {
    name: 'IconButton',
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
