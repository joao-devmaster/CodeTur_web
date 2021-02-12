import React from 'react';
import Menu from '../../../Componentes/Menu'
import Rodape from '../../../Componentes/Rodape';
import {Container} from 'react-bootstrap';

const DashBoard = () => {

    return (
        <div>
            <Menu />
            <Container className='form-heigth'>
                <h1>DashBoard</h1>
            </Container>
            <Rodape />
        </div>
    )
}

export default DashBoard;