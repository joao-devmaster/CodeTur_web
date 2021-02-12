import React from 'react';
import Menu from '../../Componentes/Menu';
import Rodape from '../../Componentes/Rodape';
import {Container} from 'react-bootstrap';

const NotFound = () => {

    return (
        <div>
            <Menu />
            <Container className='form-heigth'>
                <h1>NotFound</h1>
            </Container>
            <Rodape />
        </div>
    )  
}

export default NotFound;