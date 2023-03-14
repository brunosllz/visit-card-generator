import { Check } from 'phosphor-react'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'

export default function Home() {
  return (
    <div className="bg-zinc-900 w-full h-screen flex justify-center items-center">
      <form className="bg-zinc-800 max-w-[546px] w-full mx-auto p-9 rounded-md flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          Name
          <TextInput.Root>
            <TextInput.Input placeholder="John Doe" />
          </TextInput.Root>
        </label>

        <label className="flex flex-col gap-2">
          Description
          <textarea
            placeholder="Description example"
            className="bg-zinc-900 w-full min-h-[108px] max-h-[200px] px-4 py-3 outline-none resize-y rounded-md placeholder:text-zinc-500"
          />
        </label>

        <label className="flex flex-col gap-2">
          Email
          <TextInput.Root>
            <TextInput.Input placeholder="johndoe@email.com"></TextInput.Input>
          </TextInput.Root>
        </label>

        <label className="flex flex-col gap-2">
          Github
          <TextInput.Root>
            <TextInput.Input placeholder="your-user">
              <TextInput.Prefix prefix="https://github.com/" />
            </TextInput.Input>
          </TextInput.Root>
        </label>

        <label className="flex flex-col gap-2">
          Linkedin
          <TextInput.Root>
            <TextInput.Input placeholder="your-user">
              <TextInput.Prefix prefix="https://www.linkedin.com/in/" />
            </TextInput.Input>
          </TextInput.Root>
        </label>

        <Button title="Generate Image">
          <Check weight="bold" />
        </Button>
      </form>
    </div>
  )
}
