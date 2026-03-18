import AddJoke from '#/components/AddJoke'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/addjoke')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AddJoke />
}
