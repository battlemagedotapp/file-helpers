import { Monitor, Moon, Sun } from 'lucide-react'
import { ModeToggle } from 'react-theme-hook'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function ModeToggleComponent() {
  return (
    <ModeToggle>
      {({ theme, setTheme, getThemeLabel }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex w-fit items-center gap-2">
              {theme === 'light' ? (
                <Sun className="h-4 w-4" />
              ) : theme === 'dark' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Monitor className="h-4 w-4" />
              )}
              {getThemeLabel()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setTheme('light')}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme('dark')}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme('system')}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" /> System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </ModeToggle>
  )
}
