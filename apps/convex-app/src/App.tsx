import {} from '@battlemagedotapp/convex-upload-helpers'
import { ModeToggleComponent } from './components/ModeToggleComponent'
import { MultiImageUploader } from './components/MultiImageUploader'

function App() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ModeToggleComponent />
      <MultiImageUploader />
      {/* <ImageView src="https://picsum.photos/200/300" externalImageUrlFn={(url) => url} alt="test" className='w-1/2 h-1/2' /> */}
    </div>
  )
}

export default App
