<template>
    <div class="d-flex flex-column gap-2 h-100">
        <div class="card">
            <div class="card-body">
                <h1>Todo liste</h1>
            </div>
        </div>
        <div class="card">
            <form
                class="card-body d-flex flex-column align-items-center gap-2 mx-auto"
                @submit.prevent="createTodoList"
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
        <div class="card" v-for="todoList in todoLists" :key="todoList">
            <div class="card-body">
                <h5>{{ todoList.title }}</h5>
                <span class="text-muted">{{ todoList.text }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TodoListView',
    data: function () {
        return {
            todoListTitle: '',
            todoListText: '',
            todoLists: [
                {
                    title: 'Todo List Title',
                    text: 'Great todo list!',
                },
            ],
        };
    },
    methods: {
        createTodoList() {
            this.todoLists.push({
                title: this.todoListTitle,
                text: this.todoListText,
            });

            this.todoListTitle = '';
            this.todoListText = '';
        },
    },
};
</script>
