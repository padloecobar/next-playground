import dynamic from "next/dynamic";
import {BaseComponent} from "@/components/BaseComponent";
import React from 'react';

export function ComponentResolver<T extends BaseComponent>(
    {entry}: { entry: T }
) {
    const Component: React.ComponentType<T> =
        dynamic(() => import((`@/components/${entry.__typename}/ViewModel`)))
    return (
        <>
            {Component ? (<Component entry={entry}/>) : null}
        </>
    );
}
