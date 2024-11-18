import dynamic from "next/dynamic";
import React from 'react';

export function ComponentResolver(
    {entry}: { entry: {__typename: string} }
) {
    const Component: React.ComponentType<T> =
        dynamic(() => import((`@/components/${entry.__typename}/ViewModel`)))
    return (
        <>
            {Component ? (<Component entry={entry}/>) : null}
        </>
    );
}
