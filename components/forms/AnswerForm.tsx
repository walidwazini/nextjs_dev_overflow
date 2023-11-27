"use client"

import React, { useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'
import { usePathname } from 'next/navigation'

import { AnswerSchema } from '@/lib/validation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from '@/context/ThemeProvider'
import { Button } from '../ui/button'
import { createAnswer } from '@/lib/actions/answer.action'

interface Props {
  question: string,
  questionId: string,
  authorId: string
}

const AnswerForm = ({ question, questionId, authorId }: Props) => {
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mode } = useTheme()
  const editorRef = useRef(null)
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: { answer: '' }
  })


  const submitAnswerHandler = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true)

    try {
      console.log({val: values.answer, question, questionId, authorId })
      await createAnswer({
        content: values.answer,
        question: JSON.parse(questionId),
        author: JSON.parse(authorId),
        path: pathname,
      })

      form.reset()

      // Reset editor
      if (editorRef.current) {
        const editor = editorRef.current as any
        editor.setContent('')
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <div>
      <div className='mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:gap-2 sm:items-center ' >
        <h4 className='paragraph-semibold text-dark400_light800  ' >Write your answer here..</h4>
        <Button
          className='btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500 '
        >
          <img src='/assets/icons/stars.svg' alt='star' width={12} height={12} className='object-contain' />
          Generate AI answer
        </Button>
      </div>
      <Form {...form} >
        <form
          className={`mt-6 flex w-full flex-col gap-10`} onSubmit={form.handleSubmit(submitAnswerHandler)}
        >
          <FormField
            control={form.control}
            name='answer'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3 ' >

                <FormControl className='mt-3.5' >
                  {/* WYSWYG editor  */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                    onEditorChange={(content) => {
                      field.onChange(content)
                    }}
                    onBlur={field.onBlur}
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
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' && 'dark'
                    }}
                  />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          <div className='flex justify-end' >
            <Button
              type='submit'
              className='primary-gradient w-fit text-white '
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AnswerForm