import {} from '@battlemagedotapp/convex-upload-helpers'
import { ImageView } from '@battlemagedotapp/media-helpers/image'
import { ModeToggleComponent } from './components/ModeToggleComponent'
import { MultiImageUploader } from './components/MultiImageUploader'

function App() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ModeToggleComponent />
      <MultiImageUploader />
      <div className="w-64 h-64">
        <ImageView src="kg25prh4ygkk45mhv2q8a1b1j17paaq5" alt="test" />
        <ImageView src="kg22n56zqrgyke17yt4efskdqh7pa35s" alt="test" />
      </div>
    </div>
  )
}

export default App
