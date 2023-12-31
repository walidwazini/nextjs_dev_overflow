"use client"

import React, { useRef, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Editor } from '@tinymce/tinymce-react'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QuestionSchema } from '@/lib/validation'
import { Badge } from '../ui/badge'
import { createQuestion, editQuestion } from '@/lib/actions/question.action'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from '@/context/ThemeProvider'

interface Props {
  mongoUserId: string
  type?: 'create' | 'edit' | ''
  questionDetails?: string
}

const QuestionForm = ({ mongoUserId, type, questionDetails }: Props) => {
  const editorRef = useRef()
  const { mode } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const parsedQuestionDetails = questionDetails && JSON.parse(questionDetails || '')
  const groupedTags = questionDetails && parsedQuestionDetails.tags.map((tag: any) => tag.name)

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: questionDetails ? (parsedQuestionDetails.title) : '',
      explanation: questionDetails ? parsedQuestionDetails.content : "",
      tags: questionDetails ? groupedTags : [],
    },
  })

  const handleInputKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>, field: any) => {
    if (ev.key === 'Enter' && field.name === 'tags') {
      ev.preventDefault()

      const tagInput = ev.target as HTMLInputElement
      const tagValue = tagInput.value.trim()

      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters.'
          })
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = ''
          form.clearErrors('tags');
        }

      } else {
        form.trigger();
      }
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    if (type === 'edit') return

    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue('tags', newTags);
  }

  const onSubmit = async (values: z.infer<typeof QuestionSchema>) => {
    setIsSubmitting(true)
    try {
      if (type === 'create') {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname
        })
        router.push('/')
      } else if (type === 'edit') {
        await editQuestion({
          questionId: parsedQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        })
        router.push(`/question/${parsedQuestionDetails._id}`);
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-10 " >
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
                  {...field}
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
                  onEditorChange={(content) => {
                    field.onChange(content)
                  }}
                  onBlur={field.onBlur}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor
                  }}
                  initialValue={questionDetails ? parsedQuestionDetails.content : ''}
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
          name='tags'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 ' >
              <FormLabel className='paragraph-semibold text-dark400_light800 ' >
                Detail explanation of your problem <span className='text-primary-500' >*</span>
              </FormLabel>
              <FormControl className='mt-3.5' >
                <>
                  <Input
                    className={`no-focus paragraph-regular background-light900_dark300 border-2  text-dark300_light700 min-h-[56px]`}
                    placeholder='Add tags...'
                    onKeyDown={ev => handleInputKeyDown(ev, field)}
                    disabled={type === 'edit' || field.value.length === 3}
                  />
                  {field.value?.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge key={tag} className={`subtle-medium background-light800_dark300 
                      text-light400_light500 flex items-center justify-center gap-2 
                      rounded-md border-none px-4 py-2 uppercase`}
                          onClick={() => handleTagRemove(tag, field)}
                        >
                          {tag}
                          {type === 'create' && (
                            <Image
                              src="/assets/icons/close.svg"
                              alt="Close icon" width={12} height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500 ' >
                Add up to 3 tags to describe your question. Press enter to add a tag.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          className=' bg-primary-500 w-full !text-light-900 uppercase font-semibold'
          type="submit"
        >
          {isSubmitting
            ? (<>{type === 'edit' ? 'Editing..' : 'Posting..'}</>)
            : (<> {type === 'edit' ? 'Update a Question' : 'Post a Question'} </>)
          }
        </Button>
      </form>
    </Form>
  )
}

export default QuestionForm