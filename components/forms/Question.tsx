"use client"

import React, { useRef } from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Editor } from '@tinymce/tinymce-react'

import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QuestionSchema } from '@/lib/validation'

const Question = () => {
  const editorRef = useRef()
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current);
    }
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-10 " >
        {/* //? Title  */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col ' >
              <FormLabel className='paragraph-semibold text-dark400_light800 ' >
                Question Title <span className='text-primary-500' >*</span>
              </FormLabel>
              <FormControl className='mt-3.5' >
                <Input
                  className={`no-focus paragraph-regular background-light900_dark300 border-2  text-dark300_light700 min-h-[56px]`}
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500 ' >
                Be specific and imagine you&apos;re asking question to another person.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        {/* //? Description / Explanation  */}
        <FormField
          control={form.control}
          name='explanation'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 ' >
              <FormLabel className='paragraph-semibold text-dark400_light800 ' >
                Detail explanation of your problem <span className='text-primary-500' >*</span>
              </FormLabel>
              <FormControl className='mt-3.5' >
                {/* WYSWYG editor  */}
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor
                  }}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                      'searchreplace', 'visualblocks', 'codesample', 'fullscreen',
                      'insertdatetime', 'media', 'table'
                    ],
                    toolbar:
                      'undo redo | ' +
                      'codesample | bold italic forecolor | alignleft aligncenter |' +
                      'alignright alignjustify | bullist numlist',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500 ' >
                Explain your problem minimum 20 characaters.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        {/* //? Tags  */}
        <FormField
          control={form.control}
          name='explanation'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 ' >
              <FormLabel className='paragraph-semibold text-dark400_light800 ' >
                Detail explanation of your problem <span className='text-primary-500' >*</span>
              </FormLabel>
              <FormControl className='mt-3.5' >
                <Input
                  className={`no-focus paragraph-regular background-light900_dark300 border-2  text-dark300_light700 min-h-[56px]`}
                  placeholder='Add tags...'
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500 ' >
                Add up to 3 tags to describe your question. Press enter to add a tag.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Question