<template>
  <div style="width:100%;height:40vh;">
    <tsGantt :data="data"
             :columns="columns"
             @onTaskCreate="onTaskCreate"
             @onTaskChangeContent="onTaskChangeContent"
             @onTaskDelete="onTaskDelete"
             @onTaskIndent="onTaskIndent"
             @onTaskTimeChange="onTaskTimeChange"
             @onDragSort="onDragSort"></tsGantt>
  </div>
</template>

<script>
import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import TsGantt from '@/components'

import data from './data.json'

const columns = [
  {
    width: 260,
    minWidth: 210,
    name: 'content',
    visible: true,
    keepVisible: true,
    sortable: true,
  },
  {
    width: 100,
    minWidth: 52,
    name: 'executor',
    visible: true,
    keepVisible: false,
    sortable: true,
  },
  {
    width: 120,
    minWidth: 70,
    name: 'endDate',
    visible: true,
    keepVisible: false,
    sortable: true,
  },
  {
    width: 100,
    minWidth: 70,
    name: 'fs',
    visible: true,
    keepVisible: false,
    sortable: false,
  },
]
export default {
  name: 'App',
  components: {
    TsGantt,
  },
  data() {
    return {
      client: null,
      recordsAdd: [],
      data: [],
      columns,
    }
  },
  created() {
    this.client = new KintoneRestAPIClient({
      baseUrl: process.env.BASR_URL,
      auth: {
        username: process.env.KINTONE_USERNAME,
        password: process.env.KINTONE_PASSWORD,
      },
    })
    for (let i = 0; i < data.length; i += 1) {
      this.recordsAdd.push({
        taskName: {
          value: data[i].taskName,
        },
        assignee: {
          value: data[i].assignee,
        },
        startDate: {
          value: data[i].startDate,
        },
        dueDate: {
          value: data[i].dueDate,
        },
        priority: {
          value: data[i].priority,
        },
        status: {
          value: data[i].status,
        },
      })
      this.data.push({
        content: data[i].taskName,
        executor: data[i].assignee,
        startDate: data[i].startDate,
        endDate: data[i].dueDate,
        priority: data[i].priority,
        status: data[i].status,
      })
    }
    this.client.record
      .getRecords({
        app: process.env.APPID,
      })
      .then((resp) => {
        if (resp.records.length !== 6) {
          this.client.record
            .addRecords({
              app: process.env.APPID,
              records: this.recordsAdd,
            })
            .then(() => {
              window.location.reload()
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
  },
  methods: {
    /**
     * 创建任务
     * parent: 父任务
     * task: 当前任务
     */
    onTaskCreate(parent, task) {
      console.log(parent, task, 'onTaskCreate>>>>>>>>>>>>')
    },
    /**
     * 任务修改
     * task: 任务数据
     * content: 修改的内容
     * oldContent:
     */
    onTaskChangeContent(task, content, oldContent) {
      console.log(parent, content, oldContent, 'onTaskChangeContent>>>>>>>>>')
    },
    /**
     * 删除任务
     * task 删除当前任务
     */
    onTaskDelete(task) {
      console.log(task, 'onTaskDelete >>>>>>>>>>>>>>>>>')
    },
    /**
     * 任务左右移动
     * parent 父级任务
     * task 当前任务
     */
    onTaskIndent(parent, task) {
      console.log(parent, task, 'onTaskIndent>>>>>>>>>>>>')
    },
    /**
     * 时间发生变更
     */
    onTaskTimeChange(task, startDate, endDate) {
      console.log(task, startDate, endDate, 'onTaskTimeChange>>>>>>>>>')
    },
    /**
     * 任务层级上下拖拽逻辑
     */
    onDragSort(preParent, parentTask, preIndex, index, handleTask) {
      console.log(preParent, parentTask, preIndex, index, handleTask, 'onDragSort>>>>>>')
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px 25px 0;
}

html,
body {
}
</style>
