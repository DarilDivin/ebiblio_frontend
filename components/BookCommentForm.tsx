"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { createComment } from "@/lib/data/book"
import { useSpecificBook } from "@/services/queries"
 
const FormSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "Entrez quelque chose...",
    })
    .max(1000, {
      message: "Votre commentaire est beaucoup trop long",
    }),
})

const BookCommentForm = ({id}: {id: string}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { mutate } = useSpecificBook(id)

  const submitComment = async (
    event: { preventDefault: () => void },
    id: number,
    content: string
  ) => {
    event.preventDefault();

    await createComment({ id, content})
    mutate()
    form.reset()
  }
 
  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    submitComment(event, parseInt(id), values.content) 
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commenter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Veillez nous laisser un Commentaires
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </Form>
  )
}

export default BookCommentForm