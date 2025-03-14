import React from 'react'
import {Controller} from 'react-hook-form'

import {SignInFormType, useSignInForm} from '@/features/sign-in/useSignInForm'
import {useTranslation} from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import {Card} from '@/shared/ui/Card/Card'
import {Input} from '@/shared/ui/Input/Input'
import {gql, useMutation} from "@apollo/client";
import {useRouter} from 'next/router'

const SIGN_IN_MUTATION = gql`
    mutation {
        loginAdmin(email: "admin@gmail.com", password: "admin", ) {
            logged
        }
    }
`

const VALID_EMAIL = "admin@gmail.com";
const VALID_PASSWORD = "admin";

export const SignInForm = () => {
    const {t} = useTranslation()
    const router = useRouter()
    const {control, handleSubmit, onFieldChange} = useSignInForm()
    const [signIn] = useMutation(SIGN_IN_MUTATION)

    const onSubmit = async (data: SignInFormType) => {
        if (data.email !== VALID_EMAIL || data.password !== VALID_PASSWORD) {
            return;
        }
        try {
            const {data: {loginAdmin}} = await signIn({
                variables: {email: data.email, password: data.password}
            })

            if (loginAdmin && loginAdmin.logged) {
                router.replace('/')
            }
        } catch (error) {
            console.error("Sign in error:", error)
        }
    };

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Card
                className="flex h-full sm:h-fit bg-dark-700 sm:bg-dark-500 flex-col sm:w-[378px] p-6 m-auto items-center mt-[168px]">
                <div>
                    <span className="text-h1">{t.auth.signIn}</span>
                </div>
                <div className="flex items-center gap-[60px] pt-2">
                </div>
                <div className="flex w-full flex-col gap-[24px] pt-[24px]">
                    <Controller
                        control={control}
                        name="email"
                        render={({field}) => (
                            <Input
                                {...field}
                                fullWidth
                                label={t.auth.email}
                                onChange={e => {
                                    field.onChange(e)
                                    onFieldChange('email')
                                }}
                                placeholder={t.auth.emailPlaceholder}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({field}) => (
                            <Input
                                {...field}
                                fullWidth
                                label={t.auth.password}
                                onChange={e => {
                                    field.onChange(e)
                                    onFieldChange('password')
                                }}
                                type="password"
                            />
                        )}
                    />
                </div>
                <div className="w-full flex flex-col items-center pt-[24px]">
                    <Button className="text-h3" fullWidth>
                        {t.auth.signIn}
                    </Button>
                </div>
            </Card>
        </form>
    )
}
