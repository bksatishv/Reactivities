import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props{
    openForms:()=>void;
}

export default function NavBar({openForms}:Props){
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt="logo" style={{marginRight:10}}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button onClick={openForms} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}