<script setup lang="ts">
import TodoGroup from "./TodoGroup.vue";
import { TodoStatus } from "../types";
</script>

<template>
    <div class="groups-wrapper">
        <TodoGroup :status="TodoStatus.Pending" />
        <TodoGroup :status="TodoStatus.InProgress" />
        <TodoGroup :status="TodoStatus.Completed" />
    </div>
</template>

<style scroped>
.groups-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
</style>
