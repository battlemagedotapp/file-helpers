import { AudioForm } from './components/AudioForm'
import { ImageForm } from './components/ImageForm'
import { ModeToggleComponent } from './components/ModeToggleComponent'

function App() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="h-24"></div>
      <ModeToggleComponent />
      <ImageForm />
      <AudioForm />
      {/* <ImageView src="https://picsum.photos/200/200" externalImageUrlFn={(url) => url} alt="test" className='w-1/2 h-1/2' /> */}
    </div>
  )
}

export default App
