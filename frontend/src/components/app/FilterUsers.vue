<template>
    <div>
        <div class="form-group">
            <!-- <label for="type">Tip korisnika</label> -->
            <select class="form-control" id="type" required>
                <option value="" disabled selected>
                    Odaberi tip korisnika
                </option>
                <option value="demonstrator">Demonstrator</option>
                <option value="student">Student</option>
            </select>
        </div>
    </div>
</template>

<script>
const props = {
    user: {
        type: Object,
        required: true,
    },
    onClose: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'FilterUsers',
    props,
    components: {},
    data() {
        return {};
    },

    methods: {},
};
</script>
