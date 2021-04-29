<template>
  <div>
    <el-table
      :data="tableData"
      :default-expand-all="true"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>State: {{ props.row.state }}</p>
          <p>City: {{ props.row.city }}</p>
          <p>Address: {{ props.row.address }}</p>
          <p>Zip: {{ props.row.zip }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="Date"
        prop="date">
      </el-table-column>
      <el-table-column
        label="Name"
        prop="name">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OperationsList',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style module>
</style>
