<template>
    <div class="card">
        <input
            name="search"
            type="text"
            class="form-control"
            :placeholder="placeholder"
            v-model="searchTerm"
            @input="search"
        />
    </div>
</template>

<script>
const props = {
    placeholder: {
        type: String,
        default: '',
    },
    onSearch: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'Search',
    props,
    data() {
        return {
            searchTerm: '',
        };
    },
    methods: {
        search() {
            this.onSearch(this.searchTerm);
        },
    },
};
</script>
