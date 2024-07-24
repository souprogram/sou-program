<template>
    <div class="wrapper">
        <div v-if="status === 'active'" class="circle active"></div>
        <div v-else-if="status === 'inactive'" class="circle inactive"></div>
        <div v-else-if="status === 'pending'" class="circle pending"></div>
    </div>
</template>

<script>

const props = {
    status: {
        type: String,
        required: true,
    },
};
export default {
    name: 'UserStatusIndicator',
    props
};
</script>

<style scoped>

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}
.circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
}
.active {
    background-color: green;
}
.inactive {
    background-color: gray;
}
.pending {
    background-color: yellow;
}
</style>