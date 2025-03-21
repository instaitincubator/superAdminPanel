import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input} from "@/shared/ui/Input/Input";
import {useRouter} from "next/router";



const SearchWithQueries = ({placeholder}: {placeholder:string}) => {
    const router = useRouter()
    const [searchInput, setSearchInput] = useState(router.query.searchTerm ? router.query.searchTerm :"")
    const [isChanged, setIsChanged] = useState(false)

    const changeSearchString = (e:ChangeEvent<HTMLInputElement >) => {
        setSearchInput(e.target.value)
        if (!isChanged) {setIsChanged(true)}
    }

    useEffect(() => {
        if (searchInput) {
            const handler = setTimeout(() => {
                void router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        searchTerm: searchInput,
                        pageNumber: 1,
                    },
                })
            }, 500)
            return () => clearTimeout(handler)
        } else if (!searchInput && isChanged) {
            const oldQueries = {...router.query}
            delete oldQueries.searchTerm
            const handler = setTimeout(() => {
                void router.push({
                    pathname: router.pathname,
                    query: {
                        ...oldQueries,
                        pageNumber: 1,
                    },
                })
            }, 500)
            return () => clearTimeout(handler)
        }
    }, [searchInput])

    return (
        <Input
            type="search"
            placeholder={placeholder}
            fullWidth
            value={searchInput}
            onChange={changeSearchString}

        />
    );
};

export default SearchWithQueries;