<script setup lang="ts">
import { computed } from "vue";
import Draggable from "vuedraggable";

import { TodoStatus, Todo } from "../types";
import useTodos from "../store/useTodos";
import CreateTodo from "./CreateTodo.vue";

interface Props {
    status: TodoStatus;
}

const props = defineProps<Props>();

const { getTodosByStatus, deleteTodo, updateTodo } = useTodos();
const todoList = getTodosByStatus(props.status);

const groupLabel = {
    [TodoStatus.Pending]: "Pending",
    [TodoStatus.InProgress]: "In Progress",
    [TodoStatus.Completed]: "Completed",
};

const onDraggableChange = (payload: any) => {
    if (payload?.added?.element) {
        updateTodo(payload?.added?.element, props.status);
    }
};
</script>

<template>
    <div class="group-wrapper">
        <h3>{{ groupLabel[props.status] }}</h3>
        <Draggable
            class="draggable"
            :list="todoList"
            group="todos"
            itemKey="id"
            @change="onDraggableChange"
        >
            <template #item="{ element: todo }">
                <li>
                    {{ todo.title }}
                    <span class="delete-icon" @click="deleteTodo(todo)">x</span>
                    <div>
                        <span class="todo-description">{{
                            todo.description
                        }}</span>
                    </div>
                </li>
            </template>
        </Draggable>

        <CreateTodo :status="props.status" />
    </div>
</template>

<style scoped lang="scss">
.group-wrapper {
    flex: 1;
    padding: 20px;
    background-color: #6b6ba2;
    width: 300px;

    .draggable {
        min-height: 200px;

        .delete-icon {
            float: right;
            cursor: pointer;
        }
    }

    li {
        list-style-type: none;
        background-color: #e4e4e4;
        color: #6b6ba2;
        padding: 2px 5px;
        cursor: grab;
        margin-bottom: 10px;
    }

    .todo-description {
        font-size: 12px;
    }
}
</style>
