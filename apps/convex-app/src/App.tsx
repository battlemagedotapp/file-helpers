import {} from '@battlemagedotapp/convex-upload-helpers'
import { ModeToggleComponent } from './components/ModeToggleComponent'
import { MultiImageUploader } from './components/MultiImageUploader'

function App() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ModeToggleComponent />
      <MultiImageUploader />
    </div>
  )
}

export default App
