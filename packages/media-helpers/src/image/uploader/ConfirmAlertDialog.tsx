import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialog as BaseAlertDialog,
} from '@/components/ui/alert-dialog'
import * as React from 'react'

type ConfirmAlertDialogProps = {
  title?: string
  description?: string
  trigger?: React.ReactNode
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
}

export function ConfirmAlertDialog({
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  trigger,
  onConfirm,
  confirmLabel = 'Continue',
  cancelLabel = 'Cancel',
}: ConfirmAlertDialogProps) {
  return (
    <BaseAlertDialog>
      {trigger ? <AlertDialogTrigger>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog>
  )
}

export default ConfirmAlertDialog
