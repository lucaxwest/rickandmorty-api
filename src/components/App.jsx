import './App.css'
import { useState, useEffect } from 'react'
import { Form, InputGroup, Button, Card, ListGroup, Row, Col,} from 'react-bootstrap'
import { api } from '../services/api'

function App() {
  const [characters, setCharacters] = useState([])
  const [namePesquisa, setNamePesquisa] = useState()

  async function pesquisar() {
    try {
      const response = await api.get(`/character/?name=${namePesquisa}`)
      setCharacters(response.data.results)
    } catch {
      const retorno = await api
        .get(`/character/?page=${Math.floor(Math.random() * 42)}`)
        .then((retorno) => {
          setCharacters(retorno.data.results)
        }, [])
    }
  }

  useEffect(() => {
    api
      .get(`/character/?page=${Math.floor(Math.random() * 42)}`)
      .then((response) => {
        setCharacters(response.data.results)
      })
  }, [])

  return (
    <div id="container">
      <h1>Explore the characters</h1>

      <div className="container-form">
        <div className="form mb-4">
          <InputGroup>
            <Form.Control
              placeholder="Character"
              value={namePesquisa}
              onChange={(e) => {
                setNamePesquisa(e.target.value)
              }}
            />
          </InputGroup>

          <Button className="button" onClick={pesquisar} variant="dark">
            To the moon
          </Button>
        </div>
      </div>

      <div className="container-cards">
        <Row className="justify-content-md-center">
          {characters.map((character) => {
            return (
              <Col md="auto">
                <Card style={{ width: '18rem' }} className="mb-2 cards">
                  <Card.Img variant="top" src={character.image} />

                  <Card.Body className="card-name">
                    <Card.Title className="title-name">
                      {character.name}
                    </Card.Title>
                    <div className="character-details">
                      <p className="character-status">
                        <h6 className="ponto01"></h6>
                        {character.status}
                      </p>
                      <h6 className="ponto02"></h6>
                      <p className="character-species">
                        {character.species}
                      </p>
                    </div>
                  </Card.Body>

                  <ListGroup className="list-group-flush">
                    <ListGroup.Item className="listgroup-location">
                      <span>Last known location:</span>
                      <p className="character-local">
                        {character.location.name}
                      </p>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </div> /* container */
  )
}

export default App
