<template>
  <div>
    <h2>{{ tableName }}</h2>
    <table>
      <thead>
        <tr>
          <th>Столбец 1</th>
          <th>Столбец 2</th>
          <th>Столбец 3</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id">
          <td>{{ item.column1 }}</td>
          <td>{{ item.column2 }}</td>
          <td>{{ item.column3 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup></script>

<style scoped></style>
