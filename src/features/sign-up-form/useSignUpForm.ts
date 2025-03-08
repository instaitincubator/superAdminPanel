import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface SignUpFormType {
    checkboxPolicy: boolean
    confirmPassword: string
    email: string
    password: string
    userName: string
}

export const useSignUpForm = () => {
    const { t } = useTranslation()

    const schema = z
        .object({
            checkboxPolicy: z.literal(true, {
                invalid_type_error: t.auth.errors.termsAccept,
            }),
            confirmPassword: z.string({ message: t.auth.field_required }),
            email: z
                .string({ message: t.auth.field_required })
                .min(1, { message: t.auth.errors.emailRequired })
                .email({ message: t.auth.email_val }),
            password: z
                .string({ message: t.auth.field_required })
                .min(6, { message: t.auth.errors.lowLength })
                .max(20, { message: t.auth.errors.highLength20 })
                .regex(
                    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9 !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]*$/,
                    {
                        message: t.auth.passwordValidMessage,
                    }
                ),
            userName: z
                .string({ message: t.auth.field_required })
                .min(6, { message: t.auth.errors.lowLength })
                .max(30, { message: t.auth.errors.highLength30 })
                .regex(/^[0-9A-Za-z_-]+$/, {
                    message: t.auth.errors.userName_val,
                }),
        })
        .refine(
            values => {
                return values.password === values.confirmPassword
            },
            {
                message: t.auth.passwords_notMatch,
                path: ['confirmPassword'],
            }
        )
        .refine(
            values => {
                const passwordContainsSpaces = values.password.includes(' ')

                return !passwordContainsSpaces
            },
            { message: t.auth.errors.passwordCannotContainSpaces, path: ['password'] }
        )

    const {
        clearErrors,
        control,
        formState: { errors, isDirty, isValid },
        getValues,
        handleSubmit,
        reset,
        trigger,
    } = useForm<SignUpFormType>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })
    const hasInteracted = useRef(false)

    useEffect(() => {
        reset({ checkboxPolicy: false, confirmPassword: '', email: '', password: '', userName: '' })
        clearErrors()
    }, [t, trigger])
    const onFieldChange = () => {
        hasInteracted.current = true
    }

    return { control, errors, getValues, handleSubmit, isDirty, isValid, onFieldChange, reset }
}
