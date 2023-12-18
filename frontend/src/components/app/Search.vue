<template>
    <div class="card">
        <input
            class="form-control"
            type="text"
            :placeholder="placeholder"
            :value="searchTerm"
            @input="updateValue"
        />
    </div>
</template>
  
<script>
export default {
    props: {
        searchTerm: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
    methods: {
        updateValue(event) {
            const value = event.target.value;
            this.$emit('update:searchTerm', value);
        },
    },
};
</script>
  