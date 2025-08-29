import { CropTestComponentWithBlob } from '@battlemagedotapp/media-helpers/audio'
import { AudioForm } from './components/AudioForm'
import { ImageForm } from './components/ImageForm'
import { ModeToggleComponent } from './components/ModeToggleComponent'

function App() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ModeToggleComponent />
      <ImageForm />
      <AudioForm />
      <CropTestComponentWithBlob src="https://cdn.pixabay.com/audio/2025/05/17/audio_3882df0036.mp3" />
      {/* <ImageView src="https://picsum.photos/200/200" externalImageUrlFn={(url) => url} alt="test" className='w-1/2 h-1/2' /> */}
    </div>
  )
}

export default App
