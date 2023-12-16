<template>
    <div class="card">
        <form
            class="card-body d-flex flex-column align-items-center gap-2 mx-auto"
            @submit.prevent="create"
        >
            <input
                type="text"
                class="form-control"
                v-model.trim="todoListTitle"
            />
            <textarea
                class="form-control"
                v-model.trim="todoListText"
            ></textarea>
            <button
                type="submit"
                class="btn btn-primary"
                :disabled="!todoListTitle"
            >
                Dodaj todo listu
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'addTodoList',
    props: {
        createTodoList: {
            type: Function,
            required: true,
        },
    },
    data: function () {
        return {
            todoListTitle: '',
            todoListText: '',
        };
    },
    methods: {
        create() {
            this.createTodoList({
                title: this.todoListTitle,
                text: this.todoListText,
            });
            this.todoListTitle = '';
            this.todoListText = '';
        },
    },
};
</script>
