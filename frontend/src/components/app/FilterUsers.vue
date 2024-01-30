<template>
    <div>
        <div class="form-group">
            <select class="form-control" id="type"  required @change="updateValue" :value="modelValue">
                <option value="" disabled selected>
                    Odaberi tip korisnika
                </option>
                <option value="demonstrator">Demonstrator</option>
                <option value="student">Student</option>
                <option value="all">Svi korisnici</option>
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
