import React from 'react'
import Calendar from 'react-calendar'
import { Header } from 'semantic-ui-react'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'

export default function ActivityFilters(){
    return(
        <>
        <Menu vertical size='large' style={{width:'100%' ,marginTop:25}}>
            <Header icon='filter' attached color='teal' content='Filters'/>
            <Menu.Item content='All Activities'/>
            <Menu.Item content="I'm going"/>
            <Menu.Item content="I'm hosting"/>
        </Menu>
        <Header></Header>
        <Calendar/>
        </>

    )
}