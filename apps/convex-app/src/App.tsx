import { AudioForm } from './components/AudioForm'
import { ImageForm } from './components/ImageForm'
import { ModeToggleComponent } from './components/ModeToggleComponent'

function App() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ModeToggleComponent />
      <ImageForm />
      <AudioForm />
    </div>
  )
}

export default App
