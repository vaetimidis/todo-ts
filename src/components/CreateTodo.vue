<script setup lang="ts">
import { reactive, ref } from "vue";
import { Todo, TodoStatus } from "../types";
import useTodos from "../store/useTodos";

const props = defineProps<Props>();
const shouldDisplayForm = ref(false);

const { addNewTodo } = useTodos();

const newTodo = reactive<Omit<Todo, "id">>({
    title: "",
    description: "",
    status: props.status,
});

const resetForm = () => {
    shouldDisplayForm.value = false;
    newTodo.title = "";
    newTodo.description = "";
};

interface Props {
    status: TodoStatus;
}

const handleOnSubmit = () => {
    addNewTodo({ id: Math.random() * 1000000000, ...newTodo });
    resetForm();
};
</script>

<template>
    <div class="form-wrapper">
        <h3
            v-if="!shouldDisplayForm"
            @click="shouldDisplayForm = !shouldDisplayForm"
        >
            add new todo
        </h3>
        <template v-else>
            <form @submit.prevent="handleOnSubmit">
                <div>
                    <input
                        type="text"
                        placeholder="title"
                        v-model="newTodo.title"
                    />
                </div>
                <div>
                    <textarea
                        type="text"
                        placeholder="title"
                        v-model="newTodo.description"
                    />
                </div>
                <div class="buttons">
                    <button type="submit">Submit</button>
                    <button type="button" @click="resetForm">Cancel</button>
                </div>
            </form>
        </template>
    </div>
</template>

<style scoped lang="scss">
.form-wrapper {
    display: flex;
    flex-direction: column;

    input,
    textarea {
        background-color: #e4e4e4;
        margin-bottom: 15px;
        color: #6b6ba2;
        max-width: 250px;
        border-radius: 5px;
        font-size: 20px;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
}
</style>
