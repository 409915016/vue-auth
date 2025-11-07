<script setup>
import TodoForm from "@/components/TodoForm.vue";
import TodoDetail from "@/components/TodoDetail.vue";
import {onBeforeMount, ref, computed} from "vue";
import axios from "axios";
const todo_list = ref([
  // { _id: 1, title: '个人生活', date: '2025-04-01 16:27', description: '锻炼30分钟、阅读30页书籍、整理房间并清理书桌', createdAt: '2025-04-01 16:27'},
  // { _id: 2, title: '工作', date: '2025-03-07 16:27', description: '完成并提交项目报告、参加下午3点的团队会议', createdAt: '2025-03-04 16:27:47'},
  // { _id: 3, title: '社交娱乐', date: '2025-03-08 16:27', description: '观看经典电影、参加兴趣小组', createdAt: '2025-03-04 16:27:47'},
  // { _id: 4, title: '财务管理', date: '2025-03-09 16:27', description: '记录本月支出并调整预算、取消不必要的订阅服务', createdAt: '2025-03-04 16:27:47'}
])

const loading = ref(true)
const error = ref(false)

// 'createdAt' -> 最新日期,
// 'date' -> 按计划日期
// 'description' -> 详细计划,
const currentSort = ref("createdAt");

// 排序逻辑：根据选中的复选框状态对列表进行排序
const sortedTodos = computed(() => {
  const sorted = [...todo_list.value];

  if (currentSort.value === 'createdAt') {
    // 按创建日期降序
    return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (currentSort.value === 'date') {
    // 按计划日期降序
    return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (currentSort.value === 'description') {
    // 按计划日期降序
    return sorted.sort((a, b) => b.description.length - a.description.length);
  }

  // 默认顺序
  return sorted;
});
// 复选框切换逻辑：确保每次只选中一个排序方式
function handleSortChange(type) {
  if (type === 'createdAt') {
    sortByCreatedAt.value = !sortByCreatedAt.value;
    if (sortByCreatedAt.value) sortByDate.value = false;
  } else {
    sortByDate.value = !sortByDate.value;
    if (sortByDate.value) sortByCreatedAt.value = false;
  }
}

function onTodoDeleteHandle (value){
  console.log('in App.vue. Delete todo is: ', value)
  const { id } = value
  axios.delete(`http://localhost:3000/todo/${id}`).then((res)=>{
    alert('删除成功')
    refreshTodoList()
  })
}

function getFormattedDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要 +1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function onTodoFormSubmitHandle(todo){
  axios.post('http://localhost:3000/todo', {
    ...todo,
    createdAt: getFormattedDate(),
    // id: Math.random().toString(36).substr(2, 10),
  }).then((res)=>{
    alert('提交成功')
    refreshTodoList()
  })
}

function refreshTodoList (){
  loading.value = true
  axios
      .get('http://localhost:3000/todo')
      .then((res)=>{
        const {status, data} = res
        if(status === 200) {
          todo_list.value = data
          loading.value = false // 改变 loading 的状态
          error.value = false
        }
      })
      .catch(err =>{
        console.log(err)
        loading.value = false
        error.value = true
      })
}
onBeforeMount(()=>{
  refreshTodoList()
})

</script>

<template>
  <div class="home" :class="{'home--loading': loading, 'home--error': error}">
    <template v-if="loading">加载中……</template>
    <template v-else-if="error">
      <p>加载失败，请稍后重试</p>
      <button @click="refreshTodoList">重新加载</button>
    </template>
    <template v-else>
      <div class="todo-list fadeIn">
        <!-- 排序单选按钮区域 -->
        <div class="sort-controls">
          <div class="radio-group">
            <label class="custom-radio">
              <input
                  type="radio"
                  name="sort"
                  value="createdAt"
                  v-model="currentSort"
              >
              <span class="radio-text">最新创建</span>
            </label>
            <label class="custom-radio">
              <input
                  type="radio"
                  name="sort"
                  value="date"
                  v-model="currentSort"
              >
              <span class="radio-text">按计划日期</span>
            </label>
            <label class="custom-radio">
              <input
                  type="radio"
                  name="sort"
                  value="description"
                  v-model="currentSort"
              >
              <span class="radio-text">详细计划</span>
            </label>
          </div>
        </div>

        <!-- 使用排序后的列表渲染 -->
        <div class="todo-list-wrapper">
          <TodoDetail
              @delete="onTodoDeleteHandle"
              v-for="todo in sortedTodos"
              :value="todo"
              :key="todo.id"/>
        </div>

      </div>
      <div class="todo-form fadeIn">
        <TodoForm @onSubmit="onTodoFormSubmitHandle"/>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* homepage */
.home {
  display: flex;
  column-gap: 100px;
}
.home--loading, .home--error{
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #666;
}
.home--error {
  text-align: center;
  flex-direction: column;
  color: #111;
}
.home--error button {
  background: var(--primary);
  border: 0;
  color: #fff;
  padding: 10px;
  font-family: "Poppins";
  border-radius: 4px;
  cursor: pointer;
}
.fadeIn {
  opacity: 1;
  animation: fadeIn 1.5s;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.todo-list {
  flex-grow: 3;
}
.todo-form {
  flex-grow: 1;
}
.todo-list-wrapper {
  margin-top: 30px;
}
/* 自定义单选按钮样式 */
.radio-group {
  display: flex;
  gap: 12px; /* 按钮之间的间距 */
}
.custom-radio {
  cursor: pointer;
  position: relative;
}
/* 隐藏原生单选按钮 */
.custom-radio input[type="radio"] {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
}
/* 单选按钮的文字样式（未选中状态） */
.radio-text {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 5px; /* 圆角 */
  font-size: 0.9em;
  color: #555;
  transition: all 0.3s ease; /* 过渡动画 */
}
/* 选中状态的样式 */
.custom-radio input[type="radio"]:checked + .radio-text {
  background-color: #1aac83; /* 选中时的背景色 */
  color: white; /* 选中时的文字颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
/* 鼠标悬停效果 */
.custom-radio:hover .radio-text {
  color: #1aac83;
  background-color: rgba(26, 172, 131, 0.1);
}

</style>