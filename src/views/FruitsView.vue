<template>
  <div class="container">
    <h1 class="title">Fruit List</h1>

    <div class="card-wrapper">
      <el-card
        v-for="fruit in fruits"
        :key="fruit.id"
        class="fruit-card"
        :body-style="{ padding: '20px' }"
      >
        <h2 class="fruit-name">{{ fruit.name }}</h2>

        <div class="fruit-meta">
          <p><strong>Genus:</strong> {{ fruit.genus }}</p>
          <p><strong>Family:</strong> {{ fruit.family }}</p>
          <p><strong>Order:</strong> {{ fruit.order }}</p>
        </div>

        <div class="divider"></div>

        <div class="fruit-nutrition">
          <h3>Nutrition Facts:</h3>
          <ul>
            <li><strong>Calories:</strong> {{ fruit.nutritions.calories }}</li>
            <li><strong>Fat:</strong> {{ fruit.nutritions.fat }}g</li>
            <li><strong>Sugar:</strong> {{ fruit.nutritions.sugar }}g</li>
            <li><strong>Carbs:</strong> {{ fruit.nutritions.carbohydrates }}g</li>
            <li><strong>Protein:</strong> {{ fruit.nutritions.protein }}g</li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'element-plus/es/components/card/style/css'

const fruits = ref([])

const fetchFruits = async () => {
  try {
    const res = await fetch('/api/fruit/all')
    const data = await res.json()
    fruits.value = data
  } catch (err) {
    console.error('Failed to fetch fruits:', err)
  }
}

onMounted(() => {
  fetchFruits()
})
</script>

<style scoped>
.container {
  padding: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.fruit-card {
  width: 260px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 10px;
}

.fruit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.fruit-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.fruit-meta p {
  font-size: 0.85rem;
  color: #4b5563;
  margin-bottom: 2px;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.75rem 0;
}

.fruit-nutrition h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.fruit-nutrition ul {
  padding: 0;
  list-style: none;
  font-size: 0.85rem;
  color: #374151;
  line-height: 1.4;
}

.fruit-nutrition li {
  margin-bottom: 4px;
}
</style>
