import React from 'react';

type Props = {
    title: string
    info: string
}

const UserInfo = (props:Props) => {
    const {title, info} = props

    return (
        <div className="min-w-[172px]">
            <p className="text-regular-14 text-light-900">{title}</p>
            <p className="text-regular-16 text-light-100">{info}</p>
        </div>
    );
};

export default UserInfo;