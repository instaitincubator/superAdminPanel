import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'

export interface SignInFormType {
    email: string
    password: string
}


export const useSignInForm = () => {
    const { t } = useTranslation()
    const {
        clearErrors,
        control,
        formState: { errors, isValid },
        handleSubmit,
        reset,
        trigger,
    } = useForm<SignInFormType>({
        defaultValues: { email: '' },
        mode: 'onSubmit',
    })
    const hasInteracted = useRef(false)

    useEffect(() => {
        reset({ email: '', password: '' })
        clearErrors()
    }, [t])

    const onFieldChange = async (fieldName: keyof SignInFormType) => {
        hasInteracted.current = true
        await trigger(fieldName)
    }

    return { control, errors, handleSubmit, isValid, onFieldChange, trigger }
}
