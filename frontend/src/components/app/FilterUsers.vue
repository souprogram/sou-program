<template>
    <div>
        <div class="form-group">
            <select class="form-control" id="type"  required @change="updateValue" :value="modelValue">
                <option v-for="(value, key) in filterData"
                    :key="key" :value="key"
                >
                    {{ value }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>

export default {
    name: 'FilterUsers',
    props: {
        modelValue: {
            type: String,
            default: 'all',
        },
        filterData:{
            type: Object,
            required: true
        }
    },
    components: {},
    data() {
        return {};
    },

    methods: {
        updateValue(event) {
            const value = event.target.value;
            this.$emit('update:modelValue', value);
        },
    },
};
</script>
