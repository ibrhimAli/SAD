import { useCounterStore } from '../contexts/useCounterStore'

export default function Home() {
  const { count, increment, decrement } = useCounterStore()
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-primary">Home Page</h1>
      <p>Count: {count}</p>
      <div className="flex gap-2">
        <button className="px-2 py-1 bg-primary text-white rounded" onClick={increment}>+</button>
        <button className="px-2 py-1 bg-primary text-white rounded" onClick={decrement}>-</button>
      </div>
    </div>
  )
}
