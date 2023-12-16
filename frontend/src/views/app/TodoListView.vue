<template>
    <div class="d-flex flex-column gap-2 h-100">
        <div class="card">
            <div class="card-body">
                <h1>Todo liste</h1>
            </div>
        </div>

        <addTodoList :createTodoList="createTodoList" />

        <div class="card" v-for="todoList in todoLists" :key="todoList">
            <div class="card-body">
                <h5>{{ todoList.title }}</h5>
                <span class="text-muted">{{ todoList.text }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import addTodoList from '@/components/app/addTodoList.vue';

export default {
    name: 'TodoListView',
    components: {
        addTodoList,
    },
    data: function () {
        return {
            todoLists: [
                {
                    title: 'Todo List Title',
                    text: 'Great todo list!',
                },
            ],
        };
    },
    methods: {
        createTodoList(todoList) {
            this.todoLists.push(todoList);
        },
    },
};
</script>
